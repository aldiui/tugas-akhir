<?php
$servername = "127.0.0.1";  // Gunakan 127.0.0.1 alih-alih localhost
$username = "u859802859_doc2425";  // Username database Anda
$password = "sZ|KD*:1x*H8";
$dbname = "u859802859_doc2425";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Output error message to the browser
    die("Connection failed: " . $conn->connect_error);
} else {
}
?>