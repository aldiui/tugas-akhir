<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seleksi Dominika</title>
    <style>
       /* General Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}

body {
    background-color: #f4f7fc;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    padding: 30px;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 24px;
}

/* Form Steps */
.form-step {
    display: none;
}

.form-step.active {
    display: block;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    color: #555;
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 14px;
}

input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease-in-out;
}

input:focus, select:focus, textarea:focus {
    border-color: #007bff;
}

textarea {
    resize: vertical;
}

/* Button Styles */
button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
}

.add-btn {
    background-color: #28a745;
    margin-top: 10px;
}

.add-btn:hover {
    background-color: #218838;
}

/* Navigation Buttons */
.navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

#prevBtn, #nextBtn {
    width: 48%;
}

/* Step Header */
h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
}

/* Input Styles for File Upload and Date */
input[type="file"] {
    border: 1px solid #ddd;
    padding: 6px;
}

input[type="date"] {
    padding: 10px;
}

/* Dropdown Styles */
select {
    padding: 10px;
}

/* Form Group for Repeatable Fields */
.repeatable-field {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
}

.repeatable-field .form-group {
    margin-bottom: 15px;
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
    .container {
        padding: 20px;
    }

    h2 {
        font-size: 20px;
    }

    label {
        font-size: 12px;
    }

    input, select, textarea {
        font-size: 12px;
    }

    button {
        font-size: 14px;
    }

    .navigation-buttons {
        flex-direction: column;
    }

    #prevBtn, #nextBtn {
        width: 100%;
        margin-bottom: 10px;
    }
}

@media screen and (max-width: 480px) {
    h3 {
        font-size: 18px;
    }

    input, select, textarea {
        font-size: 12px;
    }
}

    </style>
</head>
<body>
    <div class="container">
        <h2>Registration</h2>
        <form id="multiStepForm" action="register_processing.php" method="POST" enctype="multipart/form-data">
          <!-- Step 1: Informasi Pribadi -->
            <div class="form-step active">
                <h3>Informasi Pribadi</h3>
                <div class="form-group">
                    <label for="name">Nama Lengkap</label>
                    <input type="text" id="name" name="name" placeholder="Masukkan nama lengkap" required>
                </div>
                <div class="form-group">
                    <label for="photo">Foto Profil</label>
                    <input type="file" id="photo" name="photo" accept="image/*" required>
                </div>
               <div class="form-group">
                    <label for="job">Job yang Dilamar</label>
                    <select id="job" name="job" required>
                        <option value="">-- Pilih --</option>
                        <option value="Operator Excavator">Operator Excavator</option>
                        <option value="Operator Dump Truck">Operator Dump Truck</option>
                        <option value="Operator Grader">Operator Grader</option>
                        <option value="Operator Roller">Operator Roller</option>
                        <option value="Operator Bulldozer">Operator Bulldozer</option>
                    </select>
                </div>
             <div class="form-group">
    <label for="birth_date">Tanggal Lahir</label>
    <input type="date" id="birth_date" name="birth_date" max="2005-12-31" required onchange="calculateAge()">
</div>
<div class="form-group">
    <label for="age">Usia</label>
    <input type="number" id="age" name="age" readonly>
</div>
              <div class="form-group" style="display: none;">
    <label for="placement_country">Negara Penempatan</label>
    <input type="text" id="placement_country" name="placement_country" value="Dominika" readonly>
</div>



                <div class="form-group">
                    <label for="gender">Jenis Kelamin</label>
                    <select id="gender" name="gender" required>
                        <option value="">-- Pilih --</option>
                        <option value="Laki-laki">Laki-laki</option>
                       
                    </select>
                </div>
                <div class="form-group">
                    <label for="phone">Nomor Telepon/WhatsApp</label>
                    <input type="text" id="phone" name="phone" placeholder="Contoh: +628123456789" required>
                </div>
                <div class="form-group">
                    <label for="email">Email (Opsional)</label>
                    <input type="email" id="email" name="email" placeholder="Masukkan email">
                </div>
              <div class="form-group">
    <label for="address">Alamat</label>
    <textarea id="address" name="address" rows="4" placeholder="Masukkan alamat lengkap" required></textarea>
