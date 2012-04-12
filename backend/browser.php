<?php

	include('config.php');
	include('libraries/database.php');
	include('libraries/template.php');
	
	
	$tpl = new Template('templates/browser.html');
	
	$results = array();
	$types = array('desktop', 'tablet', 'mobile', 'television', 'gaming'); 

	foreach($types AS $type) {
		$res = mysql_query("
			SELECT 
				b.unique AS id, b.nickname, b.details, '" . $type . "' AS type
			FROM 
				browsers AS b, 
				scores AS s 
			WHERE 
				b.unique = s.id AND
				b.listed = 1 AND
				FIND_IN_SET('" . $type . "',b.type) AND
				s.version = '" . $version . "' AND
				s.points != ''
			ORDER BY 
				id, nickname
		");
		
		while ($row = mysql_fetch_object($res)) {
			$results[] = $row;
		}
	}
	
	$tpl->set('results', $results);
	
	if (isset($_REQUEST['show'])) {
		$show = explode('/', $_REQUEST['show']);
	
		if (isset($show[0])) {
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
					b.unique ='" . mysql_real_escape_string($show[0]) . "'
			");
			
			if ($row = mysql_fetch_object($res)) {
				$tpl->set('one', json_encode($row));
			}
		}
		
		if (isset($show[1])) {
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
					b.unique ='" . mysql_real_escape_string($show[1]) . "'
			");
			
			if ($row = mysql_fetch_object($res)) {
				$tpl->set('two', json_encode($row));
			}
		}
			
		if (isset($show[2])) {
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
					b.unique ='" . mysql_real_escape_string($show[2]) . "'
			");
			
			if ($row = mysql_fetch_object($res)) {
				$tpl->set('three', json_encode($row));
			}
		}
	}
	
	
	echo $tpl->fetch();