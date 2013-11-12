<?php

$ip = $_SERVER['REMOTE_ADDR'];
$ip = "IP Address= $ip";

 $to = "benstof@gmail.com";
 $subject = "Demo Download";
 $body = "Demo is afgelaai. ".$ip;
 if (mail($to, $subject, $body)) {
   echo("<p>Message successfully sent!</p>");
  } else {
   echo("<p>Message delivery failed...</p>");
  }
 ?>