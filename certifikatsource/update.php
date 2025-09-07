<?php
// Tampilkan error untuk debugging (Opsional, bisa dinonaktifkan untuk produksi)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include koneksi database
require_once 'database/connection.php';

try {
    // Pastikan metode request adalah POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Ambil data dari form tanpa validasi
        $id = intval($_POST['id'] ?? 0);
        $id_pmi = $_POST['id_pmi'] ?? null;
        $nama = $_POST['nama'] ?? null;
        $jenis_kelamin = $_POST['jenis_kelamin'] ?? null;
        $negara_tujuan = $_POST['negara_tujuan'] ?? null;
        $sektor = $_POST['sektor'] ?? null;

        // Ambil input untuk sektor jika "Lainnya"
        if ($sektor === 'Lainnya') {
            $sektor = $_POST['custom_sector'] ?? null;
        }

        $jabatan = $_POST['jabatan'] ?? null;
        $no_paspor = $_POST['no_paspor'] ?? null;
        $no_medical = $_POST['no_medical'] ?? null;
        $no_visa = $_POST['no_visa'] ?? null;
        $tipe_pembayaran = $_POST['tipe_pembayaran'] ?? null;
        $tanggal_sertifikat = $_POST['tanggal_sertifikat'] ?? null;
        $tanggal_legalisir = $_POST['tanggal_legalisir'] ?? null;
        $no_pengajuan_legalisir = $_POST['no_pengajuan_legalisir'] ?? null;

        // Query UPDATE tanpa validasi
        $sql = "
        UPDATE cpmi_data SET
            id_pmi = ?,
            nama_cpm = ?,
            jenis_kelamin = ?,
            negara_tujuan = ?,
            sektor = ?,
            jabatan = ?,
            no_paspor = ?,
            no_medical = ?,
            visa = ?,
            tipe_pembayaran = ?,
            tanggal_sertifikat = ?,
            tanggal_legalisir = ?,
            no_pengajuan_legalisir = ?
        WHERE id = ?
        ";

        // Prepare statement
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sssssssssssssi",
            $id_pmi,
            $nama,
            $jenis_kelamin,
            $negara_tujuan,
            $sektor,
            $jabatan,
            $no_paspor,
            $no_medical,
            $no_visa,
            $tipe_pembayaran,
            $tanggal_sertifikat,
            $tanggal_legalisir,
            $no_pengajuan_legalisir,
            $id
        );

        // Eksekusi query
        $stmt->execute();

        // Arahkan kembali ke index.php
        header('Location: index.php');
        exit();
    } else {
        // Jika bukan metode POST, arahkan ke index.php
        header('Location: index.php');
        exit();
    }
} catch (Exception $e) {
    // Tangkap error dan tampilkan pesan
    echo "Terjadi kesalahan: " . $e->getMessage();
} finally {
    // Tutup koneksi database
    $conn->close();
}
