<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../models/results.php');
	
	$tpl = new Template('../templates/saved.html');
	$tpl->set('version', intval($version));
	
	if (isset($_REQUEST['id'])) {
		
		if ($row = Results::getByUniqueId($_REQUEST['id'])) {
			$tpl->set('one', json_encode($row));
			$tpl->set('legacy', intval($row->version) != intval($version));
			$tpl->set('version', intval($row->version));
		}
	}
	
	echo $tpl->fetch();
