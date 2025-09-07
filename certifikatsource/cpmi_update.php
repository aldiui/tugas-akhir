<?php
// Include koneksi database
require_once 'database/connection.php';

function sanitize($data, $conn) {
    return $conn->real_escape_string(trim($data));
}

try {
    // Pastikan user_id ada di URL
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception("User ID tidak ditemukan.");
    }

    $user_id = $_GET['id'];

    // Ambil data yang dikirim dari form
    $name = sanitize($_POST['name'], $conn);
    $birth_date = sanitize($_POST['birth_date'], $conn);
    $age = (int) sanitize($_POST['age'], $conn);
    $gender = sanitize($_POST['gender'], $conn);
    $phone = sanitize($_POST['phone'], $conn);
    $email = sanitize($_POST['email'], $conn) ?: null;
    $address = sanitize($_POST['address'], $conn);
    $province = sanitize($_POST['province'], $conn);
    $education = sanitize($_POST['education'], $conn); 

    // Cek apakah ada foto profil baru
    $photoName = $user['photo']; // Default, jika tidak ada foto baru
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        // Proses foto baru
        $uploadDir = 'uploads/photos/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $photoName = time() . '_' . basename($_FILES['photo']['name']);
        $targetFile = $uploadDir . $photoName;
        
        if (!move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
            throw new Exception("Gagal menyimpan file foto.");
        }
    }

    // Update data di tabel cpmi_register
    $sql = "UPDATE cpmi_register SET 
            name = ?, 
            birth_date = ?, 
            age = ?, 
            gender = ?, 
            phone = ?, 
            email = ?, 
            address = ?, 
            province = ?, 
            education = ?, 
            photo = ? 
            WHERE user_id = ?";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare statement gagal: " . $conn->error);
    }

    $stmt->bind_param("ssisssssssi", $name, $birth_date, $age, $gender, $phone, $email, $address, $province, $education, $photoName, $user_id);
    
    if (!$stmt->execute()) {
        throw new Exception("Gagal mengupdate data pengguna: " . $stmt->error);
    }

    // Update Pengalaman Kerja jika ada perubahan
    if (isset($_POST['work_from'])) {
        // Hapus pengalaman kerja lama terlebih dahulu
        $sqlDeleteWork = "DELETE FROM work_experience WHERE user_id = ?";
        $stmtDeleteWork = $conn->prepare($sqlDeleteWork);
        $stmtDeleteWork->bind_param("i", $user_id);
        $stmtDeleteWork->execute();

        // Menyimpan pengalaman kerja yang baru
        foreach ($_POST['work_from'] as $index => $work_from) {
            $work_to = sanitize($_POST['work_to'][$index], $conn);
            $work_description = sanitize($_POST['work_description'][$index], $conn);
            $work_country = sanitize($_POST['work_country'][$index], $conn);

            $sqlWork = "INSERT INTO work_experience (user_id, work_from, work_to, work_description, work_country) 
                        VALUES (?, ?, ?, ?, ?)";
            $stmtWork = $conn->prepare($sqlWork);
            if (!$stmtWork) {
                throw new Exception("Prepare statement gagal untuk pengalaman kerja: " . $conn->error);
            }

            $stmtWork->bind_param("issss", $user_id, $work_from, $work_to, $work_description, $work_country);
            if (!$stmtWork->execute()) {
                throw new Exception("Gagal menyimpan pengalaman kerja: " . $stmtWork->error);
            }
        }
    }

    // Update Keterampilan jika ada perubahan
    if (isset($_POST['skill_name'])) {
        // Hapus keterampilan lama terlebih dahulu
        $sqlDeleteSkills = "DELETE FROM skills WHERE user_id = ?";
        $stmtDeleteSkills = $conn->prepare($sqlDeleteSkills);
        $stmtDeleteSkills->bind_param("i", $user_id);
        $stmtDeleteSkills->execute();

        // Menyimpan keterampilan yang baru
        foreach ($_POST['skill_name'] as $skill_name) {
            $skill_name = sanitize($skill_name, $conn);

            $sqlSkill = "INSERT INTO skills (user_id, skill_name) VALUES (?, ?)";
            $stmtSkill = $conn->prepare($sqlSkill);
            if (!$stmtSkill) {
                throw new Exception("Prepare statement gagal untuk keterampilan: " . $conn->error);
            }

            $stmtSkill->bind_param("is", $user_id, $skill_name);
            if (!$stmtSkill->execute()) {
                throw new Exception("Gagal menyimpan keterampilan: " . $stmtSkill->error);
            }
        }
    }

    // Jika berhasil, arahkan ke halaman lain
    header("Location: https://mybahana.com/register_data.php");
    exit;

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
    exit();
} finally {
    $conn->close();
}
?>
