<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');

	$db = Factory::Database();

	$tpl = new Template('../templates/lab-inventory.html');

	$boxes = array();

	$res = $db->query("
		SELECT
			labBoxes.id AS box, labDevices.*
		FROM
			labBoxes
			LEFT JOIN labDevices ON (FIND_IN_SET(labDevices.id,labBoxes.devices))
		ORDER BY
			labBoxes.id, labDevices.deviceManufacturer, labDevices.deviceModel
	");

	while ($row = $res->fetch_object()) {
		$boxes[$row->box][] = $row;
	}

	$tpl->set('boxes', $boxes);



	$operatingsystems = array();

	$res = $db->query("
		SELECT
			labBoxes.id AS box, labDevices.*
		FROM
			labBoxes
			LEFT JOIN labDevices ON (FIND_IN_SET(labDevices.id,labBoxes.devices))
		ORDER BY
			labDevices.osName, labDevices.deviceManufacturer, labDevices.deviceModel
	");

	while ($row = $res->fetch_object()) {
		$operatingsystems[] = $row;
	}

	$tpl->set('operatingsystems', $operatingsystems);



	$manufacturers = array();

	$res = $db->query("
		SELECT
			labBoxes.id AS box, labDevices.*
		FROM
			labBoxes
			LEFT JOIN labDevices ON (FIND_IN_SET(labDevices.id,labBoxes.devices))
		ORDER BY
			labDevices.deviceManufacturer, labDevices.deviceModel, labDevices.osName
	");

	while ($row = $res->fetch_object()) {
		$manufacturers[] = $row;
	}

	$tpl->set('manufacturers', $manufacturers);



	echo $tpl->fetch();
