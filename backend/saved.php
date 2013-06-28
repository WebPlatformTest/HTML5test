<?php

	include('config.php');
	include('libraries/database.php');
	include('libraries/template.php');
	
	$tpl = new Template('templates/saved.html');
	
	if (isset($_REQUEST['id'])) {
		if ($row = getResultsForUniqueId($_REQUEST['id'])) {
			$tpl->set('one', json_encode($row));
		}
	}
	
	echo $tpl->fetch();
	
	
	function getResultsForUniqueId($id) {
		$res = mysql_query("
			SELECT 
				r.uniqueid AS id, 'Unique id' AS nickname, f.score, f.maximum, f.points, f.results, humanReadable, useragentHeader AS useragent, deviceWidth, deviceHeight 
			FROM 
				results AS r
				LEFT JOIN fingerprints AS f ON (r.fingerprint = f.fingerprint)
			WHERE 
				r.uniqueid ='" . mysql_real_escape_string($id) . "'
		");
		
		if ($row = mysql_fetch_object($res)) {
			return $row;
		}		
	}
	
	
	