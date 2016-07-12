<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../libraries/tools.php');
	include('../models/results.php');


	$tpl = new Template('../templates/timeline.html');

	$db = Factory::Database();

	if (isset($_REQUEST['id'])) {

		$result = $db->query("
			SELECT
				*
			FROM
				data_platforms
			WHERE
				(platform = '" . $db->escape_string($_REQUEST['id']) . "' OR related = '" . $db->escape_string($_REQUEST['id']) . "') AND
				FIND_IN_SET('" . $db->escape_string($_REQUEST['type']) . "',type)
			ORDER BY
				related IS NULL DESC, `order`
		");

		$names = [];
		$name = '';

		while ($row = $result->fetch_object()) {
			$names[] = $row->name;
		}

		$last = array_pop($names);

		if (count($names)) {
			$name = implode(', ', $names) . ' and ' . $last;
		} else {
			$name = $last;
		}

		$tpl->set('name', $name);

		if ($timeline = Results::getTimeline($_REQUEST['id'], $_REQUEST['type'], $GLOBALS['configuration']['release'])) {
			$tpl->set('timeline', $timeline);
		}
	}

	echo $tpl->fetch();
