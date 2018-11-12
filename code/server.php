<?php
$servername = "localhost";
$username = "gjohnson";
$password = "ujieDai8";
$dbname = "gjohnson";

// Create connection
$conn = mysql_connect($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT temp FROM base_obs";
mysql_select_db($dbname);
$result = mysql_query($sql, $conn);

if(! $retval ) {
    die('Could not get data: ' . mysql_error());
}

while($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
    echo $row['temp'];
}

mysql_close($conn);
// echo 'php seems to work!'
?>