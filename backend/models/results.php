<?php

	class Results {



		static function getTimeline($id, $type, $version) {
			$db = Factory::Database();

			$results = array();

			$result = $db->query("
				SELECT
					b.variant, IFNULL(b.version,'') AS version, b.nickname, b.release, b.status, f.score, f.results
				FROM
					browserVariants AS v
					LEFT JOIN browserVersions AS b ON (v.id = b.variant)
					LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (s.fingerprint = f.fingerprint)
				WHERE
					(v.id = '" . $db->escape_string($id) . "' OR v.replaced = '" . $db->escape_string($id) . "') AND
					FIND_IN_SET('" . $db->escape_string($type) . "',v.type) AND
					FIND_IN_SET('" . $db->escape_string($type) . "',b.type) AND
					s.release = '" . $version . "'
				ORDER BY
					IF(b.status='development',1,0) DESC, b.release DESC, v.replaced, b.version DESC
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
			$ignore = array(
				'audio-pcm', 'audio-mp3', 'audio-aac', 'audio-vorbis', 'audio-webm', 'audio-webmopus', 'audio-opus',
				'video-mpeg4', 'video-h264', 'video-theora', 'video-webmvp8', 'video-webmvp9'
			);

			$current = Results::getArray($current);
			$previous = Results::getArray($previous);

			$changes = array();

			foreach ($previous AS $p => $value) {
				if (in_array($p, $ignore)) continue;

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


		static function getByFeature($id, $version) {
			$db = Factory::Database();

			$results = array();

			$result = $db->query("
				SELECT
					IFNULL(SUBSTRING_INDEX(SUBSTRING_INDEX(f.results,'" . $db->escape_string($id) . "=',-1),',',1),0) as supported,
					b.variant, IFNULL(b.version,'') AS version
				FROM
					browserVersions AS b
					LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE
					s.release = '" . $version . "'
			");

			while ($row = $result->fetch_object()) {
				$results[] = $row->variant . '-' . $row->version . '=' . $row->supported;
			}

			return $results;
		}

		static function getByBrowser($browser, $version) {
			$db = Factory::Database();

			$browser = explode('-', $browser);

			if (count($browser) > 1) {
				list($browserVariant, $browserVersion) = $browser;

				$result = $db->query("
					SELECT
						b.variant, IFNULL(b.version,'') AS version, b.nickname, f.score, f.points, f.results
					FROM
						browserVersions AS b
						LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
						LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
					WHERE
						s.release = '" . $version . "' AND
						b.variant = '" . $db->escape_string($browserVariant) . "' AND
						b.version = '" . $db->escape_string($browserVersion) . "'
				");

				if ($row = $result->fetch_object()) {
					return $row;
				}

				return;
			}
			else {
				$browserVariant = $browser[0];
			}

			$result = $db->query("
				SELECT
					b.variant, IFNULL(b.version,'') AS version, b.nickname, f.score, f.points, f.results
				FROM
					browserVersions AS b
					LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE
					s.release = '" . $version . "' AND
					b.variant = '" . $db->escape_string($browserVariant) . "'
				ORDER BY
					b.release DESC, b.id DESC
			");

			if ($row = $result->fetch_object()) {
				return $row;
			}
		}



		static function getByUniqueId($id) {
			$db = Factory::Database();

			$result = $db->query("
				SELECT
					r.version, r.uniqueid AS id, 'Unique id' AS nickname, f.score, f.maximum, f.points, f.results, humanReadable, useragentHeader AS useragent, deviceWidth, deviceHeight, f.fingerprint
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
					browserVariants
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
						browserVersions
					WHERE
						variant = '" . addslashes($row->id) . "'
					ORDER BY
						version
				");

				while ($vrow = $vres->fetch_object()) {
					$version = (object) array(
						'id'		=> is_null($vrow->version) ? $vrow->variant : $vrow->variant . '-' . $vrow->version,
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
					b.variant, IFNULL(b.version,'') AS version, f.results
				FROM
					browserVersions AS b
					LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE
					s.release = '" . $release . "'
				ORDER BY
					b.variant, b.version
			");

			while ($row = $res->fetch_object()) {
				$r = explode(',', $row->results);

				for ($i = 0; $i < count($r); $i++) {
					list($key, $value) = explode('=', $r[$i]);

					if (!isset($results[$key]))	{
						$results[$key] = array();
					}

					$variant = $row->version == '' ? $row->variant : $row->variant . '-' . $row->version;
					$value = intval($value);

					if ($value & 1) {
						switch(true) {
							case !! ($value & 2):	$results[$key][$variant] = 'yes:old';
							case !! ($value & 4):	$results[$key][$variant] = 'yes:buggy';
							case !! ($value & 8):	$results[$key][$variant] = 'yes:prefix';
							default:				$results[$key][$variant] = 'yes';
						}
					}
					else {
						switch(true) {
							case !! ($value & 16):	$results[$key][$variant] = 'no:blocked';
							default:				$results[$key][$variant] = 'no';
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