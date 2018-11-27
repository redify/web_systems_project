<?php
$servername = "localhost";
$username = "gjohnson";
$password = "ujieDai8";
$dbname = "gjohnson";

$temp = $_POST["temp"];
$pressure = $_POST["pressure"];
$rh = $_POST["rh"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO base_obs VALUES (now(), $temp, $rh, $pressure)";

if ($conn->query($sql) == TRUE)
{
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . " " . $conn->error;
}

$conn->close();
?>