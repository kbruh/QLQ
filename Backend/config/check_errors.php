<?php
session_start();
if (isset($_SESSION["register_errors"]) && !empty($_SESSION["register_errors"])) {
    echo json_encode($_SESSION["register_errors"]);
    unset($_SESSION["register_errors"]); // Xóa lỗi sau khi hiển thị
}
elseif (isset($_SESSION["login_errors"]) && !empty($_SESSION["login_errors"])) {
    echo json_encode($_SESSION["login_errors"]);
    unset($_SESSION["login_errors"]); // Xóa lỗi sau khi hiển thị
} else {
    echo json_encode([]);
}
?>
