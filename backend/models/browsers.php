<?php

	class Browsers {

		static function getAll($release) {
			$results = array();

			$types = array('desktop', 'tablet', 'mobile', 'television', 'gaming');

			$db = Factory::Database();

			foreach($types AS $type) {
				$result = $db->query("
					SELECT
						v.platform, IFNULL(v.version,'') AS version, v.nickname, v.details, v.visible, IFNULL(p.related,p.platform) AS id, f.score
					FROM
						data_platforms AS p
						LEFT JOIN data_versions AS v ON (p.platform = v.platform)
						LEFT JOIN scores AS s ON (v.platform = s.platform AND (v.version = s.version OR (v.version IS NULL AND s.version IS NULL)))
						LEFT JOIN fingerprints AS f ON (f.fingerprint = s.fingerprint)
					WHERE
						FIND_IN_SET('" . $type . "',v.type) AND
						s.release = '" . $release . "' AND
						f.points != ''
					ORDER BY
						v.platform, ISNULL(v.releasedate), v.releasedate, v.version
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