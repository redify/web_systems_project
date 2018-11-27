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
$result = $conn->query($sql);

if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
}

while($row = $result->fetch_assoc()) {
    echo $row["temp"];
}

$conn->close();
?>