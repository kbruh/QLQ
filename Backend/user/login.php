<?php
session_start();
include "../config/config.php"; // Kết nối cơ sở dữ liệu

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    // Chuẩn bị truy vấn để kiểm tra tài khoản
    $stmt = $conn->prepare("SELECT TK_MA, TK_TENDANGNHAP, TK_MATKHAU, TK_QUYEN FROM TAI_KHOAN WHERE TK_TENDANGNHAP = ?");
    if ($stmt) {
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        // Kiểm tra nếu tài khoản tồn tại
        if ($stmt->num_rows === 1) {
            $stmt->bind_result($tk_ma, $tk_tendangnhap, $hashed_password, $tk_quyen);
            $stmt->fetch();

            if (password_verify($password, $hashed_password)) {
                // Đăng nhập thành công
                $_SESSION["user_id"] = $tk_ma;
                $_SESSION["username"] = $tk_tendangnhap;
                $_SESSION["role"] = $tk_quyen;

                header("Location: /QLQ/Frontend/index.php"); // Điều hướng sau đăng nhập thành công
                exit();
            } else {
                $_SESSION["login_errors"] = ["❌ Mật khẩu không đúng!"];
            }
        } else {
            $_SESSION["login_errors"] = ["❌ Tên đăng nhập không tồn tại!"];
        }
    } else {
        $_SESSION["login_errors"] = ["❌ Lỗi truy vấn: " . $conn->error];
    }

    // Nếu có lỗi, quay lại form đăng nhập
    header("Location: /QLQ/Frontend/login.html");
    exit();
}
?>
