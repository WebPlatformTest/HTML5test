<?php

	class Raw {
		
		
		function search($query) {
			$parts = opt_explode(' ', $query);
			$where = array();
		
			for ($p = 0; $p < count($parts); $p++) {
				if ('browserName:' == substr($parts[$p], 0, 12)) {
					$where[] = 'browserName LIKE "%' . mysql_real_escape_string(substr($parts[$p], 12)) . '%"';
				}
			
				else if ('engineName:' == substr($parts[$p], 0, 11)) {
					$where[] = 'engineName LIKE "%' . mysql_real_escape_string(substr($parts[$p], 11)) . '%"';
				}
			
				else if ('osName:' == substr($parts[$p], 0, 7)) {
					$where[] = 'osName LIKE "%' . mysql_real_escape_string(substr($parts[$p], 7)) . '%"';
				}
			
				else if ('deviceManufacturer:' == substr($parts[$p], 0, 19)) {
					$where[] = 'deviceManufacturer LIKE "%' . mysql_real_escape_string(substr($parts[$p], 19)) . '%"';
				}
			
				else if ('deviceModel:' == substr($parts[$p], 0, 12)) {
					$where[] = 'deviceModel LIKE "%' . mysql_real_escape_string(substr($parts[$p], 12)) . '%"';
				}
			
				else if ('useragent:' == substr($parts[$p], 0, 10)) {
					$where[] = 'useragent LIKE "%' . mysql_real_escape_string(substr($parts[$p], 10)) . '%"';
				}
			
				else {
					$where[] = 'humanReadable LIKE "%' . mysql_real_escape_string($parts[$p]) . '%"';
				}
			}
	
		
			$results = array();
			
			$res = mysql_query('
				SELECT
					timestamp, uniqueid, score, humanReadable
				FROM 
					results
				WHERE
					' . implode(' AND ', $where) . '
				ORDER BY 
					timestamp DESC
				LIMIT 100
			');
			
			echo mysql_error();
			
			while ($row = mysql_fetch_object($res)) {
				$results[] = (object) array(
					'uniqueid'		=>	$row->uniqueid,
					'score'			=>	intval($row->score),
					'humanReadable'	=>	$row->humanReadable,
					'ago'			=>	time_ago(strtotime($row->timestamp))
				);
			}
			
			return $results;
		}
		
		function getAll() {
			$results = array();
			
			$res = mysql_query('
				SELECT
					timestamp, uniqueid, score, humanReadable
				FROM 
					results
				ORDER BY 
					timestamp DESC
				LIMIT 100
			');
			
			echo mysql_error();
			
			while ($row = mysql_fetch_object($res)) {
				$results[] = (object) array(
					'uniqueid'		=>	$row->uniqueid,
					'score'			=>	intval($row->score),
					'humanReadable'	=>	$row->humanReadable,
					'ago'			=>	time_ago(strtotime($row->timestamp))
				);
			}
			
			return $results;
		}
		
		function getMine() {
			$results = array();
			
			$res = mysql_query('
				SELECT
					timestamp, uniqueid, score, humanReadable
				FROM 
					results
				WHERE
					ip = "' . mysql_real_escape_string(get_ip_address()) . '"
				ORDER BY 
					timestamp DESC
				LIMIT 100
			');
			
			echo mysql_error();
			
			while ($row = mysql_fetch_object($res)) {
				$results[] = (object) array(
					'uniqueid'		=>	$row->uniqueid,
					'score'			=>	intval($row->score),
					'humanReadable'	=>	$row->humanReadable,
					'ago'			=>	time_ago(strtotime($row->timestamp))
				);
			}
			
			return $results;
		}
		
		
	}