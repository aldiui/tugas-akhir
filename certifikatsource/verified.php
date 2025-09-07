<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'database/connection.php';

// Ambil nomor seri dari URL
$nomorSeri = isset($_GET['id']) ? htmlspecialchars($_GET['id']) : null;

if (!$nomorSeri) {
    die('Nomor seri tidak ditemukan.');
}

// Mapping kode awalan nomor seri per jabatan
$prefixMapping = [
    'Pertanian' => '183',
    'Peternakan' => '194',
    'nursing_home' => '205',
    'Construction Worker' => '216',
    'Konstruksi' => '216',
];

// Ambil prefix dan nomor urut dari nomor seri
$prefix = substr($nomorSeri, 0, 3); // Ambil 3 digit pertama sebagai prefix
$nomorUrut = intval(substr($nomorSeri, 3)); // Sisanya sebagai nomor urut

// Default status tidak terverifikasi
$verified = false;

// Cari jabatan berdasarkan prefix
foreach ($prefixMapping as $jabatan => $mappedPrefix) {
    if ($prefix === $mappedPrefix) {
        // Query untuk menghitung nomor urut per jabatan, dimulai dari 2
        $sql = "
            SELECT *
            FROM (
                SELECT 
                    id, 
                    nama_cpm, 
                    tanggal_sertifikat, 
                    jabatan, 
                    ROW_NUMBER() OVER (PARTITION BY jabatan ORDER BY id) + 1 AS nomor_urut
                FROM cpmi_data
            ) AS data_urut
            WHERE jabatan = ? AND nomor_urut = ?
        ";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $jabatan, $nomorUrut);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            $nama = htmlspecialchars($data['nama_cpm']);
            $tanggalSertifikat = date('d F Y', strtotime($data['tanggal_sertifikat']));
            $verified = true;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate Verification</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(to bottom right, #4caf50, #81c784);
            color: #fff;
        }

        .container {
            text-align: center;
            background: #fff;
            color: #333;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            max-width: 600px;
            width: 78%;
        }

        .container .icon {
            font-size: 60px;
            margin-bottom: 20px;
        }

        .container .icon.success {
            color: #4caf50;
        }

        .container .icon.error {
            color: #d32f2f;
        }

        .container h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .container p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }

        .container .highlight {
            font-weight: bold;
            color: #4caf50;
        }

        .error {
            color: #d32f2f;
            font-weight: bold;
        }

        .back-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #4caf50;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s ease;
        }

        .back-link:hover {
            background: #388e3c;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if ($verified): ?>
            <div class="icon success"><i class="fas fa-check-circle"></i></div>
            <h1>Sertifikat Terverifikasi</h1>
            <p>This certificate is <span class="highlight">GENUINE</span>.</p>
            <p><strong>Nama:</strong> <?= $nama; ?></p>
            <p><strong>Certificate Number:</strong> <?= $nomorSeri; ?></p>
            <p><strong>Tanggal Lulus:</strong> <?= $tanggalSertifikat; ?></p>
            <p>Sertifikat Terdaftar di<strong>LPK Bahana Mega Prestasi</strong>.</p>
        <?php else: ?>
            <div class="icon error"><i class="fas fa-times-circle"></i></div>
            <h1 class="error">Sertifikat Tidak Terdaftar!!</h1>
            <p>Data<span class="error">Tidak Valid</span>.</p>
            <p>Pastikan Scan Sertifikat Asli.</p>
        <?php endif; ?>
    </div>
</body>
</html>
