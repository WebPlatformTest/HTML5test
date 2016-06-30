<?php

	include('../config.php');
	include('../libraries/database.php');
	include('../libraries/template.php');
	include('../libraries/tools.php');
	include('../models/browsers.php');
	include('../models/results.php');

	header ("X-WebKit-CSP: default-src 'unsafe-inline' data: *; frame-src *; options inline-script;");
	header ("Content-Security-Policy: default-src 'unsafe-inline' data: *; frame-src *; options inline-script;");
	header ("X-Content-Security-Policy: default-src 'unsafe-inline' data: *; frame-src *; options inline-script;");

	$tpl = new Template('../templates/browser.html');

	$tpl->set('results', Browsers::getAll($GLOBALS['configuration']['release']));

	if (isset($_REQUEST['show'])) {
		$show = explode('/', $_REQUEST['show']);

		if (isset($show[0])) {
			if ($show[0] == 'mybrowser') {
				$tpl->set('one', '');
			}

			else if (preg_match("/^[a-f0-9]{16,16}$/", $show[0])) {
				if ($row = Results::getByUniqueId($show[0])) {
					$tpl->set('one', json_encode($row));
				}
			}

			else {
				if ($row = Results::getByBrowser($show[0], $GLOBALS['configuration']['release'])) {
					$tpl->set('one', json_encode($row));
				}
			}
		}

		if (isset($show[1])) {
			if ($show[1] == 'mybrowser') {
				$tpl->set('two', '');
			}

			else if (preg_match("/^[a-f0-9]{16,16}$/", $show[1])) {
				if ($row = Results::getByUniqueId($show[1])) {
					$tpl->set('two', json_encode($row));
				}
			}

			else {
				if ($row = Results::getByBrowser($show[1], $GLOBALS['configuration']['release'])) {
					$tpl->set('two', json_encode($row));
				}
			}
		}

		if (isset($show[2])) {
			if ($show[2] == 'mybrowser') {
				$tpl->set('three', '');
			}

			else if (preg_match("/^[a-f0-9]{16,16}$/", $show[2])) {
				if ($row = Results::getByUniqueId($show[2])) {
					$tpl->set('three', json_encode($row));
				}
			}

			else {
				if ($row = Results::getByBrowser($show[2], $GLOBALS['configuration']['release'])) {
					$tpl->set('three', json_encode($row));
				}
			}
		}

		if (isset($show[3])) {
			if ($show[3] == 'mybrowser') {
				$tpl->set('four', '');
			}

			else if (preg_match("/^[a-f0-9]{16,16}$/", $show[3])) {
				if ($row = Results::getByUniqueId($show[3])) {
					$tpl->set('four', json_encode($row));
				}
			}

			else {
				if ($row = Results::getByBrowser($show[3], $GLOBALS['configuration']['release'])) {
					$tpl->set('four', json_encode($row));
				}
			}
		}

		if (isset($show[4])) {
			if ($show[4] == 'mybrowser') {
				$tpl->set('five', '');
			}

			else if (preg_match("/^[a-f0-9]{16,16}$/", $show[4])) {
				if ($row = Results::getByUniqueId($show[4])) {
					$tpl->set('five', json_encode($row));
				}
			}

			else {
				if ($row = Results::getByBrowser($show[4], $GLOBALS['configuration']['release'])) {
					$tpl->set('five', json_encode($row));
				}
			}
		}
	}


	echo $tpl->fetch();





