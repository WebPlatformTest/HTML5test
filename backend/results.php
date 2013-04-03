<?php

	include('config.php');
	include('libraries/database.php');
	include('libraries/template.php');
	
	
	
	$type = $_REQUEST['type'];
	if (!in_array($type, array('desktop', 'mobile', 'tablet', 'gaming', 'television'))) $type = 'desktop';
	
	
	
	$tpl = new Template('templates/results.html');
	$tpl->set('type', $type);
	
	$results = array();

	$res = mysql_query("
		SELECT 
			b.status, b.unique, b.nickname, b.details, b.description, f.score, f.bonus, f.points, f.results 
		FROM 
			browsers AS b
			LEFT JOIN scores AS s ON (b.unique = s.id)
			LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
		WHERE 
			b.listed = 1 AND
			s.version = '" . $version . "' AND
			FIND_IN_SET('" . $type . "',type)
		ORDER BY 
			score DESC, bonus DESC
	");
	
	while ($row = mysql_fetch_object($res)) {
		$results[$row->status][] = $row;
	}

	
	$tpl->set('results', $results);
	if (isset($results['current']) && count($results['current']) > 0) $tpl->set('first', $results['current'][0]);
	if (isset($results['current']) && count($results['current']) > 1) $tpl->set('runnerup', $results['current'][1]);
	if (isset($results['development']) && count($results['development']) > 0) $tpl->set('upcoming', $results['development'][0]);
	
	
	
	
	$sets = array();

	$res = mysql_query("
		SELECT 
			b.grouped, b.unique, b.nickname, b.details, IF(ISNULL(b.release),DATE(NOW()),b.release) AS `release`, b.status, f.score
		FROM 
			browsers AS b
			LEFT JOIN scores AS s ON (b.unique = s.id)
			LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
		WHERE 
			(!ISNULL(b.release) OR b.status = 'development') AND
			s.version = '" . $version . "' AND
			FIND_IN_SET('" . $type . "',type) AND
			!ISNULL(f.score)
		ORDER BY 
			b.grouped, `release`
	");
	
	echo mysql_error();
	
	while ($row = mysql_fetch_object($res)) {
		$sets[$row->grouped]['name'] = $row->grouped;
		$sets[$row->grouped]['data'][] = $row;
	}
	
	$tpl->set('sets', $sets);

	
	echo $tpl->fetch();