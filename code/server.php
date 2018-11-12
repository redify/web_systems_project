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

$sql = "SELECT temp FROM base_obs";
$result = mysql_query($sql, $conn)

if(! $retval ) {
    die('Could not get data: ' . mysql_error());
}

$row = mysql_fetch_array($retval, MYSQL_ASSOC)
echo $row['temp'];

// echo 'php seems to work!'
?>