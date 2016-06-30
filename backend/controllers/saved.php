<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../models/results.php');

	$tpl = new Template('../templates/saved.html');
	$tpl->set('release', intval($GLOBALS['configuration']['release']));

	if (isset($_REQUEST['id'])) {

		if ($row = Results::getByUniqueId($_REQUEST['id'])) {
			$tpl->set('one', json_encode($row));
			$tpl->set('legacy', intval($row->release) != intval($GLOBALS['configuration']['release']));
			$tpl->set('release', intval($row->release));
		}
	}

	echo $tpl->fetch();
