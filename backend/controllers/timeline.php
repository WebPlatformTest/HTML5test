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
				platform = '" . $db->escape_string($_REQUEST['id']) . "' AND
				FIND_IN_SET('" . $db->escape_string($_REQUEST['type']) . "',type)
		");

		if ($row = $result->fetch_object()) {
			$tpl->set('platform', $row);
		}

		if ($timeline = Results::getTimeline($_REQUEST['id'], $_REQUEST['type'], $GLOBALS['configuration']['release'])) {
			$tpl->set('timeline', $timeline);
		}
	}

	echo $tpl->fetch();
