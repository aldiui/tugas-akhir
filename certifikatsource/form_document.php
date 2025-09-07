<?php
// Include header (jika diperlukan)
include 'header.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Data CPMI</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        /* Global Styles */
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

        .form-inline {
            display: flex;
            gap: 15px;
        }

        .form-inline label {
            display: inline-block;
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

        /* Hidden input field for manual sector entry */
        .hidden {
            display: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .form-inline {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Form Data CPMI</h1>
        <form action="processing_document.php" method="POST">
            <!-- ID PMI -->
            <div class="form-group">
                <label for="id_pmi">ID PMI</label>
                <input type="text" id="id_pmi" name="id_pmi" placeholder="Masukkan ID PMI" maxlength="50" required>
            </div>

            <!-- Nama -->
            <div class="form-group">
                <label for="nama">Nama</label>
                <input type="text" id="nama" name="nama" placeholder="Masukkan Nama" required>
            </div>

            <!-- Jenis Kelamin -->
            <div class="form-group">
                <label>Jenis Kelamin</label>
                <div class="form-inline">
                    <label><input type="radio" name="jenis_kelamin" value="L" required> Laki-laki</label>
                    <label><input type="radio" name="jenis_kelamin" value="P"> Perempuan</label>
                </div>
            </div>

            <!-- Negara Tujuan -->
            <div class="form-group">
                <label for="negara_tujuan">Negara Tujuan</label>
                <select id="negara_tujuan" name="negara_tujuan" required>
                   <option value="">-- Pilih Negara Tujuan --</option>
<option value="Taiwan">Taiwan</option>
<option value="Hongkong">Hongkong</option>
<option value="Dominika">Dominika</option>
<option value="Malaysia">Malaysia</option>
<option value="Jepang">Jepang</option>
<option value="Korea">Korea</option>
<option value="Aljazair">Aljazair</option>
                </select>
            </div>

            <!-- Sektor -->
            <div class="form-group">
                <label for="sektor">Sektor</label>
                <select id="sektor" name="sektor" onchange="handleSectorChange(this)" required>
                    <option value="Formal">Formal</option>
                    <option value="Informal">Informal</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
            </div>
            <div class="form-group hidden" id="custom_sector_group">
                <label for="custom_sector">Keterangan Sektor</label>
                <input type="text" id="custom_sector" name="custom_sector" placeholder="Masukkan Keterangan Sektor">
            </div>

            <!-- Jabatan -->
            <div class="form-group">
            <select id="jabatan" name="jabatan" required>
                        <option value="">-- Pilih Jabatan --</option>
                        <option value="Worker">Worker</option>
                        <option value="Caregiver">Caregiver</option>
                        <option value="Construction Worker">Construction Worker</option>
                        <option value="Peternakan">Peternakan</option>
                        <option value="Pertanian">Pertanian</option>
                        <option value="Nursing Home">Nursing Home</option>
                        <option value="Akuakultur">Akuakultur</option>
                    </select>
            </div>

            <!-- No Paspor -->
            <div class="form-group">
                <label for="no_paspor">No Paspor</label>
                <input type="text" id="no_paspor" name="no_paspor" placeholder="Masukkan No Paspor" pattern="[A-Z0-9]+" title="Hanya huruf besar dan angka" required>
            </div>

            <!-- No Medical -->
            <div class="form-group">
                <label for="no_medical">Nama Medical</label>
                <input type="text" id="no_medical" name="no_medical" placeholder="Masukkan Nama Medical" maxlength="40" required>
            </div>

            <!-- No Visa -->
            <div class="form-group">
                <label for="no_visa">No Visa</label>
                <input type="text" id="no_visa" name="no_visa" placeholder="Masukkan No Visa" maxlength="20" required>
            </div>

            <!-- Type Pembayaran -->
            <div class="form-group">
                <label for="tipe_pembayaran">Type Pembayaran</label>
                <select id="tipe_pembayaran" name="tipe_pembayaran" required>
                    <option value="">-- Pilih Type Pembayaran --</option>
                    <option value="Setor Tunai">Setor Tunai</option>
                    <option value="Transfer">Transfer</option>
                </select>
            </div>

            <!-- Tanggal Sertifikat -->
            <div class="form-group">
                <label for="tanggal_sertifikat">Tanggal Sertifikat</label>
                <input type="date" id="tanggal_sertifikat" name="tanggal_sertifikat" required>
            </div>

            <!-- Tanggal Pengajuan Legalisir -->
            <div class="form-group">
                <label for="tanggal_legalisir">Tanggal Pengajuan Legalisir</label>
                <input type="date" id="tanggal_legalisir" name="tanggal_legalisir" required>
            </div>
            <!-- No Pengajuan Legalisir -->
<div class="form-group">
    <label for="no_pengajuan_legalisir">No Pengajuan Legalisir</label>
    <input type="number" id="no_pengajuan_legalisir" name="no_pengajuan_legalisir" placeholder="Contoh: 000" min="0" max="999" required>
</div>

            <!-- Tanggal Pernyataan -->
            <div class="form-group">
                <label for="tanggal_pernyataan">Tanggal Pernyataan</label>
                <input type="date" id="tanggal_pernyataan" name="tanggal_pernyataan" required>
            </div>

            <!-- Submit Button -->
            <button type="submit">Simpan Data</button>
        </form>
    </div>

    <script>
        // Handle Sector Change
        function handleSectorChange(select) {
            const customSectorGroup = document.getElementById('custom_sector_group');
            if (select.value === 'Lainnya') {
                customSectorGroup.classList.remove('hidden');
                document.getElementById('custom_sector').required = true;
            } else {
                customSectorGroup.classList.add('hidden');
                document.getElementById('custom_sector').value = '';
                document.getElementById('custom_sector').required = false;
            }
        }
    </script>
</body>
</html>
