let barIcon = document.querySelector('#bar-icon');
let crossIcon = document.querySelector('#cross-icon');
let navMenu = document.querySelector('#menu');

barIcon.addEventListener('click', () => {
    navMenu.classList.add("active");
    barIcon.style.display = "none";
    crossIcon.style.display = "block";
});

let menuItems = document.querySelectorAll('.menu-item');
for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove("active");
            crossIcon.style.display = "none";
            barIcon.style.display = "block";
        }
    });
}

crossIcon.addEventListener('click', () => {
    navMenu.classList.remove("active");
    crossIcon.style.display = "none";
    barIcon.style.display = "block";
});
