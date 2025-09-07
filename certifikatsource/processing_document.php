<?php
// Include koneksi database
require_once 'database/connection.php';

function sanitize($data, $conn) {
    return $conn->real_escape_string(trim($data));
}

try {
    // Pastikan metode yang digunakan adalah POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        session_start(); // Mulai sesi untuk mengambil user_id
        if (!isset($_SESSION['user_id'])) {
            throw new Exception("User tidak terautentikasi. Silakan login terlebih dahulu.");
        }

        // Ambil user_id dari sesi
        $user_id = $_SESSION['user_id'];

        // Ambil data dari form
        $id_pmi = isset($_POST['id_pmi']) ? sanitize($_POST['id_pmi'], $conn) : null;
        $nama = isset($_POST['nama']) ? sanitize($_POST['nama'], $conn) : null;
        $jenis_kelamin = isset($_POST['jenis_kelamin']) ? sanitize($_POST['jenis_kelamin'], $conn) : null;
        $negara_tujuan = isset($_POST['negara_tujuan']) ? sanitize($_POST['negara_tujuan'], $conn) : null;
        $sektor = isset($_POST['sektor']) ? sanitize($_POST['sektor'], $conn) : null;

        // Jika sektor adalah "Lainnya," gunakan input manual
        if ($sektor === 'Lainnya') {
            $sektor = isset($_POST['custom_sector']) ? sanitize($_POST['custom_sector'], $conn) : null;
        }

        $jabatan = isset($_POST['jabatan']) ? sanitize($_POST['jabatan'], $conn) : null;
        $no_paspor = isset($_POST['no_paspor']) ? sanitize($_POST['no_paspor'], $conn) : null;
        $no_medical = isset($_POST['no_medical']) ? sanitize($_POST['no_medical'], $conn) : null;
        $no_visa = isset($_POST['no_visa']) ? sanitize($_POST['no_visa'], $conn) : null;
        $no_pengajuan_legalisir = isset($_POST['no_pengajuan_legalisir']) ? (int)$_POST['no_pengajuan_legalisir'] : null; // Ambil No Pengajuan Legalisir
        $tipe_pembayaran = isset($_POST['tipe_pembayaran']) ? sanitize($_POST['tipe_pembayaran'], $conn) : null;
        $tanggal_sertifikat = isset($_POST['tanggal_sertifikat']) ? sanitize($_POST['tanggal_sertifikat'], $conn) : null;
        $tanggal_legalisir = isset($_POST['tanggal_legalisir']) ? sanitize($_POST['tanggal_legalisir'], $conn) : null;
        $tanggal_pernyataan = isset($_POST['tanggal_pernyataan']) ? sanitize($_POST['tanggal_pernyataan'], $conn) : null;

        // Validasi input wajib
        if (!$nama || !$jenis_kelamin || !$negara_tujuan || !$sektor || !$jabatan || !$no_paspor || !$tipe_pembayaran || !$tanggal_sertifikat || !$tanggal_legalisir || !$tanggal_pernyataan || !$no_pengajuan_legalisir) {
            throw new Exception("Semua field yang wajib harus diisi.");
        }

        // Validasi format tanggal (opsional)
        function isValidDate($date) {
            return DateTime::createFromFormat('Y-m-d', $date) !== false;
        }

        if (!isValidDate($tanggal_sertifikat) || !isValidDate($tanggal_legalisir) || !isValidDate($tanggal_pernyataan)) {
            throw new Exception("Format tanggal tidak valid.");
        }

        // Query SQL untuk menyimpan data
        $sql = "
        INSERT INTO cpmi_data (
            user_id, id_pmi, nama_cpm, jenis_kelamin, no_paspor, negara_tujuan, jabatan, visa, no_medical, sektor, no_pengajuan_legalisir, tipe_pembayaran, tanggal_legalisir, tanggal_surat_pernyataan, tanggal_sertifikat
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ";

        // Prepare statement
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Prepare statement gagal: " . $conn->error);
        }

        // Bind parameter
        $stmt->bind_param(
            "issssssssssssss",
            $user_id,
            $id_pmi,
            $nama,
            $jenis_kelamin,
            $no_paspor,
            $negara_tujuan,
            $jabatan,
            $no_visa,
            $no_medical,
            $sektor,
            $no_pengajuan_legalisir,
            $tipe_pembayaran,
            $tanggal_legalisir,
            $tanggal_pernyataan,
            $tanggal_sertifikat
        );

        // Eksekusi query
        if (!$stmt->execute()) {
            throw new Exception("Eksekusi query gagal: " . $stmt->error);
        }

        // Redirect dengan pesan sukses
        header('Location: index.php?message=success');
        exit();
    } else {
        throw new Exception("Metode request tidak valid. Hanya POST yang diperbolehkan.");
    }
} catch (Exception $e) {
    // Tampilkan error
    echo "Terjadi kesalahan: " . $e->getMessage();
    exit();
} finally {
    // Tutup koneksi database
    $conn->close();
}
