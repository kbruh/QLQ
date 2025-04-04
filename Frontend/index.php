<?php 
session_start();

// Kiểm tra xem người dùng đã đăng nhập chưa
if (!isset($_SESSION["user_id"])) {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    header("Location: /QLQ/Frontend/login.html");
    exit();
}

// Nếu đã đăng nhập, lưu thông tin người dùng
$username = $_SESSION["username"];
$isLoggedIn = true; // Đánh dấu người dùng đã đăng nhập
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Restaurant Management</title>
		<link rel="stylesheet" href="styles.css" />
	</head>
	<body>
		<div class="container">
			<!-- Sidebar -->
			<aside class="sidebar">
				<h2>My Restaurants</h2>
				<ul class="restaurant-list">
					<li class="restaurant" onclick="selectRestaurant(this, 'res1')">🍽️ Restaurant 1</li>
					<ul class="submenu" id="res1">
						<li>Reservations</li>
						<li>Orders</li>
						<li>Staff Management</li>
					</ul>

					<li class="restaurant" onclick="selectRestaurant(this, 'res2')">🍕 Restaurant 2</li>
					<ul class="submenu" id="res2">
						<li>Reservations</li>
						<li>Orders</li>
						<li>Staff Management</li>
					</ul>

					<li class="restaurant" onclick="selectRestaurant(this, 'res3')">🍔 Restaurant 3</li>
					<ul class="submenu" id="res3">
						<li>Reservations</li>
						<li>Orders</li>
						<li>Staff Management</li>
					</ul>
				</ul>

				<!-- New Restaurant Button -->
				<button class="new-restaurant-btn">New Restaurant ➕</button>
			</aside>

			<!-- Main Content -->
			<main class="main-content">
				<!-- Navbar -->
				<nav class="navbar">
					<a href="index.php" class="logo-link">
						<div class="logo-header">
							<img style="width: 60px; margin-bottom: -30px; margin-top: -30px" src="./images/food.png" alt="App Logo" class="logo-img" />
						</div>
					</a>
					<div class="nav-right">
						<div class="auth-container">
							<!-- Hiển thị bằng JavaScript -->
						</div>
					</div>
				</nav>

				<!-- Dashboard -->
				<section class="dashboard">
					<h1>Dashboard</h1>
					<div class="stats">
						<div class="card">
							<h3>459</h3>
							<p>Total Reservations</p>
						</div>
						<div class="card">
							<h3>$87,561</h3>
							<p>Total Revenue</p>
						</div>
						<div class="card">
							<h3>247</h3>
							<p>Total Orders</p>
						</div>
						<div class="card">
							<h3>872</h3>
							<p>Total Customers</p>
						</div>
					</div>
				</section>
			</main>
		</div>

		<!-- Popup Form -->
		<div id="popup" class="popup">
			<div class="popup-content">
				<span class="close-btn">&times;</span>
				<h2>Add New Restaurant</h2>
				<form id="restaurant-form">
					<label for="name">Restaurant Name:</label>
					<input type="text" id="name" name="name" required />

					<label for="address">Address:</label>
					<input type="text" id="address" name="address" required />

					<label for="phone">Phone Number:</label>
					<input type="tel" id="phone" name="phone" required />

					<label for="description">Description:</label>
					<textarea id="description" name="description" required></textarea>

					<button type="submit" class="submit-btn">Add Restaurant</button>
				</form>
			</div>
		</div>

		<script>
			// Pass PHP variables to JavaScript
			const isLoggedIn = <?php echo json_encode($isLoggedIn); ?>;
			const username = <?php echo json_encode($username); ?>;
		</script>
		<script src="script.js" defer></script>
	</body>
</html>
