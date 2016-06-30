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
				b.status, b.variant, IFNULL(v.replaced,v.id) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.listed, f.score, f.points, f.results
			FROM
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
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
				b.status, b.variant, IFNULL(v.replaced,v.id) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.listed, f.score, f.points, f.results
			FROM
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
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
				b.status, b.variant, IFNULL(v.replaced,v.id) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.listed, f.score, f.points, f.results
			FROM
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
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
				b.status, b.variant, IFNULL(v.replaced,v.id) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.listed, f.score, f.points, f.results
			FROM
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
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
				b.status, b.variant, IFNULL(v.replaced,v.id) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.listed, f.score, f.points, f.results
			FROM
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
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
				b.status, IFNULL(v.nickname,v.name) AS name, b.variant, IFNULL(v.replaced,v.id) AS id, IFNULL(b.version,'') AS version, f.score
			FROM
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				v.importance > 0 AND
				b.listed = 1 AND
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('" . $type . "',b.type)
			ORDER BY
				IFNULL(v.nickname,v.name), !ISNULL(b.release), b.release DESC
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
				b.status, b.variant, IFNULL(v.replaced,v.id) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, b.listed, f.score, f.points, f.results
			FROM
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
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
		if (isset($results['current']) && count($results['current']) > 0) $tpl->set('first', $results['current'][0]);
		if (isset($results['current']) && count($results['current']) > 1) $tpl->set('runnerup', $results['current'][1]);
		if (isset($results['development']) && count($results['development']) > 0) $tpl->set('upcoming', $results['development'][0]);




		$sets = array();

		$result = $db->query("
			SELECT
				v.importance, IFNULL(v.nickname,v.name) AS name, b.grouped, b.variant, IFNULL(v.replaced,v.id) AS id, IFNULL(b.version,'') AS version, b.nickname, b.details, IF(ISNULL(b.release),DATE(NOW()),b.release) AS `release`, b.status, f.score
			FROM
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE
				(!ISNULL(b.release) OR b.status = 'development') AND
				s.release = '" . $GLOBALS['configuration']['release'] . "' AND
				FIND_IN_SET('" . $type . "',v.type) AND
				!ISNULL(f.score)
			ORDER BY
				b.grouped, `release`
		");

		while ($row = $result->fetch_object()) {
			$sets[$row->grouped]['name'] = $row->grouped;
			$sets[$row->grouped]['data'][] = $row;
		}

		$tpl->set('sets', $sets);

		echo $tpl->fetch();
	}