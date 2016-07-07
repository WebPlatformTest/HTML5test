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
				v.status, v.platform, IFNULL(p.related,p.platform) AS id, IFNULL(v.version,'') AS version, v.nickname, v.details, v.visible, f.score, f.points, f.results
			FROM
				data_versions AS v
				LEFT JOIN data_platforms AS p ON (v.platform = p.platform)
				LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('gaming-console',v.type)
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
				v.status, v.platform, IFNULL(p.related,p.platform) AS id, IFNULL(v.version,'') AS version, v.nickname, v.details, v.visible, f.score, f.points, f.results
			FROM
				data_versions AS v
				LEFT JOIN data_platforms AS p ON (v.platform = p.platform)
				LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('gaming-portable',v.type)
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
				v.status, v.platform, IFNULL(p.related,p.platform) AS id, IFNULL(v.version,'') AS version, v.nickname, v.details, v.visible, f.score, f.points, f.results
			FROM
				data_versions AS v
				LEFT JOIN data_platforms AS p ON (v.platform = p.platform)
				LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('television-smart',v.type)
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
				v.status, v.platform, IFNULL(p.related,p.platform) AS id, IFNULL(v.version,'') AS version, v.nickname, v.details, v.visible, f.score, f.points, f.results
			FROM
				data_versions AS v
				LEFT JOIN data_platforms AS p ON (v.platform = p.platform)
				LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('television-box',v.type)
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
				v.status, v.platform, IFNULL(p.related,p.platform) AS id, IFNULL(v.version,'') AS version, v.nickname, v.details, v.visible, f.score, f.points, f.results
			FROM
				data_versions AS v
				LEFT JOIN data_platforms AS p ON (v.platform = p.platform)
				LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('ereader',v.type)
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
				v.status, IFNULL(pp.nickname,pp.name) as name, v.platform, IFNULL(p.related,p.platform) AS id, IFNULL(v.version,'') AS version, f.score
			FROM
				data_versions AS v
				LEFT JOIN data_platforms AS p ON (v.platform = p.platform)
				LEFT JOIN data_platforms AS pp ON (pp.platform = IFNULL(p.related,p.platform))
				LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				p.order > 0 AND
				v.visible = 1 AND
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('" . $type . "',v.type)
			ORDER BY
				p.order DESC, IFNULL(pp.nickname,pp.name), !ISNULL(v.releasedate), v.releasedate DESC
		");

		$count = 0;

		while ($row = $result->fetch_object()) {
			$names[$row->name] = array($row->name, $row->id);

			if (!isset($main[$row->name])) {
				$main[$row->name] = array(null, null);
			}

			if ($row->status == 'upcoming') {
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
				v.status, v.platform, IFNULL(p.related,p.platform) AS id, IFNULL(v.version,'') AS version, v.nickname, v.details, v.visible, f.score, f.points, f.results
			FROM
				data_versions AS v
				LEFT JOIN data_platforms AS p ON (v.platform = p.platform)
				LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('" . $type . "',v.type)
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
				p.order, pp.name AS grouped, v.platform, IFNULL(p.related,p.platform) AS id, IFNULL(v.version,'') AS version, v.nickname, v.details, IF(ISNULL(v.releasedate),DATE(NOW()),v.releasedate) AS `releasedate`, v.status, f.score
			FROM
				data_versions AS v
				LEFT JOIN data_platforms AS p ON (v.platform = p.platform)
				LEFT JOIN data_platforms AS pp ON (pp.platform = IFNULL(p.related,p.platform))
				LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				(!ISNULL(v.releasedate) OR v.status = 'upcoming') AND
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('" . $type . "',p.type) AND
				!ISNULL(f.score)
			ORDER BY
				pp.name, `releasedate`
		");

		while ($row = $result->fetch_object()) {
			$sets[$row->grouped]['name'] = $row->grouped;
			$sets[$row->grouped]['data'][] = $row;
		}

		$tpl->set('sets', $sets);

		echo $tpl->fetch();
	}