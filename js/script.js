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
