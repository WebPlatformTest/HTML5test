<?php

	class Browsers {
		
		function getAll($version) {
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
	
		
	}