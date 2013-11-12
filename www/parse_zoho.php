<?php 


if ($_FILES["file"]["error"] > 0)
  {
  echo "Error: " . $_FILES["file"]["error"] . "<br />";
  }
else
  {
  echo "Upload: " . $_FILES["file"]["name"] . "<br />";
  echo "Type: " . $_FILES["file"]["type"] . "<br />";
  echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";

  }

      move_uploaded_file($_FILES["file"]["tmp_name"],
      "zoho.csv");
      echo "Stored in: zoho.csv";


	  
// we connect to example.com and port 3307
$link = mysql_connect('db2802.perfora.net', 'dbo357177227', 'beester88');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

// make foo the current db
$db_selected = mysql_select_db('db357177227', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}

//Clear table
$query = "TRUNCATE TABLE zoho_temp;";
// Perform Query
$result = mysql_query($query);

//Clear table
$query = "TRUNCATE TABLE zoho_setup;";
// Perform Query
$result = mysql_query($query);

$source_file = 'zoho.csv';
$target_table = 'zoho_temp';

csv_file_to_mysql_table($source_file, $target_table);


$query = "SELECT * FROM zoho_temp";

// Perform Query
$result = mysql_query($query);

// Check result
// This shows the actual query sent to MySQL, and the error. Useful for debugging.
if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}

// Use result
// Attempting to print $result won't allow access to information in the resource
// One of the mysql result functions must be used
// See also mysql_result(), mysql_fetch_array(), mysql_fetch_row(), etc.

$email = '';
$user_str = '';

	echo '<br/>';
	echo '<br/>';
	
	
	
$user = array();
$fp = fopen('temp.csv', "w");
$line = 'Account,Contact,Email,Dongle1,Dongle2,Dongle3,Dongle4,Dongle5,Dongle6,Dongle7,Dongle8,Dongle9,Dongle10'."\n";
fputs($fp, $line);

while ($row = mysql_fetch_assoc($result)) {

$x++;


if ($row['email'] == $email){

	$user['products'][$x]['name'] = $row['product_name'];
    $user['products'][$x]['price'] = $row['unit_price']; 

} else {


	if(!empty($user)) {
	
	$diff = 10 - $x;
    //echo $x.'<br/><br/>';	
    //echo $diff.'<br/><br/>';	
	
	for ($j = $x; $j < 10; $j++){
	
	$user['products'][$j]['name'] = '';
    $user['products'][$j]['price'] = ''; 
    $user['products'][$j]['expiry'] = ''; 
	
	}
		//echo 'NOT EMPTY</br>';
		$line .= $user['account'].",".$user['contact'].",".$user['email'].",";
	
	
   //echo $user['contact'].'<br/>';  
   //print_r($user);
   
   
   $table = '';   
   foreach($user['products'] as $product){

    if($product['name'] <> ''){
	
	   $price = str_replace(',', '.', $product['price']);
	   

	   $table .= '<div>Dongle: '.$product['name'].'</div>';
	   $table .= '<div>Expiration Date: '.$product['expiry'].'</div>';	
	   $table .= '<div>Update Price: '.$price.'</div>';

	} 
	   $table .= ',';
	
	
   }
   
	$line .= $table;   
	$line .= "\n";	
	fputs($fp, $line);
	
	//	saveUser($user);
	
	}
	
	$user = array();

	
    $x = 0;
	
    $user['account'] =  $row['account_name'];
    $user['contact'] =  $user_str.$row['contact_name'];
    $user['email'] =  $user_str.$row['email'];

	$user['products'][$x]['name'] = $row['product_name'];
    $user['products'][$x]['price'] = $row['unit_price']; 
    $user['products'][$x]['expiry'] = $row['support_expiry']; 
    
	
	}
	
$email = $row['email'];

}

fclose($fp);

echo $line;

/*

$table = 'zoho_setup';

$fp = fopen('temp.csv', "w");

$res = mysql_query("SELECT * FROM $table");

// fetch a row and write the column names out to the file
$row = mysql_fetch_assoc($res);
$line = "";
$comma = "";
foreach($row as $name => $value) {
    $line .= $comma . '"' . str_replace('"', '""', $name) . '"';
    $comma = ",";
}
$line .= "\n";
fputs($fp, $line);

// remove the result pointer back to the start
mysql_data_seek($res, 0);

// and loop through the actual data
while($row = mysql_fetch_assoc($res)) {
   
    $line = "";
    $comma = "";
    foreach($row as $value) {
        $line .= $comma . '"' . str_replace('"', '""', $value) . '"';
        $comma = ",";
    }
    $line .= "\n";
    fputs($fp, $line);
   
}

fclose($fp);




echo 'Connected successfully';
mysql_close($link);

	  
function saveUser($user){

$table = "<table>";
	$table = $table.'<tr>';
	
	$table = $table.'<td>Dongle</td>';
	$table = $table.'<td>Expiration Date</td>';
	$table = $table.'<td>Price to Update</td>';	
	
	$table = $table.'</tr>';
	
   foreach($user['products'] as $product){

   print_r($product);


	
	$table = $table.'<tr>';
	
	$table = $table.'<td>'.$product['name'].'</td>';
	$table = $table.'<td>'.$product['expiry'].'</td>';	
	$table = $table.'<td>'.$product['price'].'</td>';

	$table = $table.'</tr>';
	
   }
$product_status = $table."</table>";



  $insert_query_prefix = "INSERT INTO zoho_setup (account_name, contact_name, email, product_status)\nVALUES"; 
  $query = "$insert_query_prefix ('".$user['account']."', '".$user['contact']."', '".$user['email']."', '".$product_status."');"; 
  //echo $query.'<br/>';
  
  mysql_query($query);   

$product_status = '';  
  
}  
*/


function csv_file_to_mysql_table($source_file, $target_table, $max_line_length=10000) { 
    if (($handle = fopen("$source_file", "r")) !== FALSE) { 
        $columns = fgetcsv($handle, $max_line_length, ","); 
        foreach ($columns as &$column) { 
            $column = str_replace(".","",$column); 
        } 
        $insert_query_prefix = "INSERT INTO $target_table (account_name, contact_name, email, product_name, support_expiry, unit_price)\nVALUES"; 
       
	   //echo $insert_query_prefix.'<br/>';
	   
	   while (($data = fgetcsv($handle, $max_line_length, ",")) !== FALSE) { 
            while (count($data)<count($columns)) 
                array_push($data, NULL); 
            $query = "$insert_query_prefix (".join(",",quote_all_array($data)).");"; 
            mysql_query($query); 
			//echo $query.'<br/>';
        } 
        fclose($handle); 
    } 
} 

function quote_all_array($values) { 
    foreach ($values as $key=>$value) 
        if (is_array($value)) 
            $values[$key] = quote_all_array($value); 
        else 
            $values[$key] = quote_all($value); 
    return $values; 
} 

function quote_all($value) { 
    if (is_null($value)) 
        return "NULL"; 

    $value = "'" . mysql_real_escape_string($value) . "'"; 
    return $value; 
} 
?>


<a href="http://www.irrimaker.com/mailsystem/temp.csv">New CSV</a>