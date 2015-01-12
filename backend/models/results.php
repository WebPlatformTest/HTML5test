<?php
	
	class Results {
		
		
			
		function getByFeature($id, $version) {
			$results = array();
			
			$res = mysql_query("
				SELECT 
					IFNULL(SUBSTRING_INDEX(SUBSTRING_INDEX(f.results,'" . mysql_real_escape_string($id) . "=',-1),',',1),0) as supported, 
					b.variant, IFNULL(b.version,'') AS version
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
		
		function getByBrowser($browser, $version) {
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
						s.release = '" . $version . "' AND
						b.variant = '" . mysql_real_escape_string($browserVariant) . "' AND
						b.version = '" . mysql_real_escape_string($browserVersion) . "' 
				");
				
				if ($row = mysql_fetch_object($res)) {
					return $row;
				}		
				
				return;
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
					s.release = '" . $version . "' AND
					b.variant = '" . mysql_real_escape_string($browserVariant) . "'
				ORDER BY
					b.release DESC, b.id DESC
			");
			
			if ($row = mysql_fetch_object($res)) {
				return $row;
			}			
		}
		
	
	
		function getByUniqueId($id) {
			$res = mysql_query("
				SELECT 
					r.version, r.uniqueid AS id, 'Unique id' AS nickname, f.score, f.maximum, f.points, f.results, humanReadable, useragentHeader AS useragent, deviceWidth, deviceHeight, f.fingerprint 
				FROM 
					results AS r
					LEFT JOIN fingerprints AS f ON (r.fingerprint = f.fingerprint)
				WHERE 
					r.uniqueid ='" . mysql_real_escape_string($id) . "'
			");
			
			if ($row = mysql_fetch_object($res)) {

				// Update use counter
				mysql_query('
					UPDATE
						results
					SET 
						used = used + 1,
						lastUsed = NOW()
					WHERE
						uniqueid = "' . mysql_real_escape_string($id) . '"
				');
				
				return $row;
			}		
		}
		
		
		function getByFingerprint($id) {
			$res = mysql_query("
				SELECT 
					score, maximum, points, results 
				FROM 
					fingerprints
				WHERE 
					fingerprint ='" . mysql_real_escape_string($id) . "'
			");
			
			if ($row = mysql_fetch_object($res)) {
				return $row;
			}		
		}		
		
		
		function export($release) {
			$browsers = array();
	
			$res = mysql_query("
				SELECT
					*
				FROM
					browserVariants
				ORDER BY
					name
			");
			
			echo mysql_error();
			
			while ($row = mysql_fetch_object($res)) {
				$browser = (object) array(
					'name'		=> $row->name,
					'kind'		=> $row->kind,
					'versions'	=> array()
				);
				
				$vres = mysql_query("
					SELECT
						*
					FROM
						browserVersions
					WHERE
						variant = '" . addslashes($row->id) . "'
					ORDER BY
						version
				");
				
				echo mysql_error();
	
				while ($vrow = mysql_fetch_object($vres)) {
					$version = (object) array(
						'id'		=> is_null($vrow->version) ? $vrow->variant : $vrow->variant . '-' . $vrow->version,
						'version'	=> $vrow->version,
						'nickname'	=> $vrow->nickname,
						'release'	=> $vrow->release
					);
					
					$browser->versions[] = $version;
				}
				
				$browsers[] = $browser;
			}
	
	
			$results = array();
	
			$res = mysql_query("
				SELECT 
					b.variant, IFNULL(b.version,'') AS version, f.results 
				FROM 
					browserVersions AS b
					LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
					LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
				WHERE 
					s.release = '" . $release . "'
				ORDER BY
					b.variant, b.version
			");
			
			while ($row = mysql_fetch_object($res)) {
				$r = explode(',', $row->results);
				
				for ($i = 0; $i < count($r); $i++) {
					list($key, $value) = explode('=', $r[$i]);
					
					if (!isset($results[$key]))	{
						$results[$key] = array();
					}
					
					$variant = $row->version == '' ? $row->variant : $row->variant . '-' . $row->version;
					$value = intval($value);
	
					if ($value & 1) {
						switch(true) {
							case !! ($value & 2):	$results[$key][$variant] = 'yes:old';
							case !! ($value & 4):	$results[$key][$variant] = 'yes:buggy';
							case !! ($value & 8):	$results[$key][$variant] = 'yes:prefix';
							default:				$results[$key][$variant] = 'yes';
						}
					}
					else {
						switch(true) {
							case !! ($value & 16):	$results[$key][$variant] = 'no:blocked';
							default:				$results[$key][$variant] = 'no';
						}
					}
				}
			}
	
			
			return array(
				'browsers'	=> $browsers,
				'results'	=> $results
			);
		}		
	}