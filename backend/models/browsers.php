<?php

	class Browsers {

		static function getAll($release) {
			$results = array();

			$types = array('desktop', 'tablet', 'mobile', 'television', 'gaming');

			$db = Factory::Database();

			foreach($types AS $type) {
				$result = $db->query("
					SELECT
						b.platform, IFNULL(b.version,'') AS version, b.nickname, b.details, b.visible, IFNULL(v.related,v.platform) AS id, f.score
					FROM
						data_platforms AS v
						LEFT JOIN data_versions AS b ON (v.platform = b.platform)
						LEFT JOIN scores AS s ON (b.platform = s.platform AND (b.version = s.version OR (b.version IS NULL AND s.version IS NULL)))
						LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
					WHERE
						FIND_IN_SET('" . $type . "',b.type) AND
						s.release = '" . $release . "' AND
						f.points != ''
					ORDER BY
						b.platform, ISNULL(b.releasedate), b.releasedate, b.version
				");

				while ($row = $result->fetch_object()) {
					$row->uid = $type . '-' . $row->platform . '-' . $row->version;
					$row->type = $type;
					$row->visible = $row->visible == '1';

					$results[] = $row;
				}
			}

			return $results;
		}


	}