</div>
              <div class="form-group">
    <label for="domisili">Domisili</label>
    <select id="domisili" name="province" required>
        <option value="" disabled selected>Pilih Provinsi</option>
        <option value="Aceh">Aceh</option>
        <option value="Bali">Bali</option>
        <option value="Banten">Banten</option>
        <option value="Bengkulu">Bengkulu</option>
        <option value="DI Yogyakarta">DI Yogyakarta</option>
        <option value="DKI Jakarta">DKI Jakarta</option>
        <option value="Gorontalo">Gorontalo</option>
        <option value="Jambi">Jambi</option>
        <option value="Jawa Barat">Jawa Barat</option>
        <option value="Jawa Tengah">Jawa Tengah</option>
        <option value="Jawa Timur">Jawa Timur</option>
        <option value="Kalimantan Barat">Kalimantan Barat</option>
        <option value="Kalimantan Selatan">Kalimantan Selatan</option>
        <option value="Kalimantan Tengah">Kalimantan Tengah</option>
        <option value="Kalimantan Timur">Kalimantan Timur</option>
        <option value="Kalimantan Utara">Kalimantan Utara</option>
        <option value="Kepulauan Bangka Belitung">Kepulauan Bangka Belitung</option>
        <option value="Kepulauan Riau">Kepulauan Riau</option>
        <option value="Lampung">Lampung</option>
        <option value="Maluku">Maluku</option>
        <option value="Maluku Utara">Maluku Utara</option>
        <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
        <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
        <option value="Papua">Papua</option>
        <option value="Papua Barat">Papua Barat</option>
        <option value="Papua Tengah">Papua Tengah</option>
        <option value="Papua Pegunungan">Papua Pegunungan</option>
        <option value="Papua Selatan">Papua Selatan</option>
        <option value="Papua Barat Daya">Papua Barat Daya</option>
        <option value="Riau">Riau</option>
        <option value="Sulawesi Barat">Sulawesi Barat</option>
        <option value="Sulawesi Selatan">Sulawesi Selatan</option>
        <option value="Sulawesi Tengah">Sulawesi Tengah</option>
        <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
        <option value="Sulawesi Utara">Sulawesi Utara</option>
        <option value="Sumatra Barat">Sumatra Barat</option>
        <option value="Sumatra Selatan">Sumatra Selatan</option>
        <option value="Sumatra Utara">Sumatra Utara</option>
    </select>
