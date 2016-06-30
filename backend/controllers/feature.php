<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../libraries/tools.php');
	include('../models/browsers.php');
	include('../models/results.php');


	$tpl = new Template('../templates/feature.html');


	$tpl->set('results', Browsers::getAll($GLOBALS['configuration']['release']));

	if (isset($_REQUEST['show'])) {
		$show = explode('/', $_REQUEST['show']);

		if (isset($show[0])) {
			$tpl->set('one', json_encode(array(
				'key'		=> $show[0],
				'supported' => implode(',', Results::getByFeature($show[0], $GLOBALS['configuration']['release']))
			)));
		}

		if (isset($show[1])) {
			$tpl->set('two', json_encode(array(
				'key'		=> $show[1],
				'supported' => implode(',', Results::getByFeature($show[1], $GLOBALS['configuration']['release']))
			)));
		}

		if (isset($show[2])) {
			$tpl->set('three', json_encode(array(
				'key'		=> $show[2],
				'supported' => implode(',', Results::getByFeature($show[2], $GLOBALS['configuration']['release']))
			)));
		}

		if (isset($show[3])) {
			$tpl->set('four', json_encode(array(
				'key'		=> $show[3],
				'supported' => implode(',', Results::getByFeature($show[3], $GLOBALS['configuration']['release']))
			)));
		}

		if (isset($show[4])) {
			$tpl->set('five', json_encode(array(
				'key'		=> $show[4],
				'supported' => implode(',', Results::getByFeature($show[4], $GLOBALS['configuration']['release']))
			)));
		}
	}

	echo $tpl->fetch();