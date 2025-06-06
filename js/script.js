document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav");
    const hamburger = document.getElementById("hamburger");
    const closeBtn = document.getElementById("close-btn");

    hamburger.addEventListener("click", () => {
        nav.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
        nav.classList.remove("open");
    });

    // Theme toggle
    const toggleBtn = document.getElementById("theme-toggle");
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
});


// Read More toggle (unchanged)
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        button.textContent = content.style.display === 'block' ? 'Show Less' : 'Read More';
    });
});

// Intersection Observer for animation on scroll
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

reveals.forEach(el => observer.observe(el));






