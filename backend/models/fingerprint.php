<?php

	class Fingerprint {

		static function calculatePercentages($items) {
			$total = 0;

			while (list($k,$v) = each($items)) {
				$total += $v['value'];
			}

			reset ($items);

			while (list($k,$v) = each($items)) {
				$items[$k]['percentage'] = round(($v['value'] / $total) * 100);

				if ($items[$k]['percentage'] == 0) {
					unset($items[$k]);
				}

				//unset($items[$k]['value']);
			}

			return $items;
		}

		static function process($data) {
			$data['items'] = Fingerprint::calculatePercentages($data['items']);

			if (count($data['items']) == 1) {
				$data['status'] = 'fixed';

				reset ($data['items']);
				list($data['value'],) = each($data['items']);

				//unset($data['items']);
			}

			if (count($data['items']) > 20) {
				$data['status'] = 'none';
				unset($data['items']);
			}

			if ($data['status'] == 'fixed' || $data['status'] == 'list') {
				$items = array();

				reset ($data['items']);
				while (list($k,$v) = each($data['items'])) {
					$items[] = array('name' => $k, 'value' => $v['value'], 'percentage' => $v['percentage']);
				}

				$data['items'] = $items;

				usort($data['items'], function ($a, $b) {
				    if ($a['value'] == $b['value']) {
				        return 0;
				    }
				    return ($a['value'] > $b['value']) ? -1 : 1;
				});
			}

			return $data;
		}


		static function getById($id) {
			$results = array(
				'results'				=> array(),
				'browserName'			=> array('items' => array(), 'status' => 'list'),
				'browserVersion'		=> array('items' => array(), 'status' => 'list'),
				'osName'				=> array('items' => array(), 'status' => 'list'),
				'osVersion'				=> array('items' => array(), 'status' => 'list'),
				'deviceManufacturer'	=> array('items' => array(), 'status' => 'list'),
				'deviceModel'			=> array('items' => array(), 'status' => 'list')
			);

			$db = Factory::Database();

			$result = $db->query("
				SELECT
					*
				FROM
					results
				WHERE
					fingerprint = '" . $db->escape_string($id) . "'
				ORDER BY
					humanReadable
			");

			while ($row = $result->fetch_object()) {
				$results['results'][] = (object) array(
					'id'	=> $row->uniqueid,
					'name'	=> $row->humanReadable,
					'ago'	=> time_ago(strtotime($row->timestamp))
				);

				if (!isset($results['browserName']['items'][trim($row->browserName)])) {
					$results['browserName']['items'][trim($row->browserName)] = array('value' => 0);
				}

				$results['browserName']['items'][trim($row->browserName)]['value']++;


				if (!isset($results['browserVersion']['items'][trim($row->browserName . ' ' . $row->browserVersion)])) {
					$results['browserVersion']['items'][trim($row->browserName . ' ' . $row->browserVersion)] = array('value' => 0);
				}

				$results['browserVersion']['items'][trim($row->browserName . ' ' . $row->browserVersion)]['value']++;


				if (!isset($results['osName']['items'][trim($row->osName)])) {
					$results['osName']['items'][trim($row->osName)] = array('value' => 0);
				}

				$results['osName']['items'][trim($row->osName)]['value']++;


				if (!isset($results['osVersion']['items'][trim($row->osName . ' ' . $row->osVersion)])) {
					$results['osVersion']['items'][trim($row->osName . ' ' . $row->osVersion)] = array('value' => 0);
				}

				$results['osVersion']['items'][trim($row->osName . ' ' . $row->osVersion)]['value']++;


				if (!isset($results['deviceManufacturer']['items'][trim($row->deviceManufacturer)])) {
					$results['deviceManufacturer']['items'][trim($row->deviceManufacturer)] = array('value' => 0);
				}

				$results['deviceManufacturer']['items'][trim($row->deviceManufacturer)]['value']++;


				if (!isset($results['deviceModel']['items'][trim($row->deviceManufacturer . ' ' . $row->deviceModel)])) {
					$results['deviceModel']['items'][trim($row->deviceManufacturer . ' ' . $row->deviceModel)] = array('value' => 0);
				}

				$results['deviceModel']['items'][trim($row->deviceManufacturer . ' ' . $row->deviceModel)]['value']++;
			}


			$results['browserName'] = Fingerprint::process($results['browserName']);
			$results['browserVersion'] = Fingerprint::process($results['browserVersion']);
			$results['osName'] = Fingerprint::process($results['osName']);
			$results['osVersion'] = Fingerprint::process($results['osVersion']);
			$results['deviceManufacturer'] = Fingerprint::process($results['deviceManufacturer']);
			$results['deviceModel'] = Fingerprint::process($results['deviceModel']);

			if ($results['deviceManufacturer']['status'] == 'fixed' && $results['deviceManufacturer']['value'] == '') {
				$results['deviceManufacturer']['status'] = 'none';
				unset($results['deviceManufacturer']['value']);
			}

			if ($results['deviceModel']['status'] == 'fixed' && $results['deviceModel']['value'] == '') {
				$results['deviceModel']['status'] = 'none';
				unset($results['deviceModel']['value']);
			}

			return $results;
		}
	}