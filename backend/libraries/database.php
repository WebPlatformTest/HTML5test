<?php

	$mysql['server'] = 'localhost';
	$mysql['username'] = '*****';
	$mysql['password'] = '*****';
	$mysql['database'] = '*****';

	mysql_connect($mysql['server'], $mysql['username'], $mysql['password']);
	mysql_select_db($mysql['database']);
