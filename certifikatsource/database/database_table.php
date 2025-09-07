<?php
// Include koneksi database
require_once 'connection.php';

try {
    // Mengecek apakah tabel 'cpmi_data' sudah ada
    $sql_check_table = "SHOW TABLES LIKE 'cpmi_data'";
    $result = $conn->query($sql_check_table);

    if ($result->num_rows == 1) {
        echo "Tabel 'cpmi_data' sudah ada.<br>";

        // Fungsi untuk memeriksa keberadaan kolom
        function columnExists($conn, $table, $column) {
            $sql_check_column = "SHOW COLUMNS FROM $table LIKE '$column'";
            $result = $conn->query($sql_check_column);
            return $result->num_rows > 0;
        }

        // Tambahkan kolom 'jenis_kelamin' jika belum ada
        if (!columnExists($conn, 'cpmi_data', 'jenis_kelamin')) {
            $sql_add_column_gender = "ALTER TABLE cpmi_data ADD COLUMN jenis_kelamin ENUM('L', 'P') AFTER nama_cpm";
            if ($conn->query($sql_add_column_gender) === TRUE) {
                echo "Kolom 'jenis_kelamin' berhasil ditambahkan pada tabel 'cpmi_data'.<br>";
            } else {
                echo "Gagal menambahkan kolom 'jenis_kelamin': " . $conn->error . "<br>";
            }
        } else {
            echo "Kolom 'jenis_kelamin' sudah ada.<br>";
        }

        // Tambahkan kolom 'id_pmi' jika belum ada
        if (!columnExists($conn, 'cpmi_data', 'id_pmi')) {
            $sql_add_column_id_pmi = "ALTER TABLE cpmi_data ADD COLUMN id_pmi VARCHAR(50) DEFAULT NULL AFTER sektor";
            if ($conn->query($sql_add_column_id_pmi) === TRUE) {
                echo "Kolom 'id_pmi' berhasil ditambahkan pada tabel 'cpmi_data'.<br>";
            } else {
                echo "Gagal menambahkan kolom 'id_pmi': " . $conn->error . "<br>";
            }
        } else {
            echo "Kolom 'id_pmi' sudah ada.<br>";
        }

        // Tambahkan kolom 'tanggal_sertifikat' jika belum ada
        if (!columnExists($conn, 'cpmi_data', 'tanggal_sertifikat')) {
            $sql_add_column_certificate_date = "ALTER TABLE cpmi_data ADD COLUMN tanggal_sertifikat DATE AFTER tanggal_surat_pernyataan";
            if ($conn->query($sql_add_column_certificate_date) === TRUE) {
                echo "Kolom 'tanggal_sertifikat' berhasil ditambahkan pada tabel 'cpmi_data'.<br>";
            } else {
                echo "Gagal menambahkan kolom 'tanggal_sertifikat': " . $conn->error . "<br>";
            }
        } else {
            echo "Kolom 'tanggal_sertifikat' sudah ada.<br>";
        }

        // Tambahkan kolom 'no_pengajuan_legalisir' jika belum ada
        if (!columnExists($conn, 'cpmi_data', 'no_pengajuan_legalisir')) {
            $sql_add_column_legalisir_number = "ALTER TABLE cpmi_data ADD COLUMN no_pengajuan_legalisir INT(3) DEFAULT NULL AFTER sektor";
            if ($conn->query($sql_add_column_legalisir_number) === TRUE) {
                echo "Kolom 'no_pengajuan_legalisir' berhasil ditambahkan pada tabel 'cpmi_data'.<br>";
            } else {
                echo "Gagal menambahkan kolom 'no_pengajuan_legalisir': " . $conn->error . "<br>";
            }
        } else {
            echo "Kolom 'no_pengajuan_legalisir' sudah ada.<br>";
        }
    } else {
        // Membuat tabel 'cpmi_data' jika belum ada
        $sql_cpmi_data = "
        CREATE TABLE cpmi_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nama_cpm VARCHAR(255) NOT NULL,
            jenis_kelamin ENUM('L', 'P') NOT NULL,
            no_paspor VARCHAR(255) NOT NULL,
            negara_tujuan VARCHAR(255) NOT NULL,
            jabatan VARCHAR(255) NOT NULL,
            visa VARCHAR(50),
            no_medical VARCHAR(50),
            sektor VARCHAR(255) NOT NULL,
            no_pengajuan_legalisir INT(3) DEFAULT NULL,
            id_pmi VARCHAR(50) DEFAULT NULL,
            tipe_pembayaran ENUM('Setor Tunai', 'Transfer') NOT NULL,
            tanggal_legalisir DATE NOT NULL,
            tanggal_surat_pernyataan DATE NOT NULL,
            tanggal_sertifikat DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ";

        if ($conn->query($sql_cpmi_data) === TRUE) {
            echo "Tabel 'cpmi_data' berhasil dibuat.<br>";
        } else {
            echo "Error saat membuat tabel 'cpmi_data': " . $conn->error . "<br>";
        }
    }

    // Menutup koneksi
    $conn->close();
} catch (Exception $e) {
    echo "Terjadi kesalahan: " . $e->getMessage();
}
?>
