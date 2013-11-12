<?php

//$record = geoip_record_by_name('41.143.60.170');

// we connect to example.com and port 3307
$link = mysql_connect('db1042.perfora.net', 'dbo212112028', 'beester88');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

// make foo the current db
$db_selected = mysql_select_db('db212112028', $link);

if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
	} else {

	$ip = $_SERVER['REMOTE_ADDR'];

    $query = "SELECT * FROM calc_usage"; 
       

	$result = mysql_query($query);
	echo '<table>';
	echo '<tr><td>IP</td><td>Flow</td><td>Man_Pos</td><td>Tags</td><td>Type</td><td>Units</td><td>Valve Pos</td>
	<td>Lat Id</td><td>Man Id</td><td>Lat HW</td><td>Man HW</td><td>Heads_Num</td><td>Rows_Num</td><td>Heads_Space</td><td>Row_Space</td>
	<td>Valve_Pres</td><td>thedate</td><td>thetime</td></tr>';	
	while ($row = mysql_fetch_assoc($result)) {
	
	//print_r($row);
	
	echo '<tr>';
	echo '<td>'.$row['userIP'].'</td>';
	echo '<td>'.$row['Flow'].'</td>';
	echo '<td>'.$row['Man_Pos'].'</td>';
	echo '<td>'.$row['Tags'].'</td>';
	echo '<td>'.$row['Type'].'</td>';
	echo '<td>'.$row['Units'].'</td>';
	echo '<td>'.$row['Valve_Pos'].'</td>';
	echo '<td>'.$row['Lat_ID'].'</td>';
	echo '<td>'.$row['Man_ID'].'</td>';
	echo '<td>'.$row['Lat_HW'].'</td>';
	echo '<td>'.$row['Man_HW'].'</td>';
	echo '<td>'.$row['Heads_Num'].'</td>';
	echo '<td>'.$row['Rows_Num'].'</td>';
	echo '<td>'.$row['Heads_Space'].'</td>';
	echo '<td>'.$row['Row_Space'].'</td>';
	echo '<td>'.$row['Valve_Pres'].'</td>';
	echo '<td>'.$row['thedate'].'</td>';
	echo '<td>'.$row['thetime'].'</td>';
	
	echo '</tr>';
	}
	echo '</table>';
	
}
 ?>