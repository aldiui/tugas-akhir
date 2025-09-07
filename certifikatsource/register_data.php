<?php
// Include header
include 'header.php';
// Include koneksi database
require_once 'database/connection.php';

// Aktifkan debugging untuk menampilkan error
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Pagination setup
$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

try {
    // Ambil data dari database dengan batasan dan urutan sesuai waktu masuk
    $query = "SELECT * FROM cpmi_register ORDER BY user_id DESC LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    // Hitung total data untuk pagination
    $countQuery = "SELECT COUNT(*) as total FROM cpmi_register";
    $countResult = $conn->query($countQuery);
    $totalRows = $countResult->fetch_assoc()['total'];
    $totalPages = ceil($totalRows / $limit);
} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data List</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        th {
            background-color: #f4f4f4;
            font-weight: bold;
        }
        .pagination {
            margin: 20px 0;
            text-align: center;
        }
        .pagination a {
            margin: 0 5px;
            padding: 8px 12px;
            text-decoration: none;
            background-color: #007bff;
            color: white;
            border-radius: 4px;
        }
        .pagination a:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<h2>Register Data</h2>

<table>
    <thead>
        <tr>
            <th>No</th>
            <th>Profile Image</th>
            <th>Nama</th>
            <th>Usia</th>
            <th>Domisili</th>
            <th>Negara Penempatan</th>
            <th>Job yang Dipilih</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $no = $offset + 1; // Nomor urut berdasarkan halaman
        while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= $no++; ?></td>
                <td><img src="uploads/photos/<?= htmlspecialchars($row['photo']) ?>" alt="Profile" width="50" height="50" style="border-radius: 50%;"></td>
                <td><?= htmlspecialchars($row['name']) ?></td>
                <td><?= htmlspecialchars($row['age']) ?></td>
                <td><?= htmlspecialchars($row['province']) ?></td>
                <td><?= htmlspecialchars($row['placement_country']) ?></td>
                <td><?= htmlspecialchars($row['job']) ?></td>
                <td>
                    <a href="cpmi_edit.php?id=<?= $row['user_id'] ?>" title="Edit">
                        &#x270E; <!-- Icon Edit -->
                    </a>
                    <a href="delete.php?id=<?= $row['user_id'] ?>" title="Delete" onclick="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                        &#x1F5D1; <!-- Icon Delete -->
                    </a>
                    <a href="template/download.php?id=<?= $row['user_id'] ?>" title="Download PDF">
                        &#x1F4BE; <!-- Icon Download -->
                    </a>
                </td>
            </tr>
        <?php endwhile; ?>
    </tbody>
</table>

<div class="pagination">
    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <a href="?page=<?= $i ?>" <?= $i === $page ? 'style="background-color: #0056b3;"' : '' ?>><?= $i ?></a>
    <?php endfor; ?>
</div>

</body>
</html>
