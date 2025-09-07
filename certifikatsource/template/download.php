<?php
// Include koneksi database
require_once '../database/connection.php';

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

    // Format tanggal lahir menjadi '12 Jan 1995'
    $formattedBirthDate = date('d M Y', strtotime($user['birth_date']));
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
    <title>Biodata - <?php echo $user['name']; ?></title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

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
            padding: 10px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        .header-container {
            display: flex;
            align-items: center;
            justify-content: flex-start; /* Memulai dari kiri */
            margin-bottom: 0px;
            padding: 2px 0; /* Jarak dalam tanpa border */
        }
        .header-logo {
            width: 160px; /* Ukuran logo */
            height: auto;
            margin-left: 130px; /* Geser logo lebih ke kanan */
        }
        .header-text {
            flex: 1;
            margin-left: -140px; /* Jarak tambahan untuk teks dari logo */
            text-align: center;
        }
        .header-text h1 {
            font-size: 18px;
            margin: 0;
            font-weight: bold;
            text-align: center;
        }
        .header-container1 p {
            font-size: 10px;
            margin: 2px 0 0 0;
            font-weight: normal;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0px; /* Jarak antara teks dan garis */
        }
        .header-text h2 {
            font-size: 18px;
            margin: 2px 0 0 0;
            font-weight: normal;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px; /* Jarak antara teks dan garis */
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .section {
            width: 100%;
            margin-bottom: 10px;
        }
        .section h2 {
            text-align: center; /* Menjaga title tetap di tengah */
            color: #007bff;
            font-size: 14px;
            padding: 0px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        td, th {
            padding-left: 12px;
            padding-right: 12px;
            padding-top: 2px;
            padding-bottom: 2px;
            border: 1px solid #ddd;
            font-size: 12px;
        }
        th {
            text-align: left;
            background-color: #f1f1f1;
            padding: 2px;
            font-size: 12px;
        }
        .profile-img {
            width: 100%;;
            height: 180px;
            object-fit: cover;
            padding-bottom: 0px;
        }
        .sticky-bottom {
    position: fixed;
    left: 0; /* Menempatkan elemen di sisi kiri */
    top: 50%; /* Menempatkan elemen di tengah secara vertikal */
    transform: translateY(-50%); /* Menyelaraskan elemen secara vertikal */
    z-index: 9999; /* Menjadikan elemen berada di atas elemen lain */
    background-color: #007bff; /* Warna latar belakang untuk section sticky */
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.action-buttons {
    display: flex;
    flex-direction: column; /* Menata tombol secara vertikal */
    gap: 20px; /* Jarak antar tombol */
    align-items: center; /* Mengatur posisi tombol di tengah */
}

.action-btn {
    background-color: #fff;
    color: #007bff;
    border: 2px solid #007bff;
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px; /* Ukuran tombol */
    height: 50px; /* Ukuran tombol */
    transition: all 0.3s ease;
}

.action-btn:hover {
    background-color: #007bff;
    color: white;
    transform: translateY(-2px); /* Efek mengangkat tombol saat dihover */
}

.action-btn i {
    font-size: 24px;
}

/* Tooltip */
.action-btn[title]:hover::after {
    content: attr(title); /* Mengambil teks dari atribut title */
    position: absolute;
    bottom: 60px; /* Menampilkan tooltip di atas tombol */
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
}
    @media print {
    body {
        margin: 0;  /* Menghapus margin di sekitar halaman */
        padding: 0;  /* Menghapus padding di sekitar halaman */
    }

    .container {
        margin: 0;  /* Menghapus margin pada container */
        padding: 5px;  /* Menambahkan sedikit padding jika diperlukan */
    }

    .section {
        margin-bottom: 10px; /* Mengurangi margin pada section */
        padding: 5px; /* Mengurangi padding */
    }

    table {
        width: 100%;
        border-collapse: collapse; /* Mengatur agar tabel tidak ada jarak antar elemen */
        margin: 0; /* Menghapus margin pada tabel */
    }

    td, th {
        padding: 5px; /* Mengurangi padding pada tabel */
    }

    /* Gambar profil juga disesuaikan agar tidak terpotong */
    .profile-img {
        width: 140px;
        height: 250px;
        object-fit: cover;
    }


}


    </style>
</head>
<body>

<div class="container" id="cv-container"> <!-- Add cv-container ID -->
   <!-- Header -->
   <div class="header-container">
            <!-- Logo -->
            <img src="https://mybahana.com/uploads/logobmp.png" alt="Logo" class="header-logo">

            <!-- Text -->
            <div class="header-text">
                <h1>PT. BAHANA MEGA PRESTASI</h1>
                <h2>茂宏國際人力有限公司<h2>
            </div>
        </div>
        <div class="header-container1">
        <p>JL. RAYA KODAU NO. 42, JATIMEKAR KOTA BEKASI, INDONESIA, PHONE: (62-21) 8497 8899 | FAX: (62-21) 8497 5589</p>
        <p>Email: bahana_bmp@yahoo.co.id | Skype: bahana_bmp</p>
        <p style="border-top: 1px solid black;"></p>
        <p style="border-top: 3px solid black;"></p>

    </div>
    <!-- Profil dan Informasi Pribadi -->
    <div class="section">
        <h2>基本資料 BIODATA</h2>
        <table style="width: 98%; border-spacing: 5px;">
            <tr>
                <!-- Foto Profil -->
                <td style="width: 140px; text-align: center; vertical-align: top; padding-top: 5px;">
                    <img src="https://mybahana.com/uploads/photos/<?php echo htmlspecialchars($user['photo']); ?>" alt="Foto Profil" class="profile-img">
                </td>
                <!-- Informasi Pribadi -->
                <td style="vertical-align: top;">
                    <table style="width: 100%; border-spacing: 5px; ">
                        <tr>
                            <td style="border: 0px;"><strong>姓名 Name</strong></td>
                            <td style="border: 0px;">: <?php echo htmlspecialchars($user['name']); ?></td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>出生日期 Date of Birth</strong></td>
                        <td style="border: 0px;">: <?php echo $formattedBirthDate; ?></td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>年齡 Age</strong></td>
                        <td style="border: 0px;">: <?php echo htmlspecialchars($user['age']); ?> 年</td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>性別 Gender</strong></td>
                        <td style="border: 0px;">: <?php echo htmlspecialchars($user['gender']); ?></td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>電話號碼 Phone Number</strong></td>
                        <td style="border: 0px;">: <?php echo htmlspecialchars($user['phone']); ?></td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>電子郵件 Email</strong></td>
                        <td style="border: 0px;">: <?php echo htmlspecialchars($user['email'] ?: '無 None'); ?></td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>地址 Address</strong></td>
                        <td style="border: 0px;">: <?php echo nl2br(htmlspecialchars($user['address'])); ?></td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>省份 Province</strong></td>
                        <td style="border: 0px;">: <?php echo htmlspecialchars($user['province']); ?></td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>派遣國家 Country of Deployment</strong></td>
                        <td style="border: 0px;">: <?php echo htmlspecialchars($user['placement_country']); ?></td>
                        </tr>
                        <tr>
                        <td style="border: 0px;"><strong>最高學歷 Last Education</strong></td>
                        <td style="border: 0px;">: <?php echo htmlspecialchars($user['education']); ?></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

    <!-- Pengalaman Kerja -->
    <div class="section">
        <h2>工作經驗 WORK EXPERIENCE</h2>
        <table style="width: 98%; border-spacing: 5px;">
            <thead>
                <tr>
                <th style="width: 5%; text-align: left;">No</th> <!-- Kolom No lebih sempit -->
                    <th style="text-align: center;">年份 Year</th>
                    <th>工作描述 Job Description</th>
                    <th>國家 Country</th>
                </tr>
            </thead>
            <tbody>
                <?php $no = 1; ?>
                <?php while ($workExperience = $workExperienceResult->fetch_assoc()) { ?>
                    <tr>
                        <td><?php echo $no++; ?></td>
                        <td><?php echo htmlspecialchars($workExperience['work_from']) . ' - ' . htmlspecialchars($workExperience['work_to']); ?></td>
                        <td><?php echo nl2br(htmlspecialchars($workExperience['work_description'])); ?></td>
                        <td><?php echo htmlspecialchars($workExperience['work_country']); ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

    <!-- Keterampilan -->
    <div class="section">
    <h2>技能 SKILLS</h2>
    <table style="width: 98%; border-spacing: 5px; border-collapse: collapse;">
        <thead>
            <tr>
                <th style="width: 5%; text-align: left;">No</th> <!-- Kolom No lebih sempit -->
                <th colspan="6" style="text-align: center;">技能名稱 Keahlian</th> <!-- Kolom Keahlian di tengah -->
            </tr>
        </thead>
        <tbody>
            <?php $no = 1; ?>
            <?php while ($skill = $skillsResult->fetch_assoc()) { ?>
                <tr>
                    <td style="width: 5%; text-align: left;"><?php echo $no++; ?></td> <!-- Kolom No lebih sempit -->
                    <td><?php echo htmlspecialchars($skill['skill_name']); ?></td> <!-- Kolom Keahlian -->
                </tr>
            <?php } ?>
        </tbody>
    </table>
</div>

    <div class="section">
   <!-- Interview Section -->
<!-- Interview Section -->
<div class="section">
    <!-- Tabel Interview dengan Kolom yang Dimerge -->
    <table style="width: 98%; border-spacing: 5px;">
        <thead>
            <tr>
                <th colspan="7" style="text-align: center;">採訪 INTERVIEW</th> <!-- Menggabungkan 7 kolom -->
            </tr>
            <tr>
                <th colspan="4" style="text-align: center;">評分 Penilaian</th>
                <th>題目 Pertanyaan</th>
                <th>有 Y</th>
                <th>沒 N</th>
            </tr>
        </thead>
        <tbody>
            <!-- Row untuk Mandarin -->
            <tr>
                <td>中文 Mandarin</td>
                <td class="empty">  </td> <!-- Kolom kosong dengan jarak -->
                <td>態度 Sifat/Sikap</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>Apakah takut anjing?</td>
                <td></td> <!-- Kolom Y kosong -->
                <td></td> <!-- Kolom N kosong -->
            </tr>
            <!-- Row untuk English -->
            <tr>
                <td>英文 English</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>體力 Kekuatan</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>Apakah makan babi?</td>
                <td></td> <!-- Kolom Y kosong -->
                <td></td> <!-- Kolom N kosong -->
            </tr>
            <!-- Row untuk Taiwan -->
            <tr>
                <td>台語 Taiwan</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>動作 Kecepatan</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>Apakah siap mengurus kakek?</td>
                <td></td> <!-- Kolom Y kosong -->
                <td></td> <!-- Kolom N kosong -->
            </tr>
            <!-- Row untuk Majikan Lama -->
            <tr>
                <td>原本老闆 Majikan lama</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>智慧 Kepintaran</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>Apakah siap bekerja di tempat lain?</td>
                <td></td> <!-- Kolom Y kosong -->
                <td></td> <!-- Kolom N kosong -->
            </tr>
            <!-- Row untuk Telp Majikan -->
            <tr>
                <td>原老闆的電話 Telp. Majikan</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>禮貌 Etika</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>Apakah ingin libur?</td>
                <td></td> <!-- Kolom Y kosong -->
                <td></td> <!-- Kolom N kosong -->
            </tr>
            <!-- Row untuk Alamat -->
            <tr>
                <td>地址 Alamat</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>體檢 MCU</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>Apakah tidak cerewet?</td>
                <td></td> <!-- Kolom Y kosong -->
                <td></td> <!-- Kolom N kosong -->
            </tr>
            <!-- Row untuk Proses Durasi -->
            <tr>
                <td>按指紋 Proses durasi</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>護照 Passport</td>
                <td class="empty"></td> <!-- Kolom kosong dengan jarak -->
                <td>Apakah tidak menggunakan HP?</td>
                <td></td> <!-- Kolom Y kosong -->
                <td></td> <!-- Kolom N kosong -->
            </tr>
        </tbody>
    </table>
    <!-- Penilaian Section -->
<div class="section">
    <!-- Tabel Penilaian -->
    <table style="width: 98%; border-spacing: 5px;">
        <thead>
            <tr>
                <th colspan="7" style="text-align: center;">評估項目 PENILAIAN</th> <!-- Menggabungkan 7 kolom untuk judul -->
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="7" style="text-align: center; padding: 50px;"></td> <!-- Kolom untuk teks penilaian kosong -->
            </tr>
            <tr style="border: 1px solid #ddd; ">
                <!-- Kolom untuk Yang Menyatakan, Yang Membuat, Mengetahui dengan alignment berbeda -->
                <td style="text-align: left; border: 0; padding-bottom: 70px; padding-top: 10px;">Yang Menyatakan,</td> <!-- Kiri -->
                <td style="text-align: left; border: 0; padding-bottom: 70px; padding-top: 10px;">Yang Membuat,</td> <!-- Tengah -->
                <td style="text-align: center; border: 0; padding-bottom: 70px; padding-top: 10px;">Mengetahui,</td> <!-- Kanan -->
            </tr>
        </tbody>
    </table>
</div>
</div>
<div class="sticky-bottom">
<div class="action-buttons">
    <!-- Tombol Edit -->
    <button id="edit-btn" class="action-btn" title="Edit" onclick="window.location.href='https://mybahana.com/cpmi_edit.php?id=<?php echo $user['user_id']; ?>'">
        <i class="fas fa-edit"></i>
    </button>
</div>



        <button id="delete-btn" class="action-btn" title="Delete">
            <i class="fas fa-trash"></i>
        </button>

        <button id="download-btn" class="action-btn" title="Download PDF" data-filename="Biodata-<?php echo $user['name']; ?>.pdf">
            <i class="fas fa-download"></i>
        </button>
    </div>
</div>


<script>
    function downloadPDF() {
        // Menyembunyikan sticky bottom sebelum ekspor
        const stickyBottom = document.querySelector('.sticky-bottom');
        stickyBottom.style.display = 'none';

        const element = document.getElementById('cv-container');
        const filename = document.getElementById('download-btn').dataset.filename || 'CV.pdf';

        const options = {
            margin: [0.1, 0.1, 0.1, 0.1],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Menggunakan html2pdf untuk mengonversi HTML ke PDF
        html2pdf().set(options).from(element).save().then(() => {
            // Setelah ekspor selesai, tampilkan kembali sticky bottom
            stickyBottom.style.display = 'block';
        });
    }

    document.getElementById('download-btn').addEventListener('click', (e) => {
        e.preventDefault();
        downloadPDF();
    });
</script>




</body>
</html>
