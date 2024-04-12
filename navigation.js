
// Select all navbar links
const navbarLinks = document.querySelectorAll(".navbar a");

// Function to handle intersection observer callback
const handleIntersection = entries => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.navbar a[href="#${id}"]`);
        if (entry.isIntersecting) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Create intersection observer instance
const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Adjust as needed
});

// Observe each section
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add click event listeners to navbar links
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all links
        navbarLinks.forEach(link => link.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
    });
});
