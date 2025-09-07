<?php
// Include header
include 'header.php';

// Fetch all distinct dates for dropdown filter
require_once 'database/connection.php';
$sql_dates = "SELECT DISTINCT tanggal_legalisir FROM cpmi_data ORDER BY tanggal_legalisir DESC";
$result_dates = $conn->query($sql_dates);

$tanggal_pengajuan_list = [];
if ($result_dates && $result_dates->num_rows > 0) {
    while ($row = $result_dates->fetch_assoc()) {
        $tanggal_pengajuan_list[] = $row['tanggal_legalisir'];
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Data View</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <style>
        .table-container { overflow-x: auto; }
        .mobile-card-container { display: none; }
        .mobile-card { background: #fff; border: 1px solid #dee2e6; margin-bottom: 10px; border-radius: 5px; padding: 15px; }
        .filter-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal {
            top: 15%;
        }
        .form-select { max-width: 300px; }

        @media (max-width: 768px) {
            .table-container { display: none; }
            .mobile-card-container { display: block; }
            .filter-section {
                display: block;
            }
            #tanggal_pengajuan, #generate-modal-btn, #reload-btn {
                width: 100%;
                margin-bottom: 10px;
            }
            .form-select { max-width: 100%; }
            .mobile-card-container p { margin: 0px; }
            .d-flex { display: flex !important; padding-top: 13px; text-align: center; }
            #pagination ul.pagination {
                flex-wrap: wrap;
                gap: 5px;
            }
            #pagination .page-link {
                padding: 6px 10px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
<div class="container my-4">

    <!-- Filter Section -->
    <div class="filter-section">
        <select id="tanggal_pengajuan" class="form-select">
            <option value="">-- Filter by Date --</option>
            <?php foreach ($tanggal_pengajuan_list as $tanggal): ?>
                <option value="<?= htmlspecialchars($tanggal) ?>">
                    <?= date('d F Y', strtotime($tanggal)) ?>
                </option>
            <?php endforeach; ?>
        </select>

        <button id="reload-btn" class="btn btn-secondary">
            <i class="fa-solid fa-rotate"></i> Refresh Data
        </button>

        <button id="generate-modal-btn" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#generateModal">
            <i class="fa-solid fa-download"></i> Generate Daftar Nama
        </button>
    </div>

    <!-- Desktop Table View -->
    <div class="table-container">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>ID PMI</th>
                    <th>Jabatan</th>
                    <th>TPL</th>
                    <th>Action</th>
                    <th>Export</th>
                </tr>
            </thead>
            <tbody id="desktop-data"></tbody>
        </table>
    </div>

    <!-- Mobile Card View -->
    <div class="mobile-card-container" id="mobile-data"></div>

    <!-- Pagination -->
    <nav id="pagination" aria-label="Page navigation">
        <ul class="pagination justify-content-center flex-wrap"></ul>
    </nav>
</div>

<!-- Modal for PDF Generation (Dropdown) -->
<div class="modal fade" id="generateModal" tabindex="-1" aria-labelledby="generateModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <form id="generateForm" method="get" target="_blank">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Pilih Tanggal Pengajuan</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="tanggal_select" class="form-label">Tanggal:</label>
                        <select id="tanggal_select" name="tanggal_pengajuan" class="form-select" required>
                            <option value="">-- Pilih Tanggal --</option>
                            <?php foreach ($tanggal_pengajuan_list as $tanggal): ?>
                                <option value="<?= htmlspecialchars($tanggal) ?>">
                                    <?= date('d F Y', strtotime($tanggal)) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" formaction="template/pdf_data.php" class="btn btn-success">Generate</button>
                </div>
            </div>
        </form>
    </div>
</div>

<script>
    function fetchData(tanggal_pengajuan = '', page = 1) {
        $.ajax({
            url: 'ajax_get_data.php',
            method: 'GET',
            data: { tanggal_pengajuan, page },
            success: function(response) {
                const res = JSON.parse(response);
                const data = res.data || [];
                const totalPages = res.total_pages || 0;

                $('#desktop-data').empty();
                $('#mobile-data').empty();
                $('#pagination ul').empty();

                data.forEach((item, index) => {
                    $('#desktop-data').append(`
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.nama}</td>
                            <td>${item.id_pmi}</td>
                            <td>${item.jabatan}</td>
                            <td>${item.tanggal_legalisir}</td>
                            <td>
                                <a href="${item.action.edit}" class="btn btn-sm btn-primary">Edit</a>
                                <a href="${item.action.delete}" class="btn btn-sm btn-danger">Delete</a>
                            </td>
                            <td>
                                <a href="${item.export.sp}" class="btn btn-sm btn-success" target="_blank">SP</a>
                                <a href="${item.export.ck}" class="btn btn-sm btn-info" target="_blank">CK</a>
                                <a href="${item.export.certificate}" class="btn btn-sm btn-warning" target="_blank">Certificate</a>
                            </td>
                        </tr>
                    `);

                    $('#mobile-data').append(`
                        <div class="mobile-card">
                            <h5>${item.nama}</h5>
                            <p><strong>ID PMI:</strong> ${item.id_pmi}</p>
                            <p><strong>Jabatan:</strong> ${item.jabatan}</p>
                            <p><strong>Date:</strong> ${item.tanggal_legalisir}</p>
                            <div class="d-flex">
                                <a href="${item.action.edit}" class="btn btn-sm btn-primary me-2">Edit</a>
                                <a href="${item.action.delete}" class="btn btn-sm btn-danger me-2">Delete</a>
                                <a href="${item.export.sp}" class="btn btn-sm btn-success me-2" target="_blank">SP</a>
                                <a href="${item.export.ck}" class="btn btn-sm btn-info me-2" target="_blank">CK</a>
                                <a href="${item.export.certificate}" class="btn btn-sm btn-warning me-2" target="_blank">Certificate</a>
                            </div>
                        </div>
                    `);
                });

                // Pagination Logic
                const maxVisible = 5;
                let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
                let endPage = startPage + maxVisible - 1;
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = Math.max(1, endPage - maxVisible + 1);
                }

                if (page > 1) {
                    $('#pagination ul').append(`<li class="page-item"><a class="page-link" href="#" onclick="fetchData('${tanggal_pengajuan}', ${page - 1})">&laquo;</a></li>`);
                }

                if (startPage > 1) {
                    $('#pagination ul').append(`
                        <li class="page-item"><a class="page-link" href="#" onclick="fetchData('${tanggal_pengajuan}', 1)">1</a></li>
                        <li class="page-item disabled"><span class="page-link">...</span></li>
                    `);
                }

                for (let i = startPage; i <= endPage; i++) {
                    $('#pagination ul').append(`
                        <li class="page-item ${i === page ? 'active' : ''}">
                            <a class="page-link" href="#" onclick="fetchData('${tanggal_pengajuan}', ${i})">${i}</a>
                        </li>
                    `);
                }

                if (endPage < totalPages) {
                    $('#pagination ul').append(`
                        <li class="page-item disabled"><span class="page-link">...</span></li>
                        <li class="page-item"><a class="page-link" href="#" onclick="fetchData('${tanggal_pengajuan}', ${totalPages})">${totalPages}</a></li>
                    `);
                }

                if (page < totalPages) {
                    $('#pagination ul').append(`<li class="page-item"><a class="page-link" href="#" onclick="fetchData('${tanggal_pengajuan}', ${page + 1})">&raquo;</a></li>`);
                }
            },
            error: function() {
                alert('Error loading data');
            }
        });
    }

    $(document).ready(function() {
        fetchData();
        $('#tanggal_pengajuan').change(function() {
            const filter = $(this).val();
            fetchData(filter);
        });

        $('#reload-btn').click(function() {
            location.reload(true);
        });

        // Optional: Form validation
        $('#generateForm').on('submit', function(e) {
            if (!$('#tanggal_select').val()) {
                e.preventDefault();
                alert('Silakan pilih tanggal terlebih dahulu.');
            }
        });
    });
</script>
</body>
</html>
