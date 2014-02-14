<?php

		
	$cn = mysql_connect ("localhost","root","root");
	if (!$cn) die ('hostfail: ' . mysql_error());
	
	$db = mysql_select_db("datalous");
	if (!$db) die ("dbfail". mysql_error());
	
	
/*	$cn = mysql_connect ("localhost","samlangb_admin","inside");
	if (!$cn) die ('Could not connect to local: ' . mysql_error());
	
	$db = mysql_select_db("samlangb_datalous");
	if (!$db) die ("could not conenct with db". mysql_error());*/
?>