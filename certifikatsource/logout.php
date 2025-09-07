<?php
session_start();

// Hapus data sesi pengguna
session_unset();
session_destroy();

// Hapus cache browser
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Tambahkan parameter unik ke URL redirect
$unique_param = time(); // Gunakan timestamp sebagai parameter unik
header("Location: login.php?nocache=" . $unique_param);
exit();
