<?php
require_once '../vendor/autoload.php';
require_once '../database/connection.php';

// Ambil tanggal pengajuan dari parameter
$tanggal_pengajuan = isset($_GET['tanggal_pengajuan']) ? $_GET['tanggal_pengajuan'] : null;
if (!$tanggal_pengajuan || !DateTime::createFromFormat('Y-m-d', $tanggal_pengajuan)) {
    die('Tanggal pengajuan tidak valid atau tidak ditemukan.');
}

// Query untuk mengambil data berdasarkan tanggal pengajuan
$sql = "SELECT * FROM cpmi_data WHERE tanggal_legalisir = ? ORDER BY nama_cpm ASC";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("Error preparing statement: " . $conn->error);
}
$stmt->bind_param('s', $tanggal_pengajuan);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    die('Data tidak ditemukan untuk tanggal pengajuan tersebut.');
}

// Format tanggal pengajuan untuk header dalam Bahasa Indonesia
setlocale(LC_TIME, 'id_ID.UTF-8');
$formatted_date = strftime('%d %B %Y', strtotime($tanggal_pengajuan));

// Ambil bulan dan tahun dari tanggal pengajuan
$bulanPengajuan = date('n', strtotime($tanggal_pengajuan)); // Bulan dalam angka (1-12)
$tahunPengajuan = date('Y', strtotime($tanggal_pengajuan)); // Tahun

// Fungsi untuk menghasilkan nomor pengajuan legalisir
function generateNomorPengajuan($negara, $nomor, $bulan, $tahun)
{
    $bulanRomawi = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    $bulanRomawiFormatted = $bulanRomawi[$bulan - 1]; // Bulan dalam format Romawi
    $nomorFormatted = $nomor === '-' ? '-' : str_pad($nomor, 3, '0', STR_PAD_LEFT); // Tambahkan padding 0
    return "$nomorFormatted/BMP/LGS-$negara/$bulanRomawiFormatted/$tahun";
}

// Map kode negara
$countryCodeMap = [
    'Taiwan' => 'TW',
    'Hongkong' => 'HK',
    'Dominika' => 'DM',
    'Malaysia' => 'MY'
];

// Ambil data pertama untuk menentukan negara dan nomor pengajuan legalisir
$row = $result->fetch_assoc();
$negaraTujuan = $countryCodeMap[$row['negara_tujuan']] ?? 'XX'; // Default 'XX' jika tidak ditemukan
$noLegal = $row['no_pengajuan_legalisir'] ?? '-'; // Ambil nomor pengajuan legalisir atau gunakan '-'
$result->data_seek(0); // Reset pointer ke awal hasil query

// Hasilkan nomor pengajuan
$noPengajuan = generateNomorPengajuan($negaraTujuan, $noLegal, $bulanPengajuan, $tahunPengajuan);

// Buat instance mPDF
$mpdf = new \Mpdf\Mpdf([
    'format' => 'A4-L',
    'margin_left' => 10,
    'margin_right' => 10,
    'margin_top' => 20,
    'margin_bottom' => 40,
    'tempDir' => __DIR__ . '/../tmp/mpdf',
]);

