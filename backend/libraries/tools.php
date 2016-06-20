<?php


	function time_ago ($tm, $rcs = 0) {
	  $cur_tm = time();
	  $dif = $cur_tm - $tm;
	  $pds = array('second','minute','hour','day','week','month','year','decade');
	  $lngh = array(1,60,3600,86400,604800,2630880,31570560,315705600);

	  for ($v = count($lngh) - 1; ($v >= 0) && (($no = $dif / $lngh[$v]) <= 1); $v--);
	    if ($v < 0)
	      $v = 0;
	  $_tm = $cur_tm - ($dif % $lngh[$v]);

	  $no = ($rcs ? floor($no) : round($no)); // if last denomination, round

	  if ($no != 1)
	    $pds[$v] .= 's';
	  $x = $no . ' ' . $pds[$v];

	  if (($rcs > 0) && ($v >= 1))
	    $x .= ' ' . $this->time_ago($_tm, $rcs - 1);

	  return $x;
	}


	function get_ip_address() {
		$ip = $_SERVER['REMOTE_ADDR'];

		$headers = apache_request_headers();
		if (isset($headers['X-Forwarded-For'])) $ip = $headers['X-Forwarded-For'];
		if (isset($headers['Proxy-Client-IP'])) $ip = $headers['Proxy-Client-IP'];
		if (isset($headers['X-Client-IP'])) $ip = $headers['X-Client-IP'];
		if (isset($headers['Client-IP'])) $ip = $headers['Client-IP'];

		return $ip;
	}

	function opt_explode($echar, $str) {
		$newstrarr = [];

		if (strlen($echar) != 1 || strlen($str) == 0) {
			return 0;
		}

		$str = trim($str);

		$idx=0;
		$arr=0;

		while($idx < strlen($str)) {
			if($str[$idx] == '"') {
				// quoted field
				$idx++;
				while ($idx < strlen($str)) {
					// look for ending quote
					if($str[$idx] == '"') {
						$idx++;
						$arr++;
						break;
					}
					$newstrarr[$arr] = $newstrarr[$arr] . $str[$idx];
					$idx++;
				}
			} elseif ($str[$idx] == $echar) {
				// normal delimiter, advance element
				$arr++;
			} else {
				// must be normal char, tack onto current element
				if (isset($newstrarr[$arr])) {
					$newstrarr[$arr] = $newstrarr[$arr] . $str[$idx];
				} else {
					$newstrarr[$arr] = $str[$idx];
				}
			}
			$idx++;
		}

		return $newstrarr;
	}