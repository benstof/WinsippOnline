

<?php
$username = "benstof@gmail.com";
$password = "beester88";

$param = "SCOPE=ZohoCRM/crmapi&EMAIL_ID=".$username."&PASSWORD=".$password;
$ch = curl_init("https://accounts.zoho.com/apiauthtoken/nb/create");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $param);

$result = curl_exec($ch);

//echo $result;     
	
/*This part of the code below will separate the Authtoken from the result. Remove this part if you just need only the result*/
$anArray = explode("\n",$result);

//print_r($anArray);
$authToken = explode("=",$anArray['2']);
$cmp = strcmp($authToken['0'],"AUTHTOKEN");
//echo $anArray['2']."";



if ($cmp == 0)
{
echo "Created Authtoken is : ".$authToken['1'];
//return $authToken['1'];
}
curl_close($ch);






/* NOTE: Define your mysql database parameters in moduleDependant class */

/* Constant Declarations */
define("TARGETURL", "https://crm.zoho.com/crm/private/xml/Contacts/getMyRecords");

/* user related parameter */
define("AUTHTOKEN", $authToken['1']);
define("SCOPE", "crmapi");

/* create a object */
$utilObj = new Utilities();


/* set parameters */
$parameter = "";
$parameter = $utilObj->setParameter("scope", SCOPE, $parameter);
$parameter = $utilObj->setParameter("authtoken", AUTHTOKEN, $parameter);
$parameter = $utilObj->setParameter("fromIndex", 1, $parameter);
$parameter = $utilObj->setParameter("toIndex", 100, $parameter);
$parameter = $utilObj->setParameter("sortColumnString", "Last Name", $parameter);

//$parameter = $utilObj->setParameter("selectColumns", "Contacts(Last Name)", $parameter);

/* Call API */
$response = $utilObj->sendCurlRequest(TARGETURL, $parameter);

$utilObj->parseXMLandInsertInDB($response);



class Utilities {

   
    public function setParameter($key, $value, $parameter) {
        if ($parameter === "" || strlen($parameter) == 0) {
            $parameter = $key . '=' . $value;
        } else {
            $parameter .= '&' . $key . '=' . $value;
        }
        return $parameter;
    }

    public function parseXMLandInsertInDB($xmldata) {
        $xmlString = <<<XML
$xmldata
XML;
        $xml = simplexml_load_string($xmlString);
        if (isset($xml->result)) {
          //  $modeuleDependantObj = new moduleDependant();
          //  $output = $modeuleDependantObj->insertInDB($xml);
		 // print_r($xml);
		  
 $numberOfRecords = count($xml->result->Contacts->row);
 echo $numberOfRecords.'<br/>';
        /* $records[row value][field value] */
        $records[][] = array();
        for ($i = 0; $i < $numberOfRecords; $i++) {
            $numberOfValues = count($xml->result->Contacts->row[$i]->FL);
            for ($j = 0; $j < $numberOfValues; $j++) {
                switch ((string) $xml->result->Contacts->row[$i]->FL[$j]['val']) {
                    /* Get attributes as element indices */
                    case 'LEADID':
                        $records[$i]['LEADID'] = (string) $xml->result->Contacts->row[$i]->FL[$j];
                        break;
                    case 'First Name':
                        $records[$i]['First Name'] = (string) $xml->result->Contacts->row[$i]->FL[$j];
                        break;
                    case 'Last Name':
                        $records[$i]['Last Name'] = (string) $xml->result->Contacts->row[$i]->FL[$j];
						echo $records[$i]['Last Name'].'<br/>';
                        break;
                    case 'Company':
                        $records[$i]['Company'] = (string) $xml->result->Contacts->row[$i]->FL[$j];
                        break;
                }
            }
			
		}
			print_r($records);
			
			
		  
		  
		  
        } else if (isset($xml->error)) {
            echo "Error code: " . $xml->error->code . "<br/>";
            echo "Error message: " . $xml->error->message;
        }
    }

    public function sendCurlRequest($url, $parameter) {
        try {
            /* initialize curl handle */
            $ch = curl_init();
            /* set url to send post request */
            curl_setopt($ch, CURLOPT_URL, $url);
            /* allow redirects */
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            /* return a response into a variable */
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            /* times out after 30s */
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            /* set POST method */
            curl_setopt($ch, CURLOPT_POST, 1);
            /* add POST fields parameters */
            curl_setopt($ch, CURLOPT_POSTFIELDS, $parameter);
            /* execute the cURL */
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        } catch (Exception $exception) {
            echo 'Exception Message: ' . $exception->getMessage() . '<br/>';
            echo 'Exception Trace: ' . $exception->getTraceAsString();
        }
    }

 
}






?>

