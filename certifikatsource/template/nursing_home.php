<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../vendor/autoload.php';
require_once '../database/connection.php';

// Set lokal ke bahasa Indonesia
setlocale(LC_TIME, 'id_ID.utf8');

// Cek apakah ID dan tanggal sertifikat dikirim melalui URL
if (!isset($_GET['id']) || !isset($_GET['tanggal_sertifikat'])) {
    die('ID atau tanggal sertifikat tidak ditemukan.');
}

$id = intval($_GET['id']);
$tanggalSertifikat = htmlspecialchars($_GET['tanggal_sertifikat']);

// Ubah tanggal ke format Indonesia (misal: 12 JANUARI 2025)
$bulanIndo = [
    1 => 'JANUARI',
    2 => 'FEBRUARI',
    3 => 'MARET',
    4 => 'APRIL',
    5 => 'MEI',
    6 => 'JUNI',
    7 => 'JULI',
    8 => 'AGUSTUS',
    9 => 'SEPTEMBER',
    10 => 'OKTOBER',
    11 => 'NOVEMBER',
    12 => 'DESEMBER'
];

$tanggal = date('d', strtotime($tanggalSertifikat));
$bulan = (int)date('m', strtotime($tanggalSertifikat));
$tahun = date('Y', strtotime($tanggalSertifikat));
$tanggalSertifikatFormatted = $tanggal . ' ' . $bulanIndo[$bulan] . ' ' . $tahun;

// Ambil data dari database berdasarkan ID
$sql = "SELECT * FROM cpmi_data WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    die('Data tidak ditemukan.');
}

$data = $result->fetch_assoc();

// Nama CPMI dan jabatan dari database
$namaCPM = htmlspecialchars($data['nama_cpm']);
$jabatan = htmlspecialchars($data['jabatan']);

// Logika untuk menentukan awalan nomor seri berdasarkan jabatan
$prefixes = [
    'Pertanian' => 183000,
    'Peternakan' => 194000,
    'Panti Jompo' => 205000,
    'Nursing Home' => 205000,
    'Konstruksi' => 216000,
    'Construction Worker' => 216000,
    'Worker' => 116000
];

$prefix = isset($prefixes[$jabatan]) ? $prefixes[$jabatan] : 999000; // Default awalan jika jabatan tidak dikenal

// Hitung jumlah data dengan jabatan yang sama untuk membuat urutan ID
$sqlCount = "SELECT COUNT(*) AS total FROM cpmi_data WHERE jabatan = ?";
$stmtCount = $conn->prepare($sqlCount);
$stmtCount->bind_param("s", $jabatan);
$stmtCount->execute();
$resultCount = $stmtCount->get_result();
$countData = $resultCount->fetch_assoc();

// Hitung nomor urut berdasarkan data
$urut = intval($countData['total']) + 1; // Urutan ditambah 1 untuk data baru
$digitCount = strlen((string)$urut); // Hitung jumlah digit dari urutan
$baseSerial = substr($prefix, 0, 6 - $digitCount); // Sesuaikan panjang prefix
$nomorSeri = $baseSerial . str_pad($urut, 6 - strlen($baseSerial), "0", STR_PAD_LEFT); // Format nomor seri


// Buat PDF dengan mPDF
$mpdf = new \Mpdf\Mpdf([
    'format' => [297, 210], // Format F4 Landscape (mm)
    'margin_left' => 0,
    'margin_right' => 0,
    'margin_top' => 0,
    'margin_bottom' => 0,
    'tempDir' => __DIR__ . '/../tmp/mpdf', // Direktori tmp khusus
]);

// Halaman pertama dengan konten dan background
$backgroundUrlPage1 = 'https://bahanamegaprestasi.id/wp-content/uploads/2025/01/Jompo-depan-1.jpg';
$mpdf->SetWatermarkImage($backgroundUrlPage1, 1, [297, 210]); // Transparansi penuh, ukuran F4 dalam mm
$mpdf->showWatermarkImage = true;

// HTML Konten Halaman Pertama
$htmlPage1 = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 0;
            position: relative;
            width: 297mm; /* Lebar F4 Landscape */
            height: 210mm; /* Tinggi F4 Landscape */
        }

        .nomorseri-container {
            position: absolute;
            top: 24mm; /* Jarak dari atas */
            width: 100%;
            font-size: 20px;
            text-transform: uppercase;
            color: black;
            text-align: center;
            font-weight: bold;
            z-index: 999;
            margin-left: -19px;
        }

        .name-container {
            position: absolute;
            bottom: 37%; /* Jarak dari bawah */
            width: 100%;
            font-size: 45px;
            text-transform: uppercase;
            color: black;
            text-align: center;
            font-weight: normal;
            z-index: 999;
            font-family: 'poppinsblack', sans-serif; /* Font mPDF */
            margin-left: -26px;
        }

        .content-container {
            position: absolute;
            bottom: 48px; /* Jarak dari bawah */
            width: 100%;
            text-align: center;
            font-size: 12px;
            line-height: 1.2;
            color: black; /* Warna hitam */
            z-index: 999;
                    margin-left: -25px;
        }


        .content-container b {
            font-weight: bold;
        }

        .content-container span {
            text-transform: uppercase;
            font-weight: bold;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <!-- Nomor Seri Container -->
    <div class='nomorseri-container'><b>{$nomorSeri}</b></div>

    <!-- Nama Container -->
    <div class='name-container'><b>
        {$namaCPM}</b>
    </div>

    <div class='content-container'>
        Berdasarkan keputusan Kepala Dinas Tenaga Kerja Kota Bekasi <b>NOMOR : 560/KEP.455/DISNAKER.LATKER</b>
        Pada Tanggal <b>26 FEBRUARI 2018</b><br>dengan ini menyatakan dan
        Menerangkan bahwa siswa <span><b>{$namaCPM}</b></span> telah mendapatkan Pelatihan Dasar Panti Jompo<br>
        di <b>LPK BAHANA MEGA PRESTASI</b>, yang dinyatakan <b>LULUS</b> Pada Tanggal :<span><b>{$tanggalSertifikatFormatted}</b></span>
    </div>
</body>
</html>
";

// Tulis halaman pertama ke PDF
$mpdf->WriteHTML($htmlPage1);

// Tambahkan halaman kedua dengan QR Code dan background baru
$mpdf->AddPage();
$backgroundUrlPage2 = 'https://bahanamegaprestasi.id/wp-content/uploads/2025/03/Jompo-belakang-1.jpg';
$mpdf->SetWatermarkImage($backgroundUrlPage2, 1, [297, 210]); // Transparansi penuh, ukuran F4 dalam mm
$mpdf->showWatermarkImage = true;

$htmlPage2 = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <style>
   body {
            margin: 0;
            padding: 0;
            position: relative;
            width: 297mm; /* Lebar F4 Landscape */
            height: 210mm; /* Tinggi F4 Landscape */
        }

        .qr-container {
            position: absolute;
            bottom: 10mm; /* Jarak dari bawah */
            right: 10mm; /* Jarak dari kanan */
            width: 75px;
            height: 70px;
            z-index: 999;
        }
    </style>
</head>
<body>
  
</body>
</html>
";

// Tulis halaman kedua ke PDF
$mpdf->WriteHTML($htmlPage2);

// Output PDF
$mpdf->Output("Sertifikat_{$namaCPM}.pdf", 'I');
?>
