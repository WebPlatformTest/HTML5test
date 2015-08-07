<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../libraries/tools.php');
	include('../models/results.php');
	
	
	$tpl = new Template('../templates/timeline.html');
		
	if (isset($_REQUEST['id'])) {
		
		$res = mysql_query("
			SELECT 
				*
			FROM 
				browserVariants
			WHERE 
				id = '" . mysql_real_escape_string($_REQUEST['id']) . "' AND
				FIND_IN_SET('" . mysql_real_escape_string($_REQUEST['type']) . "',type)
		");
		
		if ($row = mysql_fetch_object($res)) {
			$tpl->set('variant', $row);
		}		
		
		if ($timeline = Results::getTimeline($_REQUEST['id'], $_REQUEST['type'], $version)) {
			$tpl->set('timeline', $timeline);
		}
	}
	
	echo $tpl->fetch();
