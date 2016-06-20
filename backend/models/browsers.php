<?php

	class Browsers {

		static function getAll($version) {
			$results = array();

			$types = array('desktop', 'tablet', 'mobile', 'television', 'gaming');

			$db = Factory::Database();

			foreach($types AS $type) {
				$result = $db->query("
					SELECT
						b.variant, IFNULL(b.version,'') AS version, b.nickname, b.details, b.listed, IFNULL(v.replaced,v.id) AS id, f.score
					FROM
						browserVariants AS v
						LEFT JOIN browserVersions AS b ON (v.id = b.variant)
						LEFT JOIN scores AS s ON (b.variant = s.variant AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
						LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
					WHERE
						FIND_IN_SET('" . $type . "',b.type) AND
						s.release = '" . $version . "' AND
						f.points != ''
					ORDER BY
						b.variant, ISNULL(b.release), b.release, b.version
				");

				while ($row = $result->fetch_object()) {
					$row->uid = $type . '-' . $row->variant . '-' . $row->version;
					$row->type = $type;
					$row->listed = $row->listed == '1';

					$results[] = $row;
				}
			}

			return $results;
		}


	}