<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	
	$tpl = new Template('../templates/lab-inventory.html');

	$boxes = array();
	
	$res = mysql_query("
		SELECT 
			labBoxes.id AS box, labDevices.*
		FROM 
			labBoxes
			LEFT JOIN labDevices ON (FIND_IN_SET(labDevices.id,labBoxes.devices))
		ORDER BY
			labBoxes.id, labDevices.deviceManufacturer, labDevices.deviceModel
	");
	
	while ($row = mysql_fetch_object($res)) {
		$boxes[$row->box][] = $row;
	}		

	$tpl->set('boxes', $boxes);



	$operatingsystems = array();
	
	$res = mysql_query("
		SELECT 
			labBoxes.id AS box, labDevices.*
		FROM 
			labBoxes
			LEFT JOIN labDevices ON (FIND_IN_SET(labDevices.id,labBoxes.devices))
		ORDER BY
			labDevices.osName, labDevices.deviceManufacturer, labDevices.deviceModel
	");
	
	while ($row = mysql_fetch_object($res)) {
		$operatingsystems[] = $row;
	}		

	$tpl->set('operatingsystems', $operatingsystems);



	$manufacturers = array();
	
	$res = mysql_query("
		SELECT 
			labBoxes.id AS box, labDevices.*
		FROM 
			labBoxes
			LEFT JOIN labDevices ON (FIND_IN_SET(labDevices.id,labBoxes.devices))
		ORDER BY
			labDevices.deviceManufacturer, labDevices.deviceModel, labDevices.osName
	");
	
	while ($row = mysql_fetch_object($res)) {
		$manufacturers[] = $row;
	}		

	$tpl->set('manufacturers', $manufacturers);



	echo $tpl->fetch();
