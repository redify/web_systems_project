<?php

$temp = $_GET["temp"];
$pressure = $_GET["pressure"];
$rh = $_GET["rh"];
# Our new data
$data = array(
  'temp' => $temp,
  'pressure' => $pressure,
  'rh' => $rh
);

echo "$temp, $pressure, $rh";

# Create a connection
$url = 'weblab.cs.uml.edu/~gjohnson/php/insertobsdata.php';
$ch = curl_init($url);
# Form data string
$postString = http_build_query($data, '', '&');
# Setting our options
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
# Get the response
$response = curl_exec($ch);
curl_close($ch);

?>