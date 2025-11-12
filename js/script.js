// assets/js/main.js
// Initialize EmailJS public key somewhere at the top of your JS file
emailjs.init("7IW9H7Q9P_Om3dfEw");


document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("close-btn");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const contactForm = document.getElementById("contactForm");

  // --- Navigation Toggle ---
  const initNavToggle = () => {
    hamburger?.addEventListener("click", () => nav?.classList.add("open"));
    closeBtn?.addEventListener("click", () => nav?.classList.remove("open"));
  };

  // --- Theme Toggle ---
  const initThemeToggle = () => {
    if (!themeToggleBtn) return;

    const sun = '<i class="fas fa-sun"></i>';
    const moon = '<i class="fas fa-moon"></i>';
    const current = localStorage.getItem("theme");

    if (current === "dark") {
      body.classList.add("dark");
      themeToggleBtn.innerHTML = sun;
    } else themeToggleBtn.innerHTML = moon;

    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      const theme = body.classList.contains("dark") ? "dark" : "light";
      themeToggleBtn.innerHTML = theme === "dark" ? sun : moon;
      localStorage.setItem("theme", theme);
      body.style.transition = "background-color 0.6s ease, color 0.6s ease";
    });
  };

  // --- Smooth Scroll ---
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
          e.preventDefault();
          const el = document.querySelector(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        nav?.classList.remove("open");
      });
    });
  };

  // --- ScrollSpy ---
  const initScrollSpy = () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links li a");

    const scrollActive = () => {
      const scrollY = window.scrollY + 120;
      sections.forEach((sec) => {
        const id = sec.id;
        const link = document.querySelector(`.nav-links a[href*="${id}"]`);
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollY > top && scrollY <= top + height) {
          navLinks.forEach((a) => a.classList.remove("active"));
          link?.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", scrollActive);
    scrollActive();
  };

  // --- Projects Filter & Show More ---
  const initProjectLogic = () => {
    const filters = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    const moreBtn = document.getElementById("projects-more-btn");
    const MAX = 3;

    if (!cards.length) return;

    let category = "all";
    let expanded = false;

    const update = () => {
      const visible = Array.from(cards).filter(
        (c) => category === "all" || c.dataset.category === category
      );
      cards.forEach((c) => c.classList.add("hidden"));
      visible.forEach((c, i) => {
        if (expanded || i < MAX) c.classList.remove("hidden");
      });
      moreBtn.style.display = visible.length > MAX ? "inline-block" : "none";
      moreBtn.textContent = expanded ? "Show Less" : "Show More";
    };

    filters.forEach((btn) =>
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        category = btn.dataset.category;
        expanded = false;
        update();
      })
    );

    moreBtn?.addEventListener("click", () => {
      expanded = !expanded;
      update();
    });

    document.querySelector('.filter-btn[data-category="all"]')?.classList.add("active");

    update();
  };

  // --- Resume Tabs ---
  const initResumeTabs = () => {
    const buttons = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".resume-panel");
    buttons.forEach((b) =>
      b.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        b.classList.add("active");
        document.getElementById(b.dataset.target)?.classList.add("active");
      })
    );
  };

  // --- Contact Form (EmailJS) ---
const initContactForm = () => {
  if (!contactForm) return;

  // Create status message element
  const statusMsg = document.createElement("p");
  statusMsg.className = "form-status";
  statusMsg.style.marginTop = "0.5rem";
  contactForm.appendChild(statusMsg);

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    // Validation
    if (!name || !email || !message) {
      statusMsg.textContent = "⚠️ Please fill out all fields.";
      statusMsg.style.color = "#ff6b6b";
      return;
    }

    // Sending status
    statusMsg.textContent = "⏳ Sending message...";
    statusMsg.style.color = "#007bff";

    // Send via EmailJS
    emailjs
      .send("service_dhdorze", "template_ks3al8f", {
        from_name: name,
        from_email: email,
        message: message,
      })
      .then(() => {
        statusMsg.textContent =
          "✅ Message sent successfully! I'll reply soon.";
        statusMsg.style.color = "#00c851";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        statusMsg.textContent =
          "❌ Failed to send message. Please try again later.";
        statusMsg.style.color = "#ff4444";
      });
  });
};


  // --- Initialize All ---
  initNavToggle();
  initThemeToggle();
  initSmoothScroll();
  initScrollSpy();
  initProjectLogic();
  initResumeTabs();
  initContactForm();

  // --- Initialize AOS ---
  AOS.init({ duration: 1000, once: true, offset: 50 });
});
