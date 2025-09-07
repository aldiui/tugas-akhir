<?php
// Include koneksi database
require_once 'connection.php';

try {
    // Buat tabel cpmi_register dengan tambahan kolom 'education'
    $sqlCpmiRegister = "CREATE TABLE cpmi_register (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        birth_date DATE NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(10) NOT NULL,
        job VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100),
        address TEXT NOT NULL,
        province VARCHAR(50) NOT NULL,
        placement_country VARCHAR(50) NOT NULL,
        selection_status VARCHAR(50) DEFAULT 'Belum Seleksi',
        photo VARCHAR(255) NOT NULL,
        education VARCHAR(50) NOT NULL  -- Kolom pendidikan yang baru
    );";
    if ($conn->query($sqlCpmiRegister) === TRUE) {
        echo "Tabel 'cpmi_register' berhasil dibuat.<br>";
    } else {
        throw new Exception("Gagal membuat tabel 'cpmi_register': " . $conn->error);
    }

    // Buat tabel work_experience
    $sqlWorkExperience = "CREATE TABLE work_experience (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        work_from YEAR NOT NULL,
        work_to YEAR NOT NULL,
        work_description TEXT NOT NULL,
        work_country VARCHAR(100) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES cpmi_register(user_id) ON DELETE CASCADE
    );";
    if ($conn->query($sqlWorkExperience) === TRUE) {
        echo "Tabel 'work_experience' berhasil dibuat.<br>";
    } else {
        throw new Exception("Gagal membuat tabel 'work_experience': " . $conn->error);
    }

    // Buat tabel skills
    $sqlSkills = "CREATE TABLE skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        skill_name VARCHAR(100) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES cpmi_register(user_id) ON DELETE CASCADE
    );";
    if ($conn->query($sqlSkills) === TRUE) {
        echo "Tabel 'skills' berhasil dibuat.<br>";
    } else {
        throw new Exception("Gagal membuat tabel 'skills': " . $conn->error);
    }

    // Menutup koneksi
    $conn->close();
} catch (Exception $e) {
    echo "Terjadi kesalahan: " . $e->getMessage();
}
?>
