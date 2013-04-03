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
				browsers AS b
				LEFT JOIN scores AS s ON (b.unique = s.id)
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				b.listed = 1 AND
				FIND_IN_SET('" . $type . "',b.type) AND
				s.version = '" . $version . "' AND
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
			if (preg_match("/^[0-9]+\_[a-f0-9]{4,4}$/", $show[0])) {
				if ($row = getResultsForUniqueId($show[0])) {
					$tpl->set('one', json_encode($row));
				}
			}
			
			else {
				if ($row = getResultsForBrowser($show[0], $version)) {
					$tpl->set('one', json_encode($row));
				}
			}
		}
		
		if (isset($show[1])) {
			if (preg_match("/^[0-9]+\_[a-f0-9]{4,4}$/", $show[1])) {
				if ($row = getResultsForUniqueId($show[1])) {
					$tpl->set('two', json_encode($row));
				}
			}
			
			else {
				if ($row = getResultsForBrowser($show[1], $version)) {
					$tpl->set('two', json_encode($row));
				}
			}
		}
			
		if (isset($show[2])) {
			if (preg_match("/^[0-9]+\_[a-f0-9]{4,4}$/", $show[2])) {
				if ($row = getResultsForUniqueId($show[2])) {
					$tpl->set('three', json_encode($row));
				}
			}
			
			else {
				if ($row = getResultsForBrowser($show[2], $version)) {
					$tpl->set('three', json_encode($row));
				}
			}
		}
	}
	
	
	echo $tpl->fetch();
	
		
	function getResultsForBrowser($browser, $version) {
		$res = mysql_query("
			SELECT 
				b.unique AS id, b.nickname, f.score, f.bonus, f.points, f.results 
			FROM 
				browsers AS b
				LEFT JOIN scores AS s ON (b.unique = s.id)
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				b.listed = 1 AND
				s.version = '" . $version . "' AND
				b.unique ='" . mysql_real_escape_string($browser) . "'
		");
		
		if ($row = mysql_fetch_object($res)) {
			return $row;
		}		
	}
	


	function getResultsForUniqueId($id) {
		$res = mysql_query("
			SELECT 
				r.uniqueid AS id, 'Unique id' AS nickname, r.score, r.bonus, r.points, r.results, humanReadable, useragentHeader AS useragent, deviceWidth, deviceHeight 
			FROM 
				results AS r
			WHERE 
				r.uniqueid ='" . mysql_real_escape_string($id) . "'
		");
		
		if ($row = mysql_fetch_object($res)) {
			return $row;
		}		
	}
	
	
	