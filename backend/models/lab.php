<?php

	class Lab {

		function getDevice($id) {
			$db = Factory::Database();

			$res = $db->query("
				SELECT
					*
				FROM
					labDevices
				WHERE
					id = '" . intval($id) . "'
			");

			if ($row = $res->fetch_object()) {
				$row->simSize = ucfirst($row->simSize);
				$row->simLocked = !! $row->simLocked;
				$row->hasInspect = !! $row->hasInspect;
				$row->hasWifi = !! $row->hasWifi;
				$row->otherBrowsers = explode(',', $row->otherBrowsers);
				$row->otherBrowsers = array_combine($row->otherBrowsers, $row->otherBrowsers);

				switch($row->deviceType) {
					case 'mobile': 		$row->type = 'Phone'; break;
					case 'tablet': 		$row->type = 'Tablet'; break;
					case 'media': 		$row->type = 'Media player'; break;
					case 'netbook': 	$row->type = 'Netbook'; break;
					case 'laptop': 		$row->type = 'Laptop'; break;
					case 'ereader': 	$row->type = 'E-reader'; break;
					case 'gaming': 		$row->type = 'Gaming'; break;
					case 'pda': 		$row->type = 'PDA'; break;
					case 'television': 	$row->type = 'Television'; break;
					default:			$row->type = 'Other';
				}

				if ($row->defaultFingerprint) {
					$row->defaultResults = Results::getByUniqueId($row->defaultFingerprint);
				}

				return $row;
			}
		}

	}