</div>

            </div>

            <!-- Step 2: Pendidikan -->
            <div class="form-step">
                <h3>Pendidikan</h3>
                <div class="form-group">
                    <label for="education">Jenjang Pendidikan Terakhir</label>
                    <select id="education" name="education" required>
                        <option value="">-- Pilih --</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="Diploma">Diploma</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                    </select>
                </div>
            </div>

            <!-- Step 4: Pengalaman Kerja -->
            <div class="form-step active">
                <h3>Pengalaman Kerja</h3>
                <div id="workExperienceContainer">
                    <!-- Field pertama yang ada secara default -->
                    <div class="repeatable-field">
                        <div class="form-group">
                            <label for="work_from[]">Dari</label>
                            <select name="work_from[]" class="year-dropdown" required></select>
                        </div>
                        <div class="form-group">
                            <label for="work_to[]">Sampai</label>
                            <select name="work_to[]" class="year-dropdown" required></select>
                        </div>
                        <div class="form-group">
                            <label for="work_description[]">Deskripsi Pekerjaan</label>
                            <textarea name="work_description[]" rows="3" placeholder="Tulis Detail Pekerjaan Kamu, apa yang kamu kerjakan" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="work_country[]">Negara</label>
                            <input type="text" name="work_country[]" placeholder="Negara" required>
                        </div>
                    </div>
                </div>
                <button type="button" class="add-btn" onclick="addWorkExperience()">Tambah Pengalaman Kerja</button>
            </div>
  
            <!-- Step 5: Skill -->
            <div class="form-step">
                <h3>Skill</h3>
                <div id="skillsContainer">
                    <div class="repeatable-field">
                        <div class="form-group">
                            <label>Nama Skill</label>
                            <input type="text" name="skill_name[]" placeholder="Baca Gambar Teknik, Menguasai teknik dasar konstruksi seperti pengecoran, pemasangan bata, plesteran, dan pengecatan." required>
                        </div>
                    </div>
                </div>
                <button type="button" class="add-btn" onclick="addSkill()">Tambah Skill</button>
            </div>

            <!-- Navigation Buttons -->
            <div class="navigation-buttons">
                <button type="button" id="prevBtn" onclick="nextPrev(-1)" disabled>Previous</button>
                <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
            </div>

            <!-- Status Seleksi (Hidden Field) -->
            <input type="hidden" name="selection_status" value="Belum Seleksi">
        </form>
    </div>

    <script>
    let currentStep = 0;
    const steps = document.querySelectorAll(".form-step");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Fungsi untuk menampilkan langkah tertentu dalam form
    function showStep(step) {
        steps.forEach((formStep, index) => {
            formStep.classList.toggle("active", index === step);
        });
        prevBtn.disabled = step === 0;
        nextBtn.textContent = step === steps.length - 1 ? "Submit" : "Next";
    }

    // Fungsi untuk berpindah langkah
    function nextPrev(n) {
        if (n === 1 && !validateForm()) return; // Validasi sebelum lanjut
        currentStep += n;
        if (currentStep >= steps.length) {
            document.getElementById("multiStepForm").submit(); // Submit form jika di langkah terakhir
            return;
        }
        showStep(currentStep);
    }

    // Validasi input pada langkah saat ini
    function validateForm() {
        const activeStep = steps[currentStep];
        const inputs = activeStep.querySelectorAll("input, select, textarea");
        let valid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                valid = false;
                input.reportValidity();
            }
        });
        return valid;
    }

    // Fungsi untuk menghitung usia berdasarkan tanggal lahir
    function calculateAge() {
        const birthDateInput = document.getElementById("birth_date").value;
        const ageField = document.getElementById("age");

        if (birthDateInput) {
            const birthDate = new Date(birthDateInput);
            const maxBirthYear = 2005;

            // Validasi: Pastikan tahun lahir tidak melebihi batas maksimum
            if (birthDate.getFullYear() > maxBirthYear) {
                alert("Minimal Umur Kamu 20 Tahun!");
                document.getElementById("birth_date").value = ""; // Reset input tanggal lahir
                ageField.value = ""; // Reset usia
                return;
            }

            const today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            // Koreksi usia jika bulan dan tanggal belum tercapai dalam tahun ini
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            ageField.value = age; // Update usia
        }
    }

    // Fungsi untuk mengisi dropdown tahun
    function populateYearDropdown(dropdown) {
        const startYear = 2000;
        const endYear = new Date().getFullYear();
        dropdown.innerHTML = "<option value='' disabled selected>Pilih Tahun</option>";
        for (let year = startYear; year <= endYear; year++) {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            dropdown.appendChild(option);
        }
    }

    // Inisialisasi dropdown tahun
    function initializeYearDropdowns() {
        const yearDropdowns = document.querySelectorAll(".year-dropdown");
        yearDropdowns.forEach(dropdown => populateYearDropdown(dropdown));
    }

    // Fungsi untuk menambahkan field pengalaman kerja baru
    function addWorkExperience() {
        const container = document.getElementById("workExperienceContainer");
        const fieldGroup = document.createElement("div");
        fieldGroup.classList.add("repeatable-field");
        fieldGroup.innerHTML = `
            <div class="form-group">
                <label for="work_from[]">Tahun Dari</label>
                <select name="work_from[]" class="year-dropdown" required></select>
            </div>
            <div class="form-group">
                <label for="work_to[]">Tahun Selesai</label>
                <select name="work_to[]" class="year-dropdown" required></select>
            </div>
            <div class="form-group">
                <label for="work_description[]">Deskripsi Pekerjaan</label>
                <textarea name="work_description[]" rows="3" placeholder="Deskripsi tugas" required></textarea>
            </div>
            <div class="form-group">
                <label for="work_country[]">Negara</label>
                <input type="text" name="work_country[]" placeholder="Negara" required>
            </div>
            <button type="button" class="remove-btn" onclick="removeField(this)">Hapus</button>
        `;
        container.appendChild(fieldGroup);

        // Populate dropdown tahun untuk field baru
        const newYearDropdowns = fieldGroup.querySelectorAll(".year-dropdown");
        newYearDropdowns.forEach(dropdown => populateYearDropdown(dropdown));
    }

    // Fungsi untuk menambahkan field skill baru
    function addSkill() {
        const skillsContainer = document.getElementById("skillsContainer");
        const newField = document.createElement("div");
        newField.classList.add("repeatable-field");
        newField.innerHTML = `
            <div class="form-group">
                <label>Nama Skill</label>
                <input type="text" name="skill_name[]" placeholder="Contoh: Microsoft Office" required>
            </div>
            <button type="button" class="remove-btn" onclick="removeField(this)">Hapus</button>
        `;
        skillsContainer.appendChild(newField);
    }

    // Fungsi untuk menghapus field
    function removeField(button) {
        button.parentElement.remove();
    }

    // Inisialisasi langkah pertama, dropdown tahun, dan event handler untuk usia
    document.addEventListener("DOMContentLoaded", () => {
        showStep(currentStep);
        initializeYearDropdowns();

        // Tambahkan event listener ke input tanggal lahir
        const birthDateInput = document.getElementById("birth_date");
        if (birthDateInput) {
            birthDateInput.addEventListener("change", calculateAge);
        }
    });
</script>


</body>
</html>
