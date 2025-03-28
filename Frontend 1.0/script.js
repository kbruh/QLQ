function selectRestaurant(element, id) {
	// Remove active class from all restaurants
	document.querySelectorAll(".restaurant").forEach((el) => el.classList.remove("active"));

	// Add active class to the clicked restaurant
	element.classList.add("active");

	// Toggle submenu with smooth animation
	let submenu = document.getElementById(id);
	if (submenu.classList.contains("open")) {
		submenu.classList.remove("open");
	} else {
		document.querySelectorAll(".submenu").forEach((menu) => menu.classList.remove("open"));
		submenu.classList.add("open");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const popUp = document.getElementById("popup");
	const closeBtn = document.querySelector(".close-btn");

	document.querySelector(".new-restaurant-btn").addEventListener("click", () => {
		popUp.style.display = "flex";
	});

	closeBtn.addEventListener("click", () => {
		popUp.style.display = "none";
	});

	window.addEventListener("click", (event) => {
		if (event.target === popUp) {
			popUp.style.display = "none";
		}
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const profileContainer = document.querySelector(".profile-container");
	const profileMenu = document.querySelector(".profile-menu");

	profileContainer.addEventListener("click", (event) => {
		profileContainer.classList.toggle("active");
		event.stopPropagation();
	});

	// Close menu when clicking outside
	document.addEventListener("click", (event) => {
		if (!profileContainer.contains(event.target)) {
			profileContainer.classList.remove("active");
		}
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const isLoggedIn = false; // Thay đổi thành true nếu đã đăng nhập (hoặc nhận từ server)
	const authContainer = document.querySelector(".auth-container");

	if (isLoggedIn) {
		authContainer.innerHTML = `
            <div class="profile-container">
                <img src="default-avatar-icon-of-social-media-user-vector.jpg" alt="Profile" class="profile-pic">
                <ul class="profile-menu">
                    <li>⚙️ Settings</li>
                    <li>🚪 Logout</li>
                </ul>
            </div>
        `;
	} else {
		authContainer.innerHTML = `<a href="register.html" class="register-btn">Đăng ký</a>`;
	}
});
