<?php

	class Raw {
		
		
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
					ip = "' . mysql_real_escape_string($_SERVER['REMOTE_ADDR']) . '"
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