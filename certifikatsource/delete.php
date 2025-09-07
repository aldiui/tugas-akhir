<?php
// Include koneksi database
require_once 'database/connection.php';

// Periksa apakah parameter ID ada di URL
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Pastikan ID adalah integer

    try {
        // Query untuk menghapus data berdasarkan ID
        $sql = "DELETE FROM cpmi_data WHERE id = ?";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            throw new Exception("Gagal menyiapkan query: " . $conn->error);
        }

        // Bind parameter dan eksekusi query
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            // Jika berhasil, redirect kembali ke index.php dengan pesan sukses
            header("Location: index.php?message=delete_success");
        } else {
            // Jika gagal, redirect dengan pesan error
            header("Location: index.php?message=delete_error");
        }

        // Tutup statement
        $stmt->close();
    } catch (Exception $e) {
        // Jika terjadi error, tampilkan pesan
        die("Terjadi kesalahan: " . $e->getMessage());
    }
} else {
    // Jika ID tidak ditemukan, redirect ke index.php dengan pesan error
    header("Location: index.php?message=id_not_found");
}

// Tutup koneksi database
$conn->close();
?>
