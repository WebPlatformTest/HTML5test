<?php

	class Factory {
		static function Database() {
			global $configuration;

			$db = new mysqli($configuration['database']['server'], $configuration['database']['username'], $configuration['database']['password'], $configuration['database']['database']);
			$db->set_charset ('utf8');
			return $db;
		}
	}