<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once '../vendor/autoload.php';
require_once '../database/connection.php';

// Cek apakah ID dikirim melalui URL
if (!isset($_GET['id'])) {
    die('ID tidak ditemukan.');
}

$id = intval($_GET['id']);

// Ambil data dari database berdasarkan ID
$sql = "SELECT * FROM cpmi_data WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    die('Data tidak ditemukan.');
}

$data = $result->fetch_assoc();

// Format tanggal untuk ditampilkan
setlocale(LC_ALL,
    'id_ID.UTF8', 'id_ID.UTF-8', 'id_ID.8859-1', 'id_ID',
    'IND.UTF8', 'IND.UTF-8', 'IND.8859-1', 'IND',
    'Indonesian.UTF8', 'Indonesian.UTF-8', 'Indonesian.8859-1', 'Indonesian', 'Indonesia',
    'id', 'ID',
    );
$tanggal_leges = strftime('%d %B %Y', strtotime($data['tanggal_legalisir']));

$mpdf = new \Mpdf\Mpdf([
    'format' => 'A5',
    'margin_left' => 10,
    'margin_right' => 10,
    'margin_top' => 10,
    'margin_bottom' => 10,
    'tempDir' => __DIR__ . '/../tmp/mpdf', // Direktori tmp khusus
]);
// HTML template
$html = '
<table style="width: 100%; line-height: 1.2; margin-bottom: 5px;">
    <tr>
        <td style="width: 10%; text-align: left;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Logo_Kementerian_Pelindungan_Pekerja_Migran_Indonesia_-_BP2MI_v3_%282024%29.svg/804px-Logo_Kementerian_Pelindungan_Pekerja_Migran_Indonesia_-_BP2MI_v3_%282024%29.svg.png" alt="Logo BP2MI" style="width: 80px;">
        </td>
        <td style="width: 90%; text-align: center; text-transform: uppercase; font-weight: bold; font-size: 8px; line-height: 1.5;">
            <span style="font-size: 11px;">KEMENTRIAN PELINDUNGAN PEKERJA MIGRAN INDONESIA<br>
            <span style="font-size: 10px;">BALAI PELAYANAN PELINDUNGAN PEKERJA MIGRAN INDONESIA<br>DKI JAKARTA</span><br>
            <span style="font-size: 8px; font-weight: bold; text-transform: capitalize;">Jl. Penganten Ali No. 71 Ciracas, Jakarta Timur Telp. (021) 87781840, Fax (021) 87781841</span><br>
            <span style="font-size: 10px;">JAKARTA 13740</span>
        </td>
    </tr>
</table>
<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="border-top: 1px solid black;"></td>
    </tr>
    <tr>
        <td style="border-top: 3px solid black;"></td>
    </tr>
</table>
<table style="width: 100%; font-size: 8px; text-transform: uppercase; margin-top: 10px;">
    <tr>
        <td colspan="2" style="text-align: center; font-weight: bold;">CHECK LIST<br>PEMBIAYAAN PENEMPATAN CALON PMI/PMI KE LUAR NEGERI</td>
    </tr>
</table>

<table style="width: 50%; font-size: 8px; text-transform: uppercase; line-height: 1.5; margin-top: 10px;">

    <tr>
        <td style="width: 35%; font-weight: normal; text-transform: uppercase;">Nama</td>
        <td style="width: 65%;">: '. htmlspecialchars($data['nama_cpm']) . '</td>
    </tr>
    <tr>
        <td style="font-weight: normal; text-transform: uppercase;">No. Paspor</td>
         <td style="font-weight: normal; text-transform: uppercase;">: ' . htmlspecialchars($data['no_paspor']) . '</td>
    </tr>
    <tr>
        <td style="font-weight: normal; text-transform: uppercase;">Negara</td>
         <td style="font-weight: normal; text-transform: uppercase;">: ' . htmlspecialchars($data['negara_tujuan']) . '</td>
    </tr>
    <tr>
        <td style="font-weight: normal; text-transform: uppercase;">Nama P3MI</td>
        <td>: PT. BAHANA MEGA PRESTASI</td>
    </tr>
    <tr>
        <td style="font-weight: normal; text-transform: uppercase;">Jabatan</td>
         <td style="font-weight: normal; text-transform: uppercase;">: ' . htmlspecialchars($data['jabatan']) . '</td>
    </tr>
    <tr>
        <td style="font-weight: normal; text-transform: uppercase;">Pembiayaan</td>
        <td>:</td>
    </tr>
