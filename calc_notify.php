<?php

$ip = $_SERVER['REMOTE_ADDR'];
$ip = "IP Address= $ip";

 $to = "benstof@gmailpp.comp";  //Offline
 $subject = "Calc gebruik";
 $body = "Calc gebruik. ".$ip;
 if (mail($to, $subject, $body)) {
   echo("<p>Message successfully sent!</p>");
  } else {
   echo("<p>Message delivery failed...</p>");
  }
  
 $post = $_POST;
 
 print_r($post);
  
$flow = $_POST['flow'];
$man_pos = $_POST['group_man'];
$tags = $_POST['group_tags'];
$type = $_POST['group_type'];
$units = $_POST['group_units'];
$valve_pos = $_POST['group_val'];
$lat_id = $_POST['lateral_pipes'];
$man_id = $_POST['manifold_pipes'];
$lat_hw = $_POST['lateral_hazen'];
$man_hw = $_POST['manifold_hazen'];
$heads_num = $_POST['number_heads'];
$rows_num = $_POST['number_rows'];
$heads_space = $_POST['spacing_heads'];
$row_space = $_POST['spacing_rows'];
$valve_pres  = $_POST['valve_pressure'];
       

// we connect to example.com and port 3307
$link = mysql_connect('db1042.perfora.net', 'dbo212112028', 'beester88');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

// make foo the current db
$db_selected = mysql_select_db('db212112028', $link);
 echo 'kl';
 
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
	} else {

	$ip = $_SERVER['REMOTE_ADDR'];

    $insert_query_prefix = "INSERT INTO calc_usage $target_table (userIP, Flow, Man_Pos, Tags, Type, Units, Valve_Pos, Lat_ID, Man_ID, Lat_HW, 
	Man_HW, Heads_Num, Rows_Num, Heads_Space, Row_Space, Valve_Pres, thedate,thetime) 
	VALUES ('$ip', '$flow','$man_pos','$tags','$type','$units','$valve_pos','$lat_id',
	'$man_id','$lat_hw','$man_hw','$heads_num','$rows_num','$heads_space','$row_space','$valve_pres', CURDATE(), CURTIME() )"; 
       
	echo $insert_query_prefix;
	
	mysql_query($insert_query_prefix); 
	
	}
 ?>