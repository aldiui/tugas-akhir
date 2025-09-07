<?php
session_start();
require_once 'database/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']); // Trim untuk menghapus spasi ekstra
    $password = trim($_POST['password']);

    // Validasi input agar tidak kosong
    if (empty($username) || empty($password)) {
        $error = "Username and Password cannot be empty.";
    } else {
        $sql = "SELECT id, username, password FROM users WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                // Set session data untuk user yang berhasil login
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username']; // Simpan username untuk kebutuhan admin
                header("Location: index.php");
                exit();
            } else {
                $error = "Invalid username or password.";
            }
        } else {
            $error = "Invalid username or password.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Bahana Mega Prestasi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="https://bahanamegaprestasi.id/wp-content/uploads/2024/01/bahana-logo-1536x385.png">
    <style>
        body {
            background: linear-gradient(135deg, #007bff, #6610f2);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        }

        .login-container {
            background-color: #ffffff;
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        .login-logo img {
            width: 120px;
            margin-bottom: 20px;
        }

        .login-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #007bff;
        }

        .form-control {
            border-radius: 10px;
            height: 45px;
        }

        .btn-login {
            background: #007bff;
            border: none;
            color: #ffffff;
            font-weight: bold;
            border-radius: 10px;
            height: 45px;
            transition: background-color 0.3s ease;
        }

        .btn-login:hover {
            background: #0056b3;
        }

        .form-text {
            font-size: 14px;
            color: #6c757d;
        }

        .alert {
            font-size: 14px;
            border-radius: 10px;
        }

        .contact-link {
            text-decoration: none;
            font-size: 14px;
            color: #007bff;
        }

        .contact-link:hover {
            color: #0056b3;
            text-decoration: underline;
        }

        @media (max-width: 576px) {
            .login-container {
                padding: 20px;
            }

            .login-title {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="login-container">
        <!-- Logo -->
        <div class="login-logo">
            <img src="https://bahanamegaprestasi.id/wp-content/uploads/2024/01/bahana-logo-1536x385.png" alt="Bahana Logo">
        </div>

        <!-- Login Title -->
        <div class="login-title">Welcome Back!</div>

        <!-- Error Message -->
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <!-- Login Form -->
        <form method="POST" action="login.php">
            <div class="mb-3">
                <input type="text" name="username" id="username" class="form-control" placeholder="Username" required>
            </div>
            <div class="mb-3">
                <input type="password" name="password" id="password" class="form-control" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-login w-100">Login</button>
        </form>

        <!-- Footer -->
        <div class="form-text mt-3">© 2024 Bahana Mega Prestasi. All Rights Reserved.</div>
        <a href="https:mybahana.com/register.php" class="contact-link">Pendaftaran Dominika (Klik Disini)</a>
    </div>
</body>
</html>
