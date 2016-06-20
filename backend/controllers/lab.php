<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');

	$db = Factory::Database();

	$tpl = new Template('../templates/lab.html');

	$devices = array();
	$available = 0;

	$res = $db->query("
		SELECT
			*
		FROM
			labDevices
		ORDER BY
			osName IS NULL, osName, deviceManufacturer, deviceModel
	");

	while ($row = $res->fetch_object()) {
		$devices[] = $row;

		if ($row->isAvailable) $available++;
	}

	$tpl->set('devices', $devices);
	$tpl->set('available', $available);

	echo $tpl->fetch();
