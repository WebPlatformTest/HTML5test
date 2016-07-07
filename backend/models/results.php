<?php

	class Results {



		static function getTimeline($id, $type, $release) {
			$db = Factory::Database();

			$results = array();

			$result = $db->query("
				SELECT
					v.platform, IFNULL(v.version,'') AS version, v.nickname, v.releasedate, v.status, f.score, f.results
				FROM
					data_platforms AS p
					LEFT JOIN data_versions AS v ON (p.platform = v.platform)
					LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (s.fingerprint = f.fingerprint)
				WHERE
					(p.platform = '" . $db->escape_string($id) . "' OR p.related = '" . $db->escape_string($id) . "') AND
					FIND_IN_SET('" . $db->escape_string($type) . "',p.type) AND
					FIND_IN_SET('" . $db->escape_string($type) . "',v.type) AND
					s.release = '" . $release . "'
				ORDER BY
					IF(v.status='upcoming',1,0) DESC, v.releasedate DESC, p.related, v.version DESC
			");

			while ($row = $result->fetch_object()) {
				$results[] = $row;
			}

			for ($i = 0; $i < count($results) - 1; $i++) {
				$results[$i]->changes = Results::getDiff($results[$i]->results, $results[$i + 1]->results);
			}

			for ($i = 0; $i < count($results); $i++) {
				unset($results[$i]->results);
			}

			return $results;
		}

		static function getArray($string) {
			$result = array();

			$array = explode(',', $string);

			for ($i = 0; $i < count($array); $i++) {
				$item = explode('=', $array[$i]);
				$result[$item[0]] = $item[1];
			}

			return $result;
		}

		static function getDiff($current, $previous) {
			$current = Results::getArray($current);
			$previous = Results::getArray($previous);

			$changes = array();

			foreach ($previous AS $p => $value) {
				if (preg_match("/\.codecs\./", $p)) continue;

				if ($previous[$p] == 33) $previous[$p] = 1;
				if ($current[$p] == 33) $current[$p] = 1;

				if ($previous[$p] != $current[$p]) {
					$changes[] = (object) array(
						'id'	=> $p,
						'from'	=> $previous[$p],
						'to'	=> $current[$p]
					);
				}
			}

			return $changes;
		}


		static function getByFeature($id, $release) {
			$db = Factory::Database();

			$results = array();

			$result = $db->query("
				SELECT
					IFNULL(SUBSTRING_INDEX(SUBSTRING_INDEX(f.results,'" . $db->escape_string($id) . "=',-1),',',1),0) as supported,
					v.platform, IFNULL(v.version,'') AS version
				FROM
					data_versions AS v
					LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE
					s.release = '" . $release . "'
			");

			while ($row = $result->fetch_object()) {
				$results[] = $row->platform . '-' . $row->version . '=' . $row->supported;
			}

			return $results;
		}

		static function getByBrowser($browser, $release) {
			$db = Factory::Database();

			$browser = explode('-', $browser);

			if (count($browser) > 1) {
				list($browserPlatform, $browserVersion) = $browser;

				$result = $db->query("
					SELECT
						v.platform, IFNULL(v.version,'') AS version, v.nickname, f.score, f.points, f.results
					FROM
						data_versions AS v
						LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
						LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
					WHERE
						s.release = '" . $release . "' AND
						v.platform = '" . $db->escape_string($browserPlatform) . "' AND
						v.version = '" . $db->escape_string($browserVersion) . "'
				");

				if ($row = $result->fetch_object()) {
					return $row;
				}

				return;
			}
			else {
				$browserPlatform = $browser[0];
			}

			$result = $db->query("
				SELECT
					v.platform, IFNULL(v.version,'') AS version, v.nickname, f.score, f.points, f.results
				FROM
					data_versions AS v
					LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE
					s.release = '" . $release . "' AND
					v.platform = '" . $db->escape_string($browserPlatform) . "'
				ORDER BY
					v.releasedate DESC, v.id DESC
			");

			if ($row = $result->fetch_object()) {
				return $row;
			}
		}



		static function getByUniqueId($id) {
			$db = Factory::Database();

			$result = $db->query("
				SELECT
					r.release, r.uniqueid AS id, 'Unique id' AS nickname, f.score, f.maximum, f.points, f.results, humanReadable, useragentHeader AS useragent, deviceWidth, deviceHeight, f.fingerprint
				FROM
					results AS r
					LEFT JOIN fingerprints AS f ON (r.fingerprint = f.fingerprint)
				WHERE
					r.uniqueid ='" . $db->escape_string($id) . "'
			");

			if ($row = $result->fetch_object()) {

				// Update use counter
				$db->query('
					UPDATE
						results
					SET
						used = used + 1,
						lastUsed = NOW()
					WHERE
						uniqueid = "' . $db->escape_string($id) . '"
				');

				return $row;
			}
		}


		static function getByFingerprint($id) {
			$db = Factory::Database();

			$res = $db->query("
				SELECT
					score, maximum, points, results
				FROM
					fingerprints
				WHERE
					fingerprint ='" . $db->escape_string($id) . "'
			");

			if ($row = $res->fetch_object()) {
				return $row;
			}
		}


		static function export($release) {
			$db = Factory::Database();

			$browsers = array();

			$res = $db->query("
				SELECT
					*
				FROM
					data_platforms
				ORDER BY
					name
			");

			echo mysql_error();

			while ($row = $res->fetch_object()) {
				$browser = (object) array(
					'name'		=> $row->name,
					'kind'		=> $row->kind,
					'versions'	=> array()
				);

				$vres = $db->query("
					SELECT
						*
					FROM
						data_versions
					WHERE
						platform = '" . addslashes($row->id) . "'
					ORDER BY
						version
				");

				while ($vrow = $vres->fetch_object()) {
					$version = (object) array(
						'id'		=> is_null($vrow->version) ? $vrow->platform : $vrow->platform . '-' . $vrow->version,
						'version'	=> $vrow->version,
						'nickname'	=> $vrow->nickname,
						'release'	=> $vrow->release
					);

					$browser->versions[] = $version;
				}

				$browsers[] = $browser;
			}


			$results = array();

			$res = $db->query("
				SELECT
					v.platform, IFNULL(v.version,'') AS version, f.results
				FROM
					data_versions AS v
					LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE
					s.release = '" . $release . "'
				ORDER BY
					v.platform, v.version
			");

			while ($row = $res->fetch_object()) {
				$r = explode(',', $row->results);

				for ($i = 0; $i < count($r); $i++) {
					list($key, $value) = explode('=', $r[$i]);

					if (!isset($results[$key]))	{
						$results[$key] = array();
					}

					$platform = $row->version == '' ? $row->platform : $row->platform . '-' . $row->version;
					$value = intval($value);

					if ($value & 1) {
						switch(true) {
							case !! ($value & 2):	$results[$key][$platform] = 'yes:old';
							case !! ($value & 4):	$results[$key][$platform] = 'yes:buggy';
							case !! ($value & 8):	$results[$key][$platform] = 'yes:prefix';
							default:				$results[$key][$platform] = 'yes';
						}
					}
					else {
						switch(true) {
							case !! ($value & 16):	$results[$key][$platform] = 'no:blocked';
							default:				$results[$key][$platform] = 'no';
						}
					}
				}
			}


			return array(
				'browsers'	=> $browsers,
				'results'	=> $results
			);
		}
	}