<?php
// Tampilkan error untuk debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include koneksi database
require_once 'database/connection.php';
include 'header.php';

// Ambil ID dari URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    die("ID tidak valid.");
}

// Ambil data dari database berdasarkan ID
$sql = "SELECT * FROM cpmi_data WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

// Periksa apakah data ditemukan
if ($result->num_rows === 0) {
    die("Data tidak ditemukan.");
}

// Ambil data dari hasil query
$data = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Data CPMI</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: 40px auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            color: #4a90e2;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 5px;
            color: #555;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 10px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 5px;
            transition: all 0.3s ease;
            background-color: #f9fafb;
        }

        .form-group input:focus,
        .form-group select:focus {
            border-color: #4a90e2;
            box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
            outline: none;
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #4a90e2;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        button:hover {
            background-color: #357abd;
        }

        .hidden {
            display: none;
        }

        .form-inline {
            display: flex;
            gap: 10px;
        }

        @media (max-width: 768px) {
            .form-inline {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Edit Data CPMI</h1>
        <form action="update.php" method="POST">
            <!-- ID (Hidden) -->
            <input type="hidden" name="id" value="<?php echo $data['id']; ?>">

            <!-- No Pengajuan Legalisir -->
            <div class="form-group">
                <label for="no_pengajuan_legalisir">No Pengajuan Legalisir</label>
                <input type="text" id="no_pengajuan_legalisir" name="no_pengajuan_legalisir" value="<?php echo $data['no_pengajuan_legalisir'] ?? '-'; ?>">
            </div>

            <!-- ID PMI -->
            <div class="form-group">
                <label for="id_pmi">ID PMI</label>
                <input type="text" id="id_pmi" name="id_pmi" value="<?php echo $data['id_pmi']; ?>" maxlength="50">
            </div>

            <!-- Nama -->
            <div class="form-group">
                <label for="nama">Nama</label>
                <input type="text" id="nama" name="nama" value="<?php echo $data['nama_cpm']; ?>">
            </div>

            <!-- Jenis Kelamin -->
            <div class="form-group">
                <label>Jenis Kelamin</label>
                <div class="form-inline">
                    <label><input type="radio" name="jenis_kelamin" value="L" <?php echo ($data['jenis_kelamin'] === 'L') ? 'checked' : ''; ?>> Laki-laki</label>
                    <label><input type="radio" name="jenis_kelamin" value="P" <?php echo ($data['jenis_kelamin'] === 'P') ? 'checked' : ''; ?>> Perempuan</label>
                </div>
            </div>

            <!-- Negara Tujuan -->
            <div class="form-group">
                <label for="negara_tujuan">Negara Tujuan</label>
                <select id="negara_tujuan" name="negara_tujuan">
                    <option value="Taiwan" <?php echo ($data['negara_tujuan'] === 'Taiwan') ? 'selected' : ''; ?>>Taiwan</option>
                    <option value="Hongkong" <?php echo ($data['negara_tujuan'] === 'Hongkong') ? 'selected' : ''; ?>>Hongkong</option>
                    <option value="Dominika" <?php echo ($data['negara_tujuan'] === 'Dominika') ? 'selected' : ''; ?>>Dominika</option>
                    <option value="Malaysia" <?php echo ($data['negara_tujuan'] === 'Malaysia') ? 'selected' : ''; ?>>Malaysia</option>
                    <option value="Jepang" <?php echo ($data['negara_tujuan'] === 'Jepang') ? 'selected' : ''; ?>>Jepang</option>
                    <option value="Korea" <?php echo ($data['negara_tujuan'] === 'Korea') ? 'selected' : ''; ?>>Korea</option>
                    <option value="Aljazair" <?php echo ($data['negara_tujuan'] === 'Aljazair') ? 'selected' : ''; ?>>Aljazair</option>
                
                </select>
            </div>

            <!-- Sektor -->
            <div class="form-group">
                <label for="sektor">Sektor</label>
                <select id="sektor" name="sektor" onchange="handleSectorChange(this)">
                    <option value="Formal" <?php echo ($data['sektor'] === 'Formal') ? 'selected' : ''; ?>>Formal</option>
                    <option value="Informal" <?php echo ($data['sektor'] === 'Informal') ? 'selected' : ''; ?>>Informal</option>
                    <option value="Lainnya" <?php echo ($data['sektor'] !== 'Formal' && $data['sektor'] !== 'Informal') ? 'selected' : ''; ?>>Lainnya</option>
                </select>
            </div>
            <div class="form-group <?php echo ($data['sektor'] !== 'Formal' && $data['sektor'] !== 'Informal') ? '' : 'hidden'; ?>" id="custom_sector_group">
                <label for="custom_sector">Keterangan Sektor</label>
                <input type="text" id="custom_sector" name="custom_sector" value="<?php echo ($data['sektor'] !== 'Formal' && $data['sektor'] !== 'Informal') ? $data['sektor'] : ''; ?>">
            </div>

         <div class="form-group">
    <label for="jabatan" class="block mb-1 font-medium">Jabatan</label>
    <select id="jabatan" name="jabatan" required class="w-full border border-gray-300 rounded px-3 py-2">
        <option value="">-- Pilih Jabatan --</option>
        <option value="Worker" <?php if ($data['jabatan'] == 'Worker') echo 'selected'; ?>>Worker</option>
        <option value="Caregiver" <?php if ($data['jabatan'] == 'Caregiver') echo 'selected'; ?>>Caregiver</option>
        <option value="Construction Worker" <?php if ($data['jabatan'] == 'Construction Worker') echo 'selected'; ?>>Construction Worker</option>
        <option value="Peternakan" <?php if ($data['jabatan'] == 'Peternakan') echo 'selected'; ?>>Peternakan</option>
        <option value="Pertanian" <?php if ($data['jabatan'] == 'Pertanian') echo 'selected'; ?>>Pertanian</option>
        <option value="Nursing Home" <?php if ($data['jabatan'] == 'Nursing Home') echo 'selected'; ?>>Nursing Home</option>
        <option value="Akuakultur" <?php if ($data['jabatan'] == 'Akuakultur') echo 'selected'; ?>>Akuakultur</option>
    </select>
</div>


            <!-- No Paspor -->
            <div class="form-group">
                <label for="no_paspor">No Paspor</label>
                <input type="text" id="no_paspor" name="no_paspor" value="<?php echo $data['no_paspor']; ?>">
            </div>

            <!-- No Medical -->
            <div class="form-group">
                <label for="no_medical">Nama Medical</label>
                <input type="text" id="no_medical" name="no_medical" value="<?php echo $data['no_medical']; ?>">
            </div>

            <!-- No Visa -->
            <div class="form-group">
                <label for="no_visa">No Visa</label>
                <input type="text" id="no_visa" name="no_visa" value="<?php echo $data['visa']; ?>">
            </div>

            <!-- Tipe Pembayaran -->
            <div class="form-group">
                <label for="tipe_pembayaran">Tipe Pembayaran</label>
                <select id="tipe_pembayaran" name="tipe_pembayaran">
                    <option value="Setor Tunai" <?php echo ($data['tipe_pembayaran'] === 'Setor Tunai') ? 'selected' : ''; ?>>Setor Tunai</option>
                    <option value="Transfer" <?php echo ($data['tipe_pembayaran'] === 'Transfer') ? 'selected' : ''; ?>>Transfer</option>
                </select>
            </div>

            <!-- Tanggal Sertifikat -->
            <div class="form-group">
                <label for="tanggal_sertifikat">Tanggal Sertifikat</label>
                <input type="date" id="tanggal_sertifikat" name="tanggal_sertifikat" value="<?php echo $data['tanggal_sertifikat']; ?>">
            </div>

            <!-- Tanggal Pengajuan Legalisir -->
            <div class="form-group">
                <label for="tanggal_legalisir">Tanggal Pengajuan Legalisir</label>
                <input type="date" id="tanggal_legalisir" name="tanggal_legalisir" value="<?php echo $data['tanggal_legalisir']; ?>">
            </div>

            <!-- Submit Button -->
            <button type="submit">Simpan Perubahan</button>
        </form>
    </div>

    <script>
        function handleSectorChange(select) {
            const customSectorGroup = document.getElementById('custom_sector_group');
            if (select.value === 'Lainnya') {
                customSectorGroup.classList.remove('hidden');
                document.getElementById('custom_sector').required = true;
            } else {
                customSectorGroup.classList.add('hidden');
                document.getElementById('custom_sector').required = false;
                document.getElementById('custom_sector').value = '';
            }
        }
    </script>
</body>
</html>
