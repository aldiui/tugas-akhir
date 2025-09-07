<?php
// Include header
include 'header.php';
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

    // Query untuk mengambil data pengguna dari tabel cpmi_register
    $sql = "SELECT * FROM cpmi_register WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        throw new Exception("Pengguna tidak ditemukan.");
    }

    // Query untuk mengambil pengalaman kerja pengguna
    $sqlWorkExperience = "SELECT * FROM work_experience WHERE user_id = ?";
    $stmt = $conn->prepare($sqlWorkExperience);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $workExperienceResult = $stmt->get_result();

    // Query untuk mengambil keterampilan pengguna
    $sqlSkills = "SELECT * FROM skills WHERE user_id = ?";
    $stmt = $conn->prepare($sqlSkills);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $skillsResult = $stmt->get_result();

    // Menutup koneksi
    $stmt->close();

} catch (Exception $e) {
    echo "Terjadi kesalahan: " . $e->getMessage();
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit CPMI - <?php echo htmlspecialchars($user['name']); ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 800px;
            margin: 0px auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        h1, h2 {
            text-align: center;
            color: #007bff;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            font-weight: bold;
        }
        input, select, textarea {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
        }
        button:hover {
            background-color: #0056b3;
        }
        .section {
            margin-bottom: 20px;
        }
        .profile-img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
        }
        .file-input {
            padding: 5px;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Edit Biodata CPMI - <?php echo htmlspecialchars($user['name']); ?></h1>

    <form method="POST" action="cpmi_update.php?id=<?php echo $user['user_id']; ?>" enctype="multipart/form-data">
        <!-- Personal Information -->
        <div class="section">
            <h2>Informasi Pribadi</h2>
            <div class="form-group">
                <label for="name">Nama Lengkap</label>
                <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($user['name']); ?>" required>
            </div>
            <div class="form-group">
                <label for="birth_date">Tanggal Lahir</label>
                <input type="date" id="birth_date" name="birth_date" value="<?php echo htmlspecialchars($user['birth_date']); ?>" required>
            </div>
            <div class="form-group">
                <label for="age">Usia</label>
                <input type="number" id="age" name="age" value="<?php echo htmlspecialchars($user['age']); ?>" required>
            </div>
            <div class="form-group">
                <label for="gender">Jenis Kelamin</label>
                <select id="gender" name="gender" required>
                    <option value="Laki-laki" <?php echo ($user['gender'] == 'Laki-laki') ? 'selected' : ''; ?>>Laki-laki</option>
                    <option value="Perempuan" <?php echo ($user['gender'] == 'Perempuan') ? 'selected' : ''; ?>>Perempuan</option>
                </select>
            </div>
            <div class="form-group">
                <label for="phone">Nomor Telepon</label>
                <input type="text" id="phone" name="phone" value="<?php echo htmlspecialchars($user['phone']); ?>" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>">
            </div>
            <div class="form-group">
                <label for="address">Alamat</label>
                <textarea id="address" name="address" rows="4" required><?php echo htmlspecialchars($user['address']); ?></textarea>
            </div>
            <div class="form-group">
                <label for="province">Provinsi</label>
                <input type="text" id="province" name="province" value="<?php echo htmlspecialchars($user['province']); ?>" required>
            </div>
            <div class="form-group">
                <label for="education">Pendidikan Terakhir</label>
                <input type="text" id="education" name="education" value="<?php echo htmlspecialchars($user['education']); ?>" required>
            </div>
        </div>

        <!-- Profile Picture -->
        <div class="section">
            <h2>Foto Profil</h2>
            <div class="form-group">
                <img src="uploads/photos/<?php echo htmlspecialchars($user['photo']); ?>" alt="Foto Profil" class="profile-img">
                <br>
                <label for="photo">Ganti Foto Profil</label>
                <input type="file" id="photo" name="photo" class="file-input">
            </div>
        </div>

        <!-- Work Experience -->
        <div class="section">
            <h2>Pengalaman Kerja</h2>
            <?php while ($workExperience = $workExperienceResult->fetch_assoc()) { ?>
                <div class="form-group">
                    <label for="work_from_<?php echo $workExperience['id']; ?>">Tahun Dari</label>
                    <input type="text" id="work_from_<?php echo $workExperience['id']; ?>" name="work_from[]" value="<?php echo htmlspecialchars($workExperience['work_from']); ?>" required>
                </div>
                <div class="form-group">
                    <label for="work_to_<?php echo $workExperience['id']; ?>">Tahun Selesai</label>
                    <input type="text" id="work_to_<?php echo $workExperience['id']; ?>" name="work_to[]" value="<?php echo htmlspecialchars($workExperience['work_to']); ?>" required>
                </div>
                <div class="form-group">
                    <label for="work_description_<?php echo $workExperience['id']; ?>">Deskripsi Pekerjaan</label>
                    <textarea id="work_description_<?php echo $workExperience['id']; ?>" name="work_description[]" rows="4" required><?php echo htmlspecialchars($workExperience['work_description']); ?></textarea>
                </div>
                <div class="form-group">
                    <label for="work_country_<?php echo $workExperience['id']; ?>">Negara</label>
                    <input type="text" id="work_country_<?php echo $workExperience['id']; ?>" name="work_country[]" value="<?php echo htmlspecialchars($workExperience['work_country']); ?>" required>
                </div>
            <?php } ?>
        </div>

        <!-- Skills -->
        <div class="section">
            <h2>Keterampilan</h2>
            <?php while ($skill = $skillsResult->fetch_assoc()) { ?>
                <div class="form-group">
                    <label for="skill_name_<?php echo $skill['id']; ?>">Skill</label>
                    <input type="text" id="skill_name_<?php echo $skill['id']; ?>" name="skill_name[]" value="<?php echo htmlspecialchars($skill['skill_name']); ?>" required>
                </div>
            <?php } ?>
        </div>

        <!-- Submit Button -->
        <div class="form-group">
            <button type="submit">Simpan Perubahan</button>
        </div>
    </form>
</div>

</body>
</html>
