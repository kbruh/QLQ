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
	const authContainer = document.querySelector(".auth-container");

	// Kiểm tra giá trị của isLoggedIn và username
	console.log("isLoggedIn:", isLoggedIn);
	console.log("username:", username);

	// Hiển thị profile khi người dùng đã đăng nhập
	if (isLoggedIn) {
		authContainer.innerHTML = `
            <div class="profile-container">
				<span class="username">${username}</span>
                <img src="./images/default-avatar-icon-of-social-media-user-vector.jpg" alt="Profile" class="profile-pic">
                <ul class="profile-menu">
                    <li>⚙️ Settings</li>
                    <li><a href="/QLQ/Backend/user/logout.php">🚪 Logout</a></li>
                </ul>
            </div>
        `;

		// Get the profile container after it's been inserted into the DOM
		const profileContainer = document.querySelector(".profile-container");
		const profileMenu = document.querySelector(".profile-menu");

		// Toggle profile menu when clicking on the profile container
		profileContainer.addEventListener("click", (event) => {
			profileContainer.classList.toggle("active");
			event.stopPropagation(); // Prevent closing the menu when clicking inside
		});

		// Close the menu if clicking outside of the profile container
		document.addEventListener("click", (event) => {
			if (!profileContainer.contains(event.target)) {
				profileContainer.classList.remove("active");
			}
		});
	} else {
		authContainer.innerHTML = `<a href="login.html" class="login-btn">Đăng Nhập</a>`;
	}
});

document.addEventListener("DOMContentLoaded", function () {
	fetch("/QLQ/Backend/config/check_errors.php")
		.then((response) => response.json())
		.then((errors) => {
			if (errors.length > 0) {
				let errorContainer = document.createElement("div");
				errorContainer.classList.add("error-popup");

				errors.forEach((error) => {
					let p = document.createElement("p");
					p.textContent = error;
					errorContainer.appendChild(p);
				});

				document.body.appendChild(errorContainer);
			}
		});
});
/* table layout */
let tablesVisible = false;

document.querySelectorAll(".submenu li").forEach((item) => {
	item.addEventListener("click", (e) => {
		const text = e.target.textContent.trim();

		if (text === "Reservations") {
			const dashboard = document.querySelector(".dashboard");

			if (!tablesVisible) {
				dashboard.innerHTML = `
                <h1>Table Layout</h1>
                <button id="edit-tables-btn" class="edit-tables-btn">Edit Tables 🛠️</button>

                <div class="table-layout">
                    <div class="floor" id="table-floor">
                        <div class="table available">Table for 2</div>
                        <div class="table booked">Table for 4</div>
                        <div class="table available">Table for 6</div>
                        <div class="table available">Table for 4</div>
                        <div class="table booked">Table for 2</div>
                        <div class="table available">Table for 8</div>
                    </div>
                </div>

                <!-- Edit Tables Popup -->
                <div id="edit-popup" class="popup" style="display:none;">
                    <div class="popup-content">
                        <span class="close-btn" id="edit-close">&times;</span>
                        <h2>Edit Tables</h2>
                        <form id="edit-form">
                            <label for="table-size">Table for:</label>
                            <select id="table-size">
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                            </select>
                            <label for="table-status">Status:</label>
                            <select id="table-status">
                                <option value="available">Available</option>
                                <option value="booked">Booked</option>
                            </select>
                            <button type="submit" class="submit-btn">Add Table</button>
                        </form>
                        <div id="existing-tables">
                            <h3>Click a table to delete it 🗑️</h3>
                        </div>
                    </div>
                </div>
            `;

				tablesVisible = true;

				// Edit popup logic
				const editBtn = document.getElementById("edit-tables-btn");
				const editPopup = document.getElementById("edit-popup");
				const editClose = document.getElementById("edit-close");
				const editForm = document.getElementById("edit-form");
				const floor = document.getElementById("table-floor");
				const existingTables = document.getElementById("existing-tables");

				// Open popup
				editBtn.addEventListener("click", () => {
					editPopup.style.display = "flex";
					updateExistingTableList();
				});

				// Close popup
				editClose.addEventListener("click", () => {
					editPopup.style.display = "none";
				});

				window.addEventListener("click", (e) => {
					if (e.target === editPopup) {
						editPopup.style.display = "none";
					}
				});

				// Add table
				editForm.addEventListener("submit", (e) => {
					e.preventDefault();
					const size = document.getElementById("table-size").value;
					const status = document.getElementById("table-status").value;

					const newTable = document.createElement("div");
					newTable.className = `table ${status}`;
					newTable.textContent = `Table for ${size}`;
					floor.appendChild(newTable);

					updateExistingTableList();
				});

				// Update and delete
				function updateExistingTableList() {
					existingTables.innerHTML = "<h3>Click a table to delete it 🗑️</h3>";
					floor.querySelectorAll(".table").forEach((table, index) => {
						const clone = table.cloneNode(true);
						clone.addEventListener("click", () => {
							table.remove();
							updateExistingTableList();
						});
						existingTables.appendChild(clone);
					});
				}
			} else {
				dashboard.innerHTML = `
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
                `;
				tablesVisible = false;
			}
		}
	});
});
