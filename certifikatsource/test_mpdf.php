<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/vendor/autoload.php';

use Mpdf\Mpdf;

try {
    // Tentukan folder temporary saat membuat instance mPDF
    $temporaryDir = __DIR__ . '/tmp';
    if (!is_dir($temporaryDir)) {
        mkdir($temporaryDir, 0777, true); // Buat folder jika belum ada
    }

    $mpdf = new Mpdf([
        'tempDir' => $temporaryDir // Atur folder temporary di sini
    ]);

    $html = '<h1>Test mPDF</h1><p>This is a test PDF generated using mPDF.</p>';
    $mpdf->WriteHTML($html);
    $mpdf->Output();
} catch (\Mpdf\MpdfException $e) {
    echo 'Error: ' . $e->getMessage();
}
?>
