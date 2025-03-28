function selectRestaurant(element, id) {
    // Remove active class from all restaurants
    document.querySelectorAll(".restaurant").forEach(el => el.classList.remove("active"));

    // Add active class to the clicked restaurant
    element.classList.add("active");

    // Toggle submenu with smooth animation
    let submenu = document.getElementById(id);
    if (submenu.classList.contains("open")) {
        submenu.classList.remove("open");
    } else {
        document.querySelectorAll(".submenu").forEach(menu => menu.classList.remove("open"));
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
