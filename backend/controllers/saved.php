<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../models/results.php');
	
	$tpl = new Template('../templates/saved.html');
	
	if (isset($_REQUEST['id'])) {
		if ($row = Results::getByUniqueId($_REQUEST['id'])) {
			$tpl->set('one', json_encode($row));
		}
	}
	
	echo $tpl->fetch();