</table>
<table style="width: 100%; font-size: 8px; text-transform: uppercase; border-collapse: separate; border-spacing: 5px; margin-top: 10px;">
    <thead>
        <tr>
            <th rowspan="2" style="text-align: left; vertical-align: bottom; font-weight: bold;">KUR</th>
            <th colspan="2" style="text-align: center; font-weight: bold; border: 0px solid black;">KELENGKAPAN</th>
        </tr>
        <tr>
            <th style="text-align: left; width: 10%; font-weight: bold; border: 0px solid black;">ADA</th>
            <th style="text-align: center; width: 13%; font-weight: bold; border: 0px solid black;">TIDAK ADA</th>
        </tr>
    </thead>
    <tbody>
        <!-- KUR -->
        <tr>
            <td>&nbsp;&nbsp;SURAT PERNYATAAN BIAYA & GAJI (SPBG)</td>
            <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
            <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
        </tr>
        <!-- NON KUR -->
        <tr>
            <td style="font-weight: bold;">NON KUR</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <td>◦ SURAT PERNYATAAN BIAYA PENEMPATAN (SPBG)</td>
            <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
            <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
        </tr>
        <tr>
            <td>◦ SURAT PERNYATAAN PMI JIKA ADA BIAYA DI SPBG</td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
        </tr>
        <!-- TUNAI -->
        <tr>
            <td style="font-weight: bold;">TUNAI</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <td>◦ SURAT PERNYATAAN BIAYA & GAJI (SPBG)</td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
        </tr>
        <tr>
            <td>◦ SURAT PERNYATAAN TIDAK MENGGUNAKAN FASILITAS PINJAMAN PEMERINTAH</td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
        </tr>
        <tr>
            <td>◦ SURAT PERNYATAAN PMI TELAH MEMBAYAR LUNAS</td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
        </tr>
        <tr>
            <td>◦ SURAT PERNYATAAN P3MI TIDAK AKAN MELAKUKAN POTONGAN</td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
           <td style="text-align: left; border: 0px solid black;">
                <div style="width: 10px; height: 20px; border: 1px solid black; display: inline-block; margin: px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
        </tr>
    </tbody>
</table>
<!-- HTML dan CSS untuk PDF -->
<table style="width: 100%; font-size: 8px; margin-top: 10px; text-transform: uppercase;">
    <tr>
        <td colspan="3" style="font-weight: bold; font-size: 9px;">K U R / N O N  K U R</td>
    </tr>
    <tr>
        <td style="width: 20%;">Nama BANK</td>
        <td style="width: 5%;">:</td>
        <td style="width: 75%;"></td>
    </tr>
    <tr>
        <td>Pokok Pinjaman</td>
        <td>:</td>
        <td></td>
    </tr>
    <tr>
        <td>Pinjaman Tambahan</td>
        <td>:</td>
        <td></td>
    </tr>
    <tr>
        <td>Bunga</td>
        <td>:</td>
        <td></td>
    </tr>
    <tr>
        <td>Lama Angsuran</td>
        <td>:</td>
        <td></td>
    </tr>
    <tr>
        <td>Cicilan Perbulan</td>
        <td>:</td>
        <td></td>
    </tr>
</table>

<!-- Tabel untuk tanda tangan -->
<table style="width: 100%; margin-top: 30px; font-size: 8px; text-transform: uppercase;">
    <tr>
        <td style="width: 50%;"></td>
        <td style="width: 50%; text-align: center;">
            <p>Jakarta, ' . $tanggal_leges . '</p>
            <p>Petugas Verifikasi</p>
            <br><br><br><br><br>
            <p>(..........................................)</p>
        </td>
    </tr>
</table>




';

// Tambahkan HTML ke PDF
$mpdf->WriteHTML($html);

// Output PDF
$mpdf->Output();