// Fungsi untuk membuat tabel data
function generateTable($result, $noPengajuan, $includeSignature = true)
{
    global $formatted_date;

    $html = "
    <html>
    <head>
        <style>
            body { font-family: 'Times New Roman', serif; font-size: 10px; line-height: 1.5; }
            .header-title { font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 20px; }
            .header-info td { font-size: 14px; padding: 2px; }
            .content-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                table-layout: auto;
            }
            .content-table th, .content-table td {
                border: 1px solid #000;
                padding: 2px;
                text-align: center;
                vertical-align: middle;
            }
            .content-table th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
            .signature-section { margin-top: 20px; width: 100%; }
            .signature-right { width: 50%; text-align: right; font-size: 12px; line-height: 1.6; }
            .signature-right p { margin: 0; }
            .signature-right .name { font-size: 14px; font-weight: bold; text-decoration: underline; }
        </style>
    </head>
    <body>
        <h1 class='header-title'>DAFTAR NAMA CPMI PENGAJUAN LEGALISASI PK DAN SPBG</h1>
        <table class='header-info'>
            <tr><td>ID P3MI</td><td>: b7306mah</td></tr>
            <tr><td>Nama P3MI</td><td>: <b>BAHANA MEGA PRESTASI</b></td></tr>
            <tr><td>Negara Tujuan</td><td>: TAIWAN</td></tr>
            <tr><td>No. Pengajuan Legalisir</td><td>: $noPengajuan</td></tr>
            <tr><td>Tgl. Pengajuan Legalisir</td><td>: $formatted_date</td></tr>
        </table>
        <table class='content-table'>
            <thead>
                <tr>
                    <th rowspan='2'>No</th>
                    <th rowspan='2'>Nama</th>
                    <th rowspan='2'>L/P</th>
                    <th rowspan='2'>Jabatan</th>
                    <th rowspan='2'>Paspor</th>
                    <th colspan='1'>No Job</th>
                    <th rowspan='2'>Nama Medical</th>
                    <th rowspan='2'>Bank</th>
                    <th rowspan='2'>ID PMI</th>
                    <th rowspan='2'>Keterangan</th>
                </tr>
                <tr>
                    <th>Visa</th>
                </tr>
            </thead>
            <tbody>";

    $no = 1;
    $result->data_seek(0); // Reset pointer result
    while ($row = $result->fetch_assoc()) {
        $jenis_kelamin = strtoupper($row['jenis_kelamin'] === 'L' ? 'L' : 'P');
        $bank = strtoupper($row['tipe_pembayaran'] === 'Transfer' ? 'BANK' : 'SETOR TUNAI');
        $html .= "
            <tr>
                <td>$no</td>
                <td style='text-align: left; padding-left: 10px;'>" . strtoupper(htmlspecialchars($row['nama_cpm'])) . "</td>
                <td>" . strtoupper(htmlspecialchars($jenis_kelamin)) . "</td>
                <td>" . strtoupper(htmlspecialchars($row['jabatan'])) . "</td>
                <td>" . strtoupper(htmlspecialchars($row['no_paspor'])) . "</td>
                <td>" . strtoupper(htmlspecialchars($row['visa'])) . "</td>
                <td>" . strtoupper(htmlspecialchars($row['no_medical'])) . "</td>
                <td>" . strtoupper(htmlspecialchars($bank)) . "</td>
                <td>" . strtoupper(htmlspecialchars($row['id_pmi'] ?? '-')) . "</td>
                <td>" . strtoupper(htmlspecialchars($row['sektor'])) . "</td>
            </tr>";
        $no++;
    }

    $html .= "</tbody></table>";

    if ($includeSignature) {
        $html .= "
        <div class='signature-section'>
            <table style='width: 95%; margin-top: 30px; font-size: 12px;'>
                <tr>
                    <td style='width: 70%;'></td>
                    <td style='width: 30%; text-align: center;'>
                        <p><b>PT BAHANA MEGA PRESTASI</b></p>
                        <br><br><br><br><br><br>
                        <p class='name'><b>ARIEF SURYOPRANOTO</b></p>
                        <p><b>Direktur Utama</b></p>
                    </td>
                </tr>
            </table>
        </div>";
    }

    $html .= "</body></html>";

    return $html;
}

// Halaman 1 dengan tanda tangan
$mpdf->WriteHTML(generateTable($result, $noPengajuan, true));

// Tambahkan halaman kedua tanpa tanda tangan
$mpdf->AddPage();
$mpdf->WriteHTML(generateTable($result, $noPengajuan, false));

// Output PDF
$output_mode = isset($_GET['output']) && $_GET['output'] === 'download' ? 'D' : 'I';
$mpdf->Output('Daftar_Nama_PMI_' . $tanggal_pengajuan . '.pdf', $output_mode);
?>
