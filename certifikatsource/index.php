<?php
// Pastikan header ini untuk menghindari cache di browser
header("Cache-Control: no-cache, must-revalidate");
header("Content-Type: text/html; charset=UTF-8");

// Tampilkan data dari dashboard.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BMP - Dashboard</title>
</head>
<body>
    <div>
        <?php
        // Sertakan file dashboard.php
        include 'dashboard.php';
        ?>
    </div>
</body>
</html>
