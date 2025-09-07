<?php
session_start();

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Process - Bahana Mega Prestasi</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome for Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="https://bahanamegaprestasi.id/wp-content/uploads/2024/01/bahana-logo-1536x385.png">

    <style>
        /* Header Styling */
        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 2px solid #dee2e6;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 99999; /* Tinggi Z-index untuk menu */
        }

        /* Logo Styling */
        .header-logo {
            width: 10%;
            min-width: 100px;
        }

        .header-logo img {
            max-width: 100%;
            height: auto;
        }

        /* Offcanvas Customization */
        .offcanvas {
            z-index: 99999; /* Tinggi Z-index untuk menu */
        }

        .offcanvas-header {
            background-color: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
        }

        .offcanvas-body a {
            text-decoration: none;
            font-size: 18px;
            color: #007bff;
            padding: 10px 0;
            display: block;
            border-bottom: 1px solid #dee2e6;
        }

        .offcanvas-body a:hover {
            color: #0056b3;
            background-color: #e9ecef;
        }

        /* Responsive Styling */
        @media (min-width: 768px) {
            .hamburger-menu {
                display: none; /* Sembunyikan hamburger di desktop */
            }
        }
    </style>
</head>
<body>
    <header class="header-container">
        <!-- Logo -->
        <div class="header-logo">
            <a href="/index.php">
                <img src="https://bahanamegaprestasi.id/wp-content/uploads/2024/01/bahana-logo-1536x385.png" alt="Bahana Logo">
            </a>
        </div>

        <!-- Hamburger Menu for Mobile -->
        <button class="btn hamburger-menu d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
            <i class="fas fa-bars"></i>
        </button>

        <!-- Desktop Navigation -->
        <nav class="header-menu d-none d-lg-flex">
            <a href="index.php" class="btn btn-outline-primary me-2">
                <i class="fas fa-home"></i> Dashboard
            </a>
            <a href="register_data.php" class="btn btn-outline-success me-2">
                <i class="fas fa-users"></i> Data Register
            </a>
            <a href="form_document.php" class="btn btn-outline-success me-2">
                <i class="fas fa-plus-circle"></i> Add Data
            </a>
            
            <a href="logout.php" class="btn btn-outline-danger">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </nav>
    </header>

    <!-- Offcanvas Menu for Mobile -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="mobileMenuLabel">Menu</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <a href="index.php">
                <i class="fas fa-home"></i> Dashboard
            </a>
            <a href="form_document.php">
                <i class="fas fa-plus-circle"></i> Add Data
            </a>
            <a href="logout.php">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </div>
    </div>

    <!-- Optional Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
