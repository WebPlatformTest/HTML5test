<?php

	if ($_SERVER['REQUEST_METHOD'] != 'GET') {
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: Content-Type');
		header('Content-Type: application/json');

		if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
			exit;
		}
	} else {
		header('Content-Type: text/javascript');
	}

	include('config.php');
	include('libraries/database.php');
	
	$method = $_REQUEST['method'];
	switch($method) {
	
		case 'loadFeature':
			$results = array();
			
			$res = mysql_query("
				SELECT 
					IF(s.results LIKE '%" . mysql_real_escape_string($_REQUEST['id']) . "=1%',1,0) AS supported, b.unique AS id, CONCAT(b.unique,'-',b.id) AS uid
				FROM 
					browsers AS b, 
					scores AS s 
				WHERE 
					b.unique = s.id AND 
					b.listed = 1 AND
					s.version = '" . $version . "'
			");
			
			while ($row = mysql_fetch_object($res)) {
				$results[] = $row->id . '=' . $row->supported;
			}
			
			echo json_encode(array(
				'id'		=> $_REQUEST['id'],
				'supported' => implode(',', $results)
			));
			
			break;
	
		case 'loadBrowser':
			if (substr($_REQUEST['id'], 0, 7) == 'custom:') {
				$res = mysql_query("
					SELECT 
						'custom' AS id, 'Unique id'  AS nickname, score, bonus, points, results 
					FROM 
						results 
					WHERE 
						uniqueid ='" . mysql_real_escape_string(substr($_REQUEST['id'], 7)) . "'
				");
			} else {
				$res = mysql_query("
					SELECT 
						b.unique AS id, b.nickname, s.score, s.bonus, s.points, s.results 
					FROM 
						browsers AS b, 
						scores AS s 
					WHERE 
						b.unique = s.id AND 
						b.listed = 1 AND
						s.version = '" . $version . "' AND
						b.unique ='" . mysql_real_escape_string($_REQUEST['id']) . "'
				");
			}
		
			if ($row = mysql_fetch_object($res)) {
				echo json_encode($row);
			}
		
			break;
	
		case 'submit':	
			$payload = json_decode($_REQUEST['payload']);
			$headers = apache_request_headers();
						
			$xWapProfile = isset($headers['x-wap-profile']) ? $headers['x-wap-profile'] : '';
			$xOperaMiniPhoneUA = isset($headers['X-OperaMini-Phone-UA']) ? $headers['X-OperaMini-Phone-UA'] : '';
			
			if (!$readonly) {
				mysql_query('
					INSERT INTO 
						results
					SET 
						version = "' . mysql_real_escape_string($payload->version) . '",
						revision = "' . mysql_real_escape_string($payload->revision) . '",
						ip = "' . mysql_real_escape_string($_SERVER['REMOTE_ADDR']) . '",
						uniqueid = "' . mysql_real_escape_string($payload->uniqueid) . '",
						score = "' . mysql_real_escape_string($payload->score) . '",
						bonus = "' . mysql_real_escape_string($payload->bonus) . '",
						camouflage = "' . mysql_real_escape_string($payload->camouflage) . '",
						features = "' . mysql_real_escape_string($payload->features) . '",
						browserName = "' . mysql_real_escape_string($payload->browserName) . '",
						browserChannel = "' . mysql_real_escape_string($payload->browserChannel) . '",
						browserVersion = "' . mysql_real_escape_string($payload->browserVersion) . '",
						browserVersionType = "' . mysql_real_escape_string($payload->browserVersionType) . '",
						browserVersionMajor = "' . intval($payload->browserVersionMajor) . '",
						browserVersionMinor = "' . intval($payload->browserVersionMinor) . '",
						browserVersionOriginal = "' . mysql_real_escape_string($payload->browserVersionOriginal) . '",
						browserMode = "' . mysql_real_escape_string($payload->browserMode) . '",
						engineName = "' . mysql_real_escape_string($payload->engineName) . '",
						engineVersion = "' . mysql_real_escape_string($payload->engineVersion) . '",
						osName = "' . mysql_real_escape_string($payload->osName) . '",
						osVersion = "' . mysql_real_escape_string($payload->osVersion) . '",
						deviceManufacturer = "' . mysql_real_escape_string($payload->deviceManufacturer) . '",
						deviceModel = "' . mysql_real_escape_string($payload->deviceModel) . '",
						deviceWidth = "' . mysql_real_escape_string($payload->deviceWidth) . '",
						deviceHeight = "' . mysql_real_escape_string($payload->deviceHeight) . '",
						deviceType = "' . mysql_real_escape_string($payload->deviceType) . '",
						useragent = "' . mysql_real_escape_string($payload->useragent) . '",
						humanReadable = "' . mysql_real_escape_string($payload->humanReadable) . '",
						xWapProfile = "' . mysql_real_escape_string($xWapProfile) . '",
						xOperaMiniPhoneUA = "' . mysql_real_escape_string($xOperaMiniPhoneUA) . '",
						results = "' . mysql_real_escape_string($payload->results) . '",
						points = "' . mysql_real_escape_string($payload->points) . '",
						status = 0
				');
			}

			break;
			
		case 'confirm':	
			$payload = json_decode($_REQUEST['payload']);

			if (!$readonly) {
				mysql_query('
					UPDATE
						results
					SET 
						status = 1
					WHERE
						uniqueid = "' . mysql_real_escape_string($payload->uniqueid) . '"
				');
			}

			break;
			
		case 'report':	
			$payload = json_decode($_REQUEST['payload']);

			if (!$readonly) {
				mysql_query('
					UPDATE
						results
					SET 
						status = -1
					WHERE
						uniqueid = "' . mysql_real_escape_string($payload->uniqueid) . '"
				');
			}

			break;
	}
