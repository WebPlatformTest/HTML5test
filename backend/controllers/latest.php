<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../libraries/tools.php');
	include('../models/raw.php');
	
	
	$tpl = new Template('../templates/latest.html');
	$tpl->set('results', Raw::getAll());

	
	echo $tpl->fetch();