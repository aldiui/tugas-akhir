<?php
// Include koneksi database
require_once 'database/connection.php';

// Aktifkan debug untuk menampilkan error
error_reporting(E_ALL);
ini_set('display_errors', 1);

function sanitize($data, $conn) {
    return $conn->real_escape_string(trim($data));
}

$showModal = false; // Variabel untuk menunjukkan popup

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Data dari form
        $name = sanitize($_POST['name'], $conn);
        $birth_date = sanitize($_POST['birth_date'], $conn);
        $age = (int) sanitize($_POST['age'], $conn);
        $gender = sanitize($_POST['gender'], $conn);
        $job = sanitize($_POST['job'], $conn);
        $phone = sanitize($_POST['phone'], $conn);
        $email = sanitize($_POST['email'], $conn) ?: null;
        $address = sanitize($_POST['address'], $conn);
        $province = sanitize($_POST['province'], $conn);
        $placement_country = "Dominika"; // Default
        $selection_status = "Belum Seleksi";
        $education = sanitize($_POST['education'], $conn); // Pendidikan

        // Validasi file foto
        if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
            throw new Exception("Upload foto gagal.");
        }

        // Proses file foto
        $uploadDir = 'uploads/photos/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $photoName = time() . '_' . basename($_FILES['photo']['name']);
        $targetFile = $uploadDir . $photoName;

        if (!move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
            throw new Exception("Gagal menyimpan file foto.");
        }

        // Simpan data ke tabel cpmi_register
        $sql = "INSERT INTO cpmi_register (name, birth_date, age, gender, job, phone, email, address, province, placement_country, selection_status, photo, education) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Prepare statement gagal: " . $conn->error);
        }

        $stmt->bind_param("ssissssssssss", $name, $birth_date, $age, $gender, $job, $phone, $email, $address, $province, $placement_country, $selection_status, $photoName, $education);
        if (!$stmt->execute()) {
            throw new Exception("Gagal menyimpan data pengguna: " . $stmt->error);
        }

        $new_user_id = $stmt->insert_id;

        // Simpan pengalaman kerja
        if (isset($_POST['work_from'])) {
            foreach ($_POST['work_from'] as $index => $work_from) {
                $work_to = sanitize($_POST['work_to'][$index], $conn);
                $work_description = sanitize($_POST['work_description'][$index], $conn);
                $work_country = sanitize($_POST['work_country'][$index], $conn);

                $sql = "INSERT INTO work_experience (user_id, work_from, work_to, work_description, work_country) 
                        VALUES (?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                if (!$stmt) {
                    throw new Exception("Prepare statement gagal: " . $conn->error);
                }

                $stmt->bind_param("issss", $new_user_id, $work_from, $work_to, $work_description, $work_country);
                if (!$stmt->execute()) {
                    throw new Exception("Gagal menyimpan pengalaman kerja: " . $stmt->error);
                }
            }
        }

        // Simpan skill
        if (isset($_POST['skill_name'])) {
            foreach ($_POST['skill_name'] as $skill_name) {
                $skill_name = sanitize($skill_name, $conn);

                $sql = "INSERT INTO skills (user_id, skill_name) VALUES (?, ?)";
                $stmt = $conn->prepare($sql);
                if (!$stmt) {
                    throw new Exception("Prepare statement gagal: " . $conn->error);
                }

                $stmt->bind_param("is", $new_user_id, $skill_name);
                if (!$stmt->execute()) {
                    throw new Exception("Gagal menyimpan skill: " . $stmt->error);
                }
            }
        }

        // Menampilkan modal popup jika berhasil
        $showModal = true;
    } else {
        throw new Exception("Metode request tidak valid.");
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
    error_log("Error: " . $e->getMessage());
    exit();
} finally {
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrasi Berhasil</title>
    <style>
        /* Styling untuk modal */
        .modal {
            display: <?php echo $showModal ? 'block' : 'none'; ?>;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        .modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .modal h2 {
            margin-bottom: 20px;
        }
        .btn-close {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .btn-close:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<!-- Modal Popup -->
<div id="successModal" class="modal">
    <div class="modal-content">
        <h2>Registrasi Berhasil!</h2>
        <p>Data Anda telah berhasil disimpan. Klik tombol di bawah untuk melanjutkan.</p>
        <button class="btn-close" onclick="window.location.href='https://bahanamegaprestasi.id';">Selesai</button>
    </div>
</div>

</body>
</html>
