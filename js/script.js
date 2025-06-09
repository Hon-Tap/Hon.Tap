document.addEventListener("DOMContentLoaded", () => {

    // =======================
    // NAVIGATION TOGGLE
    // =======================
    const nav = document.getElementById("nav");
    const hamburger = document.getElementById("hamburger");
    const closeBtn = document.getElementById("close-btn");

    hamburger.addEventListener("click", () => {
        nav.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
        nav.classList.remove("open");
    });

    // =======================
    // THEME TOGGLE
    // =======================
    const toggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark");
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });

    // =======================
    // COUNTER ANIMATION
    // =======================
    const counters = document.querySelectorAll(".counter");

    const runCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => counterObserver.observe(counter));

    // =======================
    // READ MORE TOGGLE (New Version)
    // =======================
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.classList.toggle('show');
            this.textContent = content.classList.contains('show') ? 'Read Less' : 'Read More';
        });
    });

    // =======================
    // REVEAL ON SCROLL
    // =======================
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(el => revealObserver.observe(el));
});

//Contact
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Thank you! Your message has been received. I’ll get back to you shortly.");
    this.reset(); // clears the form
});
