<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Pastikan path file benar
$connectionFile = '../database/connection.php';
if (!file_exists($connectionFile)) {
    die("File connection.php tidak ditemukan di: $connectionFile");
}
require_once $connectionFile;

// Fungsi Debugging
function debugLog($message) {
    if (isset($_GET['debug']) && $_GET['debug'] == 'true') {
        echo '<pre>' . htmlspecialchars($message) . '</pre>';
    }
}
function boot()
    {
        config(['app.locale' => 'id']);
        Carbon::setLocale('id');
        date_default_timezone_set('Asia/Jakarta');
    }


// Cek apakah ID dikirim melalui URL
if (!isset($_GET['id'])) {
    debugLog('ID tidak ditemukan.');
    die('ID tidak ditemukan.');
}

$id = intval($_GET['id']);
debugLog("ID yang diterima: $id");

// Ambil data dari database berdasarkan ID
$sql = "SELECT jabatan, tanggal_sertifikat FROM cpmi_data WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    debugLog("Error preparing statement: " . $conn->error);
    die('Kesalahan saat memproses data.');
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    debugLog('Data tidak ditemukan untuk ID: ' . $id);
    die('Data tidak ditemukan.');
}

$data = $result->fetch_assoc();
debugLog("Data yang diambil dari database: " . print_r($data, true));

setlocale(LC_TIME, 'id_ID.UTF-8');
// Format tanggal sertifikat
$tanggalSertifikat = date('d F Y', strtotime($data['tanggal_sertifikat']));
debugLog("Tanggal Sertifikat: $tanggalSertifikat");



// Mapping jabatan ke template PDF yang sesuai
$jabatan = strtolower($data['jabatan']); // Konversi jabatan ke huruf kecil untuk konsistensi
debugLog("Jabatan: $jabatan");

$templateMapping = [
    'worker' => 'worker.php',
    'pertanian' => 'pertanian.php',
    'peternakan' => 'peternakan.php',
    'construction worker' => 'construction_worker.php',
    'nursing home' => 'nursing_home.php',
    'caregiver' => 'nursing_home.php',
    'akuakultur' => 'akuakultur.php',
];

if (!array_key_exists($jabatan, $templateMapping)) {
    debugLog("Jabatan tidak ditemukan dalam mapping: $jabatan");
    die('Template untuk jabatan ini tidak ditemukan.');
}

// Redirect ke template yang sesuai
$templateFile = $templateMapping[$jabatan];
debugLog("Redirecting to: $templateFile?id=$id&tanggal_sertifikat=$tanggalSertifikat");

if (!isset($_GET['debug']) || $_GET['debug'] != 'true') {
    header("Location: $templateFile?id=$id&tanggal_sertifikat=$tanggalSertifikat");
    exit;
} else {
    echo "<p>Debug mode aktif. Tidak melakukan redirect.</p>";
}
