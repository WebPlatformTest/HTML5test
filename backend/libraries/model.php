<?php

	
	function getAllBrowsers($version) {
		$results = array();
		
		$types = array('desktop', 'tablet', 'mobile', 'television', 'gaming'); 
	
		foreach($types AS $type) {
			$res = mysql_query("
				SELECT 
					b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, b.listed
				FROM 
					browserVersions AS b
					LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE 
					FIND_IN_SET('" . $type . "',b.type) AND
					s.release = '" . $version . "' AND
					f.points != ''
				ORDER BY 
					b.variant, ISNULL(b.release), b.release, b.version
			");
			
			echo mysql_error();
			
			while ($row = mysql_fetch_object($res)) {
				$row->uid = $type . '-' . $row->variant . '-' . $row->version;
				$row->type = $type;
				$row->listed = $row->listed == '1';
				
				$results[] = $row;
			}
		}
		
		return $results;
	}

	function getResultsForFeature($id, $version) {
		$results = array();
		
		$res = mysql_query("
			SELECT 
				IF(f.results LIKE '%" . mysql_real_escape_string($id) . "=1%',1,IF(f.results LIKE '%" . mysql_real_escape_string($id) . "=-1%',-1,0)) AS supported, b.variant, IFNULL(b.version,'') AS version
			FROM 
				browserVersions AS b			
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				s.release = '" . $version . "'
		");
		
		while ($row = mysql_fetch_object($res)) {
			$results[] = $row->variant . '-' . $row->version . '=' . $row->supported;
		}

		return $results;		
	}
	
	function getResultsForBrowser($browser, $version) {
		$browser = explode('-', $browser);

		if (count($browser) > 1) {
			list($browserVariant, $browserVersion) = $browser;
			
			$res = mysql_query("
				SELECT 
					b.variant, IFNULL(b.version,'') AS version, b.nickname, f.score, f.points, f.results 
				FROM 
					browserVersions AS b
					LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE 
					b.listed = 1 AND
					s.release = '" . $version . "' AND
					b.variant = '" . mysql_real_escape_string($browserVariant) . "' AND
					b.version = '" . mysql_real_escape_string($browserVersion) . "' 
			");
			
			if ($row = mysql_fetch_object($res)) {
				return $row;
			}		
		}
		else {
			$browserVariant = $browser[0];
		}

		$res = mysql_query("
			SELECT 
				b.variant, IFNULL(b.version,'') AS version, b.nickname, f.score, f.points, f.results 
			FROM 
				browserVersions AS b
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				b.listed = 1 AND
				s.release = '" . $version . "' AND
				b.variant = '" . mysql_real_escape_string($browserVariant) . "'
			ORDER BY
				b.release DESC, b.id DESC
		");
		
		if ($row = mysql_fetch_object($res)) {
			return $row;
		}		
		
		$res = mysql_query("
			SELECT 
				b.variant, IFNULL(b.version,'') AS version, b.nickname, f.score, f.points, f.results 
			FROM 
				browserVersions AS b
				LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
				LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
			WHERE 
				b.listed = 1 AND
				s.release = '" . $version . "' AND
				b.unique = '" . mysql_real_escape_string($browserVariant) . "'
			ORDER BY
				b.release DESC, b.id DESC
		");
		
		if ($row = mysql_fetch_object($res)) {
			return $row;
		}	
	}
	


	function getResultsForUniqueId($id) {
		$res = mysql_query("
			SELECT 
				r.uniqueid AS id, 'Unique id' AS nickname, f.score, f.points, f.results, humanReadable, useragentHeader AS useragent, deviceWidth, deviceHeight 
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