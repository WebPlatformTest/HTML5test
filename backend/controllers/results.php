<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');

	$type = $_REQUEST['type'];
	if (!in_array($type, array('desktop', 'mobile', 'tablet', 'gaming', 'television', 'other'))) $type = 'desktop';

	if (in_array($type, array('gaming', 'television'))) {
		header('Location: /results/other.html#' . $type);
		exit;
	}

	$db = Factory::Database();

	if ($type == 'other') {
		$tpl = new Template('../templates/results-other.html');
		$tpl->set('type', $type);


		$consoles = array();

		$result = $db->query("
			SELECT
				b.status, b.platform, IFNULL(v.related,v.platform) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.visible, f.score, f.points, f.results
			FROM
				data_versions AS b
				LEFT JOIN data_platforms AS v ON (b.platform = v.platform)
				LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('gaming-console',b.type)
			ORDER BY
				score DESC
		");

		while ($row = $result->fetch_object()) {
			$consoles[] = $row;
		}

		$tpl->set('consoles', $consoles);

		$portables = array();

		$result = $db->query("
			SELECT
				b.status, b.platform, IFNULL(v.related,v.platform) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.visible, f.score, f.points, f.results
			FROM
				data_versions AS b
				LEFT JOIN data_platforms AS v ON (b.platform = v.platform)
				LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('gaming-portable',b.type)
			ORDER BY
				score DESC
		");

		while ($row = $result->fetch_object()) {
			$portables[] = $row;
		}

		$tpl->set('portables', $portables);

		$smarttvs = array();

		$result = $db->query("
			SELECT
				b.status, b.platform, IFNULL(v.related,v.platform) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.visible, f.score, f.points, f.results
			FROM
				data_versions AS b
				LEFT JOIN data_platforms AS v ON (b.platform = v.platform)
				LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('television-smart',b.type)
			ORDER BY
				score DESC
		");

		while ($row = $result->fetch_object()) {
			$smarttvs[$row->status][] = $row;
		}

		$tpl->set('smarttvs', $smarttvs);

		$settopboxes = array();

		$result = $db->query("
			SELECT
				b.status, b.platform, IFNULL(v.related,v.platform) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.visible, f.score, f.points, f.results
			FROM
				data_versions AS b
				LEFT JOIN data_platforms AS v ON (b.platform = v.platform)
				LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('television-box',b.type)
			ORDER BY
				score DESC
		");

		while ($row = $result->fetch_object()) {
			$settopboxes[] = $row;
		}

		$tpl->set('settopboxes', $settopboxes);

		$ereaders = array();

		$result = $db->query("
			SELECT
				b.status, b.platform, IFNULL(v.related,v.platform) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.visible, f.score, f.points, f.results
			FROM
				data_versions AS b
				LEFT JOIN data_platforms AS v ON (b.platform = v.platform)
				LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('ereader',b.type)
			ORDER BY
				score DESC
		");

		while ($row = $result->fetch_object()) {
			$ereaders[] = $row;
		}

		$tpl->set('ereaders', $ereaders);


		echo $tpl->fetch();
	}

	else {
		$tpl = new Template('../templates/results.html');
		$tpl->set('type', $type);


		$main = array();
		$names = array();

		$result = $db->query("
			SELECT
				b.status, v2.name, b.platform, IFNULL(v.related,v.platform) AS id, IFNULL(b.version,'') AS version, f.score
			FROM
				data_versions AS b
				LEFT JOIN data_platforms AS v ON (b.platform = v.platform)
				LEFT JOIN data_platforms AS v2 ON (v2.platform = IFNULL(v.related,v.platform))
				LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				v.order > 0 AND
				b.visible = 1 AND
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('" . $type . "',b.type)
			ORDER BY
				v.order DESC, v2.name, !ISNULL(b.releasedate), b.releasedate DESC
		");

		$count = 0;

		while ($row = $result->fetch_object()) {
			$names[$row->name] = array($row->name, $row->id);

			if (!isset($main[$row->name])) {
				$main[$row->name] = array(null, null);
			}

			if ($row->status == 'development') {
				$main[$row->name][0] = $row;
			}

			if ($row->status == 'current') {
				$main[$row->name][1] = $row;
			}

			if ($row->status == 'legacy' && count($main[$row->name]) < 8) {
				$main[$row->name][] = $row;
			}

			$count = max($count, count($main[$row->name]));
		}

		$tpl->set('main', $main);
		$tpl->set('mainRows', $count);
		$tpl->set('mainColumns', $names);



		$results = array();

		$result = $db->query("
			SELECT
				b.status, b.platform, IFNULL(v.related,v.platform) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.visible, f.score, f.points, f.results
			FROM
				data_versions AS b
				LEFT JOIN data_platforms AS v ON (b.platform = v.platform)
				LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('" . $type . "',b.type)
			ORDER BY
				score DESC
		");

		while ($row = $result->fetch_object()) {
			$results[$row->status][] = $row;
		}


		$tpl->set('results', $results);



		$sets = array();

		$result = $db->query("
			SELECT
				v.order, v2.name AS grouped, b.platform, IFNULL(v.related,v.platform) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, IF(ISNULL(b.releasedate),DATE(NOW()),b.releasedate) AS `releasedate`, b.status, f.score
			FROM
				data_versions AS b
				LEFT JOIN data_platforms AS v ON (b.platform = v.platform)
				LEFT JOIN data_platforms AS v2 ON (v2.platform = IFNULL(v.related,v.platform))
				LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				(!ISNULL(b.releasedate) OR b.status = 'development') AND
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('" . $type . "',v.type) AND
				!ISNULL(f.score)
			ORDER BY
				v2.name, `releasedate`
		");

		while ($row = $result->fetch_object()) {
			$sets[$row->grouped]['name'] = $row->grouped;
			$sets[$row->grouped]['data'][] = $row;
		}

		$tpl->set('sets', $sets);

		echo $tpl->fetch();
	}