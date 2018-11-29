<?php
$servername = "localhost";
$username = "gjohnson";
$password = "ujieDai8";
$dbname = "gjohnson";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT timestamp,temp,rh,pressure FROM base_obs ORDER BY timestamp desc limit 1";
$result = $conn->query($sql);

if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
}

$row = $result->fetch_assoc();

$dataObj = new stdClass();
$dataObj->temp = $row["temp"];
$dataObj->rh = $row["rh"];
$dataObj->pressure = $row["pressure"];
$dataObj->timestamp = $row["timestamp"];

echo json_encode($dataObj);

$conn->close();
?>