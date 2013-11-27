<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../libraries/tools.php');
	include('../models/fingerprint.php');
	include('../models/results.php');
	
	
	$tpl = new Template('../templates/fingerprint.html');
		
	if (isset($_REQUEST['id'])) {
		if ($row = Fingerprint::getById($_REQUEST['id'])) {
			$tpl->set('fingerprint', $row);
		}

		if ($row = Results::getByFingerprint($_REQUEST['id'])) {
			$tpl->set('results', $row);
		}
	}
	
	echo $tpl->fetch();
