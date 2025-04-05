<?php
    $servername = "26.182.225.145";
    $port = "3306"; 
    $username = "mrq"; 
    $password = "123123";
    $dbname = "restaurant_management";

    // Kết nối MySQL
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        die("Kết nối thất bại: " . $conn->connect_error);
    }
?>