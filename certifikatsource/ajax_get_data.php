<?php
session_start();
require_once 'database/connection.php';

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['user_id']) || !isset($_SESSION['username'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

// Ambil data user_id dan username dari sesi
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Filter dan paginasi
$tanggal_pengajuan = isset($_GET['tanggal_pengajuan']) ? $_GET['tanggal_pengajuan'] : null;
$limit = 10;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$offset = ($page - 1) * $limit;

try {
    // Query berbeda untuk admin
    if ($username === 'admin') {
        // Admin dapat melihat semua data
        $count_sql = "SELECT COUNT(*) as total FROM cpmi_data";
        $data_sql = "SELECT id, nama_cpm, id_pmi, jabatan, tanggal_legalisir 
                     FROM cpmi_data";
        if ($tanggal_pengajuan) {
            $count_sql .= " WHERE tanggal_legalisir = ?";
            $data_sql .= " WHERE tanggal_legalisir = ?";
        }
        $data_sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    } else {
        // User biasa hanya melihat data mereka sendiri
        $count_sql = "SELECT COUNT(*) as total FROM cpmi_data WHERE user_id = ?";
        $data_sql = "SELECT id, nama_cpm, id_pmi, jabatan, tanggal_legalisir 
                     FROM cpmi_data WHERE user_id = ?";
        if ($tanggal_pengajuan) {
            $count_sql .= " AND tanggal_legalisir = ?";
            $data_sql .= " AND tanggal_legalisir = ?";
        }
        $data_sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    }

    // Hitung total data untuk paginasi
    $count_stmt = $conn->prepare($count_sql);
    if ($username === 'admin') {
        if ($tanggal_pengajuan) {
            $count_stmt->bind_param("s", $tanggal_pengajuan);
        }
    } else {
        if ($tanggal_pengajuan) {
            $count_stmt->bind_param("is", $user_id, $tanggal_pengajuan);
        } else {
            $count_stmt->bind_param("i", $user_id);
        }
    }
    $count_stmt->execute();
    $count_result = $count_stmt->get_result();
    $total_rows = $count_result->fetch_assoc()['total'];
    $total_pages = ceil($total_rows / $limit);

    // Ambil data
    $data_stmt = $conn->prepare($data_sql);
    if ($username === 'admin') {
        if ($tanggal_pengajuan) {
            $data_stmt->bind_param("si", $tanggal_pengajuan, $limit, $offset);
        } else {
            $data_stmt->bind_param("ii", $limit, $offset);
        }
    } else {
        if ($tanggal_pengajuan) {
            $data_stmt->bind_param("isii", $user_id, $tanggal_pengajuan, $limit, $offset);
        } else {
            $data_stmt->bind_param("iii", $user_id, $limit, $offset);
        }
    }
    $data_stmt->execute();
    $data_result = $data_stmt->get_result();

    // Format data untuk JSON
    $data = [];
    while ($row = $data_result->fetch_assoc()) {
        $data[] = [
            'id' => $row['id'],
            'nama' => $row['nama_cpm'],
            'id_pmi' => $row['id_pmi'],
            'tanggal_legalisir' => date('d F Y', strtotime($row['tanggal_legalisir'])),
            'jabatan' => $row['jabatan'],
            'action' => [
                'edit' => "edit.php?id={$row['id']}",
                'delete' => "delete.php?id={$row['id']}",
            ],
            'export' => [
                'sp' => "template/pdf_sp.php?id={$row['id']}",
                'ck' => "template/pdf_ck.php?id={$row['id']}",
                'certificate' => "template/certificate.php?id={$row['id']}",
            ],
        ];
    }

    // Kirim respon JSON
    echo json_encode([
        'data' => $data,
        'total_pages' => $total_pages,
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    $conn->close();
}
