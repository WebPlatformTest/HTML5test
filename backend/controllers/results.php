<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	
	
	
	$type = $_REQUEST['type'];
	if (!in_array($type, array('desktop', 'mobile', 'tablet', 'gaming', 'television', 'other'))) $type = 'desktop';

	if (in_array($type, array('gaming', 'television'))) {
		header('Location: /results/other.html#' . $type);
		exit;
	}
	
	
	
	if ($type == 'other') {
		$tpl = new Template('../templates/results-other.html');
		$tpl->set('type', $type);
		
		
		$consoles = array();
	
		$res = mysql_query("
			SELECT 
				b.status, b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, b.description, b.listed, f.score, f.points, f.results 
			FROM 
				browserVersions AS b
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				s.release = '" . $version . "' AND
				FIND_IN_SET('gaming-console',type)
			ORDER BY 
				score DESC
		");
		
		while ($row = mysql_fetch_object($res)) {
			$consoles[] = $row;
		}
		
		$tpl->set('consoles', $consoles);
		
		$portables = array();
	
		$res = mysql_query("
			SELECT 
				b.status, b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, b.description, b.listed, f.score, f.points, f.results 
			FROM 
				browserVersions AS b
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				s.release = '" . $version . "' AND
				FIND_IN_SET('gaming-portable',type)
			ORDER BY 
				score DESC
		");
		
		while ($row = mysql_fetch_object($res)) {
			$portables[] = $row;
		}
		
		$tpl->set('portables', $portables);
		
		$smarttvs = array();
	
		$res = mysql_query("
			SELECT 
				b.status, b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, b.description, b.listed, f.score, f.points, f.results 
			FROM 
				browserVersions AS b
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				s.release = '" . $version . "' AND
				FIND_IN_SET('television-smart',type)
			ORDER BY 
				score DESC
		");
		
		while ($row = mysql_fetch_object($res)) {
			$smarttvs[$row->status][] = $row;
		}
		
		$tpl->set('smarttvs', $smarttvs);
		
		$settopboxes = array();
	
		$res = mysql_query("
			SELECT 
				b.status, b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, b.description, b.listed, f.score, f.points, f.results 
			FROM 
				browserVersions AS b
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				s.release = '" . $version . "' AND
				FIND_IN_SET('television-box',type)
			ORDER BY 
				score DESC
		");
		
		while ($row = mysql_fetch_object($res)) {
			$settopboxes[] = $row;
		}
		
		$tpl->set('settopboxes', $settopboxes);

		$ereaders = array();
	
		$res = mysql_query("
			SELECT 
				b.status, b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, b.description, b.listed, f.score, f.points, f.results 
			FROM 
				browserVersions AS b
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				s.release = '" . $version . "' AND
				FIND_IN_SET('ereader',type)
			ORDER BY 
				score DESC
		");
		
		while ($row = mysql_fetch_object($res)) {
			$ereaders[] = $row;
		}
		
		$tpl->set('ereaders', $ereaders);

		
		echo $tpl->fetch();
	}
	
	else {
		$tpl = new Template('../templates/results.html');
		$tpl->set('type', $type);
		
	
		$main = array();
		$names = array();
	
		$res = mysql_query("
			SELECT 
				b.status, IFNULL(v.nickname,v.name) AS name, b.variant, IFNULL(b.version,'') AS version, f.score
			FROM 
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND b.version = s.version)
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				v.importance > 0 AND
				b.listed = 1 AND
				s.release = '" . $version . "' AND
				FIND_IN_SET('" . $type . "',b.type)
			ORDER BY 
				IFNULL(v.nickname,v.name), !ISNULL(b.release), b.release DESC
		");
		
		$count = 0;
		
		while ($row = mysql_fetch_object($res)) {
			$names[$row->name] = $row->name;
			
			if (!isset($main[$row->name])) {
				$main[$row->name] = array(null, null);
			}
			
			if ($row->status == 'development') {
				$main[$row->name][0] = $row;
			}
	
			if ($row->status == 'current') {
				$main[$row->name][1] = $row;
			}
			
			if ($row->status == 'legacy' && count($main[$row->name]) < 8) {
				$main[$row->name][] = $row;
			}
			
			$count = max($count, count($main[$row->name]));
		}
		
		$tpl->set('main', $main);
		$tpl->set('mainRows', $count);
		$tpl->set('mainColumns', $names);
	
	
	
		$results = array();
	
		$res = mysql_query("
			SELECT 
				b.status, b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, b.description, b.listed, f.score, f.points, f.results 
			FROM 
				browserVersions AS b
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				s.release = '" . $version . "' AND
				FIND_IN_SET('" . $type . "',type)
			ORDER BY 
				score DESC
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
				v.importance, IFNULL(v.nickname,v.name) AS name, b.grouped, b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, IF(ISNULL(b.release),DATE(NOW()),b.release) AS `release`, b.status, f.score
			FROM 
				browserVersions AS b
				LEFT JOIN browserVariants AS v ON (b.variant = v.id)
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				(!ISNULL(b.release) OR b.status = 'development') AND
				s.release = '" . $version . "' AND
				FIND_IN_SET('" . $type . "',v.type) AND
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
	}