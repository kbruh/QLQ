<?php
session_start();
include "../config/config.php"; // Kết nối database

$errors = []; // Mảng chứa lỗi

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $confirm_password = trim($_POST["confirm_password"]);
    $role = "NHAN_VIEN"; // Mặc định cho nhân viên

    // Kiểm tra nếu mật khẩu nhập lại không khớp
    if ($password !== $confirm_password) {
        $errors[] = "❌ Mật khẩu xác nhận không khớp!";
    }

    // Kiểm tra xem tên đăng nhập hoặc email đã tồn tại chưa
    $stmt = $conn->prepare("SELECT TK_MA FROM TAI_KHOAN WHERE TK_TENDANGNHAP = ? OR TK_EMAIL = ?");
    if (!$stmt) {
        $errors[] = "❌ Lỗi truy vấn: " . $conn->error;
    } else {
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $errors[] = "❌ Tên đăng nhập hoặc Email đã tồn tại!";
        }
        $stmt->close();
    }

    // Nếu không có lỗi thì tiến hành đăng ký
    if (empty($errors)) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $conn->prepare("INSERT INTO TAI_KHOAN (TK_MA, TK_TENDANGNHAP, TK_EMAIL, TK_MATKHAU, TK_QUYEN) VALUES (?, ?, ?, ?, ?)");
        if (!$stmt) {
            $errors[] = "❌ Lỗi SQL khi chèn dữ liệu: " . $conn->error;
        } else {
            $tk_ma = uniqid("TK_"); // Tạo mã tài khoản duy nhất
            $stmt->bind_param("sssss", $tk_ma, $username, $email, $hashed_password, $role);
            
            if ($stmt->execute()) {
                $_SESSION["user_id"] = $tk_ma;
                $_SESSION["username"] = $username;
                header("Location: /QLQ/Frontend/index.php");
                exit();
            } else {
                $errors[] = "❌ Đăng ký thất bại, vui lòng thử lại!";
            }
            $stmt->close();
        }
    }

    // Lưu lỗi vào session để hiển thị trong register.html
    $_SESSION["register_errors"] = $errors;
    header("Location: /QLQ/Frontend/register.html");
    exit();
}
?>
