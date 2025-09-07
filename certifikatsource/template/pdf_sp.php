<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once '../database/connection.php';

// Cek apakah ID dikirim melalui URL
if (!isset($_GET['id'])) {
    die('ID tidak ditemukan.');
}

$id = intval($_GET['id']);

// Ambil data dari database berdasarkan ID
$sql = "SELECT * FROM cpmi_data WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt) {
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    die("Query error: " . $conn->error);
}

if ($result->num_rows == 0) {
    die('Data tidak ditemukan.');
}

$data = $result->fetch_assoc();

// Format tanggal untuk ditampilkan
$tanggal_pernyataan = date('d F Y', strtotime($data['tanggal_surat_pernyataan']));

// Buat instance mPDF
$mpdf = new \Mpdf\Mpdf([
    'format' => [215, 330], // Dimensi kertas Folio dalam mm
    'margin_left' => 25,
    'margin_right' => 25,
    'margin_top' => 25,
    'margin_bottom' => 25,
    'tempDir' => __DIR__ . '/../tmp/mpdf', // Direktori tmp khusus
]);

// HTML template
$html = '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: "Times New Roman", Times, serif;
            font-size: 14px;
            line-height: 1.5;
        }
        .title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .content {
            text-align: justify;
        }
        .info-table {
            width: 100%;
            line-height: 1.5;
            margin-top: 10px;
        }
        .info-table td {
            vertical-align: top;
            padding: 3px 0;
        }
        .info-table .question {
            width: 35%;
 
        }
        .info-table .answer {
            width: 65%;
        }
        .signature {
            text-align: right;
            margin-top: 50px;
        }
        .signature p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="title"><br><br><br>
        <u>SURAT PERNYATAAN</u>
    </div>
    <div class="content"><br><br>
        <p>Saya yang bertandatangan di bawah ini:</p>
        <table class="info-table">
            <tr>
                <td class="question">Nama</td>
                <td class="answer">: ARIEF SURYOPRANOTO</td>
            </tr>
            <tr>
                <td class="question">Jabatan</td>
                <td class="answer">: Direktur Utama</td>
            </tr>
            <tr>
                <td class="question">Alamat P3MI</td>
                <td class="answer">: JL. Raya Kodau No.42 RT/RW. 005/007 Jatimekar, Jatiasih,<br>Kota Bekasi.</td>
            </tr>
        </table>
<br>
        <p>Dengan ini menyatakan bahwa Calon Pekerja Migran Indonesia (CPMI) sebagaimana data berikut:</p>
        <table class="info-table">
            <tr>
                <td class="question">Nama CPMI</td>
                <td class="answer">: ' . htmlspecialchars($data['nama_cpm']) . '</td>
            </tr>
            <tr>
                <td class="question">No ID CPMI</td>
                <td class="answer">: ' . htmlspecialchars($data['id_pmi']) . '</td>
            </tr>
            <tr>
                <td class="question">No Paspor CPMI</td>
                <td class="answer">: ' . htmlspecialchars($data['no_paspor']) . '</td>
            </tr>
        </table>

        <p>Bahwa yang bersangkutan telah membayar secara lunas biaya penempatan secara tunai (tanpa pinjaman) sehingga P3MI tidak akan melakukan pemotongan kembali terhadap gaji PMI.</p>
        <p>Demikian pernyataan ini kami buat dengan sesungguhnya untuk digunakan sebagaimana mestinya.</p>
    </div><br>
    <table style="width: 100%; margin-top: 30px; font-size: 14px; ">
    <tr>
        <td style="width: 50%;"></td>
        <td style="width: 50%; text-align: center;">
            <p>Bekasi, ' . $tanggal_pernyataan . '</p>
            <p>Pembuat Pernyataan</p>
            <br><br><br><br><br><br>
             <p><u><b>ARIEF SURYOPRANOTO</b></u></p>
             <p>Direktur Utama</p>
        </td>
    </tr>
</table>
</body>
</html>
';

// Tambahkan HTML ke PDF
$mpdf->WriteHTML($html);

// Output PDF
$mpdf->Output('Surat_Pernyataan_' . htmlspecialchars($data['nama_cpm']) . '.pdf', 'I');
?>
