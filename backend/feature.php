<?php

	include('config.php');
	include('libraries/database.php');
	include('libraries/template.php');
	

	$tpl = new Template('templates/feature.html');
	
	$results = array();
	$types = array('desktop', 'tablet', 'mobile', 'television', 'gaming'); 

	foreach($types AS $type) {
		$res = mysql_query("
			SELECT 
				b.unique AS id, CONCAT(b.unique,'-" . $type . "-',b.id) AS uid, b.nickname, b.details, '" . $type . "' AS type
			FROM 
				browsers AS b
				LEFT JOIN scores AS s ON (b.unique = s.id)
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				b.listed = 1 AND
				FIND_IN_SET('" . $type . "',b.type) AND
				f.version = '" . $version . "' AND
				f.points != ''
			ORDER BY 
				id, nickname
		");
		
			echo mysql_error();
			

		while ($row = mysql_fetch_object($res)) {
			$results[] = $row;
		}
	}

	$tpl->set('results', $results);

	if (isset($_REQUEST['show'])) {
		$show = explode('/', $_REQUEST['show']);
	
		if (isset($show[0])) {
			$results = array();
			
			$res = mysql_query("
				SELECT 
					IF(f.results LIKE '%" . mysql_real_escape_string($show[0]) . "=1%',1,0) AS supported, b.unique AS id, CONCAT(b.unique,'-',b.id) AS uid
				FROM 
					browsers AS b			
					LEFT JOIN scores AS s ON (b.unique = s.id)
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE 
					b.listed = 1 AND
					s.version = '" . $version . "'
			");
			
			while ($row = mysql_fetch_object($res)) {
				$results[] = $row->id . '=' . $row->supported;
			}
			
			$tpl->set('one', json_encode(array(
				'id'		=> $show[0],
				'supported' => implode(',', $results)
			)));
		}
		
		if (isset($show[1])) {
			$results = array();
			
			$res = mysql_query("
				SELECT 
					IF(f.results LIKE '%" . mysql_real_escape_string($show[1]) . "=1%',1,0) AS supported, b.unique AS id, CONCAT(b.unique,'-',b.id) AS uid 
				FROM 
					browsers AS b 
					LEFT JOIN scores AS s ON (b.unique = s.id)
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE 
					b.listed = 1 AND
					s.version = '" . $version . "'
			");
			
			while ($row = mysql_fetch_object($res)) {
				$results[] = $row->id . '=' . $row->supported;
			}
			
			$tpl->set('two', json_encode(array(
				'id'		=> $show[1],
				'supported' => implode(',', $results)
			)));
		}
			
		if (isset($show[2])) {
			$results = array();
			
			$res = mysql_query("
				SELECT 
					IF(f.results LIKE '%" . mysql_real_escape_string($show[2]) . "=1%',1,0) AS supported, b.unique AS id, CONCAT(b.unique,'-',b.id) AS uid 
				FROM 
					browsers AS b
					LEFT JOIN scores AS s ON (b.unique = s.id)
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE 
					b.listed = 1 AND
					s.version = '" . $version . "'
			");
			
			while ($row = mysql_fetch_object($res)) {
				$results[] = $row->id . '=' . $row->supported;
			}
			
			$tpl->set('three', json_encode(array(
				'id'		=> $show[2],
				'supported' => implode(',', $results)
			)));
		}
	}
		
	echo $tpl->fetch();