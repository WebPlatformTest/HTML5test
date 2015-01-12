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
	include('libraries/tools.php');
	include('models/lab.php');
	include('models/raw.php');
	include('models/browsers.php');
	include('models/results.php');

	
	$method = $_REQUEST['method'];
	switch($method) {
	
		case 'exportResults':
			echo json_encode(Results::export($version));
			break;
	
		case 'myResults':
			echo json_encode(Raw::getMine());
			break;
	
		case 'allResults':
			echo json_encode(Raw::getAll());
			break;
	
		case 'searchResults':
			echo json_encode(Raw::search($_REQUEST['query']));
			break;
	
		case 'loadLabDevice':
			if ($data = Lab::getDevice($_REQUEST['id'])) {
				echo json_encode($data);
			}
			
			break;

		case 'loadFeature':
			echo json_encode(array(
				'id'		=> $_REQUEST['id'],
				'supported' => implode(',', Results::getByFeature($_REQUEST['id'], $version))
			));
			
			break;
	
		case 'loadBrowser':
			if (substr($_REQUEST['id'], 0, 7) == 'custom:') {
				if ($data = Results::getByUniqueId(substr($_REQUEST['id'], 7))) {
					echo json_encode($data);
				}

			} else {
				if ($data = Results::getByBrowser($_REQUEST['id'], $version)) {
					echo json_encode($data);
				}
			}
		
			break;
	
		case 'submit':	
			$payload = json_decode($_REQUEST['payload']);
			$headers = apache_request_headers();
						
			$filteredHeaders = '';

			foreach($headers as $key => $value) {
				if (!in_array(strtolower($key), array(
					'accept', 'host', 'connection', 'dnt', 'user-agent', 'accept-encoding', 'accept-language', 
					'accept-charset', 'referer', 'cookie', 'content-type', 'content-length', 'content-transfer-encoding', 
					'origin', 'pragma', 'cache-control', 'via', 'clientip', 'x-bluecoat-via', 'x-piper-id',
					'x-forwarded-for', 'x-teacup', 'x-saucer', 'isajaxrequest', 'keep-alive', 'max-forwards',
					'xroxy-connection', 'client-ip', 'cookie2', 'x-via', 'x-imforwards', 'http-client-id',
					'x-proxy-id', 'z-forwarded-for', 'expect', 'x-ip-address', 'x-rbt-optimized-by', 'qpr-loop',
					'cuda_cliip', 'x-source-id', 'x-clickoncesupport'
				))) {
					$filteredHeaders .= $key . ": " . $value . "\n";
				}
			}
			
			if (!$readonly && intval($payload->version) >= 5) {
				$useragentHeader = $_SERVER['HTTP_USER_AGENT'];
				$useragentId = preg_replace("/(; ?)[a-z][a-z](?:-[a-zA-Z][a-zA-Z])?([;)])/", '$1xx$2', $useragentHeader);
			
				mysql_query('
					INSERT INTO 
						results
					SET 
						version = "' . mysql_real_escape_string($payload->version) . '",
						revision = "' . mysql_real_escape_string($payload->revision) . '",
						timestamp = NOW(),
						ip = "' . mysql_real_escape_string(get_ip_address()) . '",
						uniqueid = "' . mysql_real_escape_string($payload->uniqueid) . '",
						score = "' . mysql_real_escape_string($payload->score) . '",
						maximum = "' . mysql_real_escape_string($payload->maximum) . '",
						fingerprint = "' . mysql_real_escape_string(md5($payload->results.$payload->points)) . '",
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
						useragentHeader = "' . mysql_real_escape_string($useragentHeader) . '",
						useragentId = "' . mysql_real_escape_string(md5($useragentId)) . '",
						humanReadable = "' . mysql_real_escape_string($payload->humanReadable) . '",
						headers = "' . mysql_real_escape_string($filteredHeaders) . '",
						status = 0
				');

				mysql_query('
					REPLACE INTO 
						indices
					SET 
						fingerprint = "' . mysql_real_escape_string(md5($payload->results.$payload->points)) . '",
						version = "' . mysql_real_escape_string($payload->version) . '",
						score = "' . mysql_real_escape_string($payload->score) . '",
						humanReadable = "' . mysql_real_escape_string($payload->humanReadable) . '",
						browserName = "' . mysql_real_escape_string($payload->browserName) . '",
						browserVersion = "' . mysql_real_escape_string($payload->browserVersion) . '",
						engineName = "' . mysql_real_escape_string($payload->engineName) . '",
						engineVersion = "' . mysql_real_escape_string($payload->engineVersion) . '",
						osName = "' . mysql_real_escape_string($payload->osName) . '",
						osVersion = "' . mysql_real_escape_string($payload->osVersion) . '",
						deviceManufacturer = "' . mysql_real_escape_string($payload->deviceManufacturer) . '",
						deviceModel = "' . mysql_real_escape_string($payload->deviceModel) . '",
						deviceType = "' . mysql_real_escape_string($payload->deviceType) . '",
						timestamp = NOW(),
						uniqueid = "' . mysql_real_escape_string($payload->uniqueid) . '"
				');
				
				mysql_query('
					INSERT INTO 
						fingerprints
					SET 
						fingerprint = "' . mysql_real_escape_string(md5($payload->results.$payload->points)) . '",
						version = "' . mysql_real_escape_string($payload->version) . '",
						score = "' . mysql_real_escape_string($payload->score) . '",
						maximum = "' . mysql_real_escape_string($payload->maximum) . '",
						results = "' . mysql_real_escape_string($payload->results) . '",
						points = "' . mysql_real_escape_string($payload->points) . '"
				');
			}

			break;
			
		case 'feedback':	
			$payload = json_decode($_REQUEST['payload']);

			if (!$readonly) {
				mysql_query('
					UPDATE
						results
					SET 
						status = -1,
						comments = "' . mysql_real_escape_string($payload->value) . '"
					WHERE
						uniqueid = "' . mysql_real_escape_string($payload->uniqueid) . '"
				');
			}

			break;
			
		case 'save':	
			$payload = json_decode($_REQUEST['payload']);

			if (!$readonly) {
				mysql_query('
					UPDATE
						results
					SET 
						used = used + 1,
						lastUsed = NOW()
					WHERE
						uniqueid = "' . mysql_real_escape_string($payload->uniqueid) . '"
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
