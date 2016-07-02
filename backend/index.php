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

	require __DIR__ . '/../vendor/autoload.php';

	include('libraries/database.php');
	include('libraries/tools.php');
	include('models/lab.php');
	include('models/raw.php');
	include('models/browsers.php');
	include('models/results.php');

	use Ramsey\Uuid\Uuid;

	$method = $_REQUEST['method'];
	switch($method) {

		case 'getIdentifiers':
			$data = array();

			$db = Factory::Database();
			$result = $db->query('SELECT DISTINCT identifier FROM results WHERE `release` = "' . $GLOBALS['configuration']['release'] . '" AND source = "' . $db->escape_string($_REQUEST['source']) . '"');
			while ($row = $result->fetch_object()) {
				$data[] = $row->identifier;
			}

			echo json_encode($data);
			break;

		case 'getTask':
			$task = Uuid::uuid4();
			$source = $_REQUEST['source'];
			$identifier = $_REQUEST['identifier'];

			$url = (!empty($_SERVER['HTTPS']) ? 'https://' : 'http://') .
					$_SERVER['HTTP_HOST'] .
					'/index.html' .
					'?task=' . $task .
					'&source=' . rawurlencode($source) .
					'&identifier=' . rawurlencode($identifier);

			echo json_encode(array('task' => $task, 'url' => $url));
			break;

		case 'hasTask':
			$db = Factory::Database();
			$result = $db->query('SELECT * FROM results WHERE task = "' . $db->escape_string($_REQUEST['task']) . '"');

			if ($result->num_rows) {
				if ($row = $result->fetch_object()) {
					$url = (!empty($_SERVER['HTTPS']) ? 'https://' : 'http://') .
							$_SERVER['HTTP_HOST'] .
							'/s/' .
							$row->uniqueid .
							'.html';

					echo json_encode(array(
						'source' => $row->source,
						'identifier' => $row->identifier,
						'score' => intval($row->score),
						'fingerprint' => $row->fingerprint,
						'url' => $url,
					));
				}
			} else {
				echo 'false';
			}
			break;

		case 'exportResults':
			echo json_encode(Results::export($GLOBALS['configuration']['release']));
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
				'key'		=> $_REQUEST['key'],
				'supported' => implode(',', Results::getByFeature($_REQUEST['key'], $GLOBALS['configuration']['release']))
			));

			break;

		case 'loadBrowser':
			if (substr($_REQUEST['id'], 0, 7) == 'custom:') {
				if ($data = Results::getByUniqueId(substr($_REQUEST['id'], 7))) {
					echo json_encode($data);
				}

			} else {
				if ($data = Results::getByBrowser($_REQUEST['id'], $GLOBALS['configuration']['release'])) {
					echo json_encode($data);
				}
			}

			break;

		case 'submit':
			$payload = json_decode($_REQUEST['payload']);
			$headers = getallheaders();

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

			if (!$GLOBALS['configuration']['readonly'] && intval($payload->release) >= 5) {
				$useragentHeader = $_SERVER['HTTP_USER_AGENT'];
				$useragentId = preg_replace("/(; ?)[a-z][a-z](?:-[a-zA-Z][a-zA-Z])?([;)])/", '$1xx$2', $useragentHeader);

				$db = Factory::Database();

				$db->query('
					INSERT INTO
						results
					SET
						`release` = "' . $db->escape_string($payload->release) . '",
						`timestamp` = NOW(),
						`ip` = "' . $db->escape_string(get_ip_address()) . '",
						`source` = ' . (is_null($payload->source) ? 'NULL' : '"' . $db->escape_string($payload->source) . '"') . ',
						`identifier` = ' . (is_null($payload->identifier) ? 'NULL' : '"' . $db->escape_string($payload->identifier) . '"') . ',
						`task` = ' . (is_null($payload->task) ? 'NULL' : '"' . $db->escape_string($payload->task) . '"') . ',
						`uniqueid` = "' . $db->escape_string($payload->uniqueid) . '",
						`score` = "' . $db->escape_string($payload->score) . '",
						`maximum` = "' . $db->escape_string($payload->maximum) . '",
						`fingerprint` = "' . $db->escape_string(md5($payload->results.$payload->points)) . '",
						`camouflage` = "' . $db->escape_string($payload->camouflage) . '",
						`features` = "' . $db->escape_string($payload->features) . '",
						`browserName` = "' . $db->escape_string($payload->browserName) . '",
						`browserChannel` = "' . $db->escape_string($payload->browserChannel) . '",
						`browserVersion` = "' . $db->escape_string($payload->browserVersion) . '",
						`browserVersionType` = "' . $db->escape_string($payload->browserVersionType) . '",
						`browserVersionMajor` = "' . intval($payload->browserVersionMajor) . '",
						`browserVersionMinor` = "' . intval($payload->browserVersionMinor) . '",
						`browserVersionOriginal` = "' . $db->escape_string($payload->browserVersionOriginal) . '",
						`browserMode` = "' . $db->escape_string($payload->browserMode) . '",
						`engineName` = "' . $db->escape_string($payload->engineName) . '",
						`engineVersion` = "' . $db->escape_string($payload->engineVersion) . '",
						`osName` = "' . $db->escape_string($payload->osName) . '",
						`osFamily` = "' . $db->escape_string($payload->osFamily) . '",
						`osVersion` = "' . $db->escape_string($payload->osVersion) . '",
						`deviceManufacturer` = "' . $db->escape_string($payload->deviceManufacturer) . '",
						`deviceModel` = "' . $db->escape_string($payload->deviceModel) . '",
						`deviceSeries` = "' . $db->escape_string($payload->deviceSeries) . '",
						`deviceWidth` = "' . $db->escape_string($payload->deviceWidth) . '",
						`deviceHeight` = "' . $db->escape_string($payload->deviceHeight) . '",
						`deviceType` = "' . $db->escape_string($payload->deviceType) . '",
						`useragent` = "' . $db->escape_string($payload->useragent) . '",
						`useragentHeader` = "' . $db->escape_string($useragentHeader) . '",
						`useragentId` = "' . $db->escape_string(md5($useragentId)) . '",
						`humanReadable` = "' . $db->escape_string($payload->humanReadable) . '",
						`headers` = "' . $db->escape_string($filteredHeaders) . '",
						`status` = 0
				');

				echo $db->error;

				$db->query('
					REPLACE INTO
						indices
					SET
						`release` = "' . $db->escape_string($payload->release) . '",
						`fingerprint` = "' . $db->escape_string(md5($payload->results.$payload->points)) . '",
						`score` = "' . $db->escape_string($payload->score) . '",
						`humanReadable` = "' . $db->escape_string($payload->humanReadable) . '",
						`browserName` = "' . $db->escape_string($payload->browserName) . '",
						`browserVersion` = "' . $db->escape_string($payload->browserVersion) . '",
						`engineName` = "' . $db->escape_string($payload->engineName) . '",
						`engineVersion` = "' . $db->escape_string($payload->engineVersion) . '",
						`osName` = "' . $db->escape_string($payload->osName) . '",
						`osFamily` = "' . $db->escape_string($payload->osFamily) . '",
						`osVersion` = "' . $db->escape_string($payload->osVersion) . '",
						`deviceManufacturer` = "' . $db->escape_string($payload->deviceManufacturer) . '",
						`deviceModel` = "' . $db->escape_string($payload->deviceModel) . '",
						`deviceSeries` = "' . $db->escape_string($payload->deviceSeries) . '",
						`deviceType` = "' . $db->escape_string($payload->deviceType) . '",
						`timestamp` = NOW(),
						`uniqueid` = "' . $db->escape_string($payload->uniqueid) . '"
				');

				$db->query('
					INSERT INTO
						fingerprints
					SET
						`release` = "' . $db->escape_string($payload->release) . '",
						`fingerprint` = "' . $db->escape_string(md5($payload->results.$payload->points)) . '",
						`score` = "' . $db->escape_string($payload->score) . '",
						`maximum` = "' . $db->escape_string($payload->maximum) . '",
						`results` = "' . $db->escape_string($payload->results) . '",
						`points` = "' . $db->escape_string($payload->points) . '"
				');
			}

			break;

		case 'feedback':
			$payload = json_decode($_REQUEST['payload']);

			if (!$GLOBALS['configuration']['readonly']) {
				$db = Factory::Database();

				$db->query('
					UPDATE
						results
					SET
						status = -1,
						comments = "' . $db->escape_string($payload->value) . '"
					WHERE
						uniqueid = "' . $db->escape_string($payload->uniqueid) . '"
				');
			}

			break;

		case 'save':
			$payload = json_decode($_REQUEST['payload']);

			if (!$GLOBALS['configuration']['readonly']) {
				$db = Factory::Database();

				$db->query('
					UPDATE
						results
					SET
						used = used + 1,
						lastUsed = NOW()
					WHERE
						uniqueid = "' . $db->escape_string($payload->uniqueid) . '"
				');
			}

			break;

		case 'confirm':
			$payload = json_decode($_REQUEST['payload']);

			if (!$GLOBALS['configuration']['readonly']) {
				$db = Factory::Database();

				$db->query('
					UPDATE
						results
					SET
						status = 1
					WHERE
						uniqueid = "' . $db->escape_string($payload->uniqueid) . '"
				');
			}

			break;

		case 'report':
			$payload = json_decode($_REQUEST['payload']);

			if (!$GLOBALS['configuration']['readonly']) {
				$db = Factory::Database();

				$db->query('
					UPDATE
						results
					SET
						status = -1
					WHERE
						uniqueid = "' . $db->escape_string($payload->uniqueid) . '"
				');
			}

			break;
	}
