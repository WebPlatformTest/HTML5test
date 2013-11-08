<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	
	$tpl = new Template('../templates/lab.html');
	
	$devices = array();
	$available = 0;

	$res = mysql_query("
		SELECT 
			*
		FROM 
			labDevices
		ORDER BY
			osName IS NULL, osName, deviceManufacturer, deviceModel
	");
	
	while ($row = mysql_fetch_object($res)) {
		$devices[] = $row;
		
		if ($row->isAvailable) $available++;
	}		

	$tpl->set('devices', $devices);
	$tpl->set('available', $available);
	
	echo $tpl->fetch();
