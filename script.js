// ==================== ТЕМА ====================
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "light";
htmlElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = htmlElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  htmlElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// ==================== МОБІЛЬНЕ МЕНЮ ====================
const menuToggle = document.getElementById("menuToggle");
const navCenter = document.querySelector(".nav-center"); // ← правильний елемент
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navCenter.classList.toggle("active");
  menuToggle.classList.toggle("active", isOpen);
  // Блокуємо скрол сторінки коли меню відкрите
  document.body.style.overflow = isOpen ? "hidden" : "";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navCenter.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Закриваємо меню при кліку поза ним
document.addEventListener("click", (e) => {
  if (
    navCenter.classList.contains("active") &&
    !navCenter.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    navCenter.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// ==================== ПЛАВНИЙ СКРОЛ ЗА ЯКОРЯМИ ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ==================== NAVBAR SHADOW ON SCROLL ====================
window.addEventListener(
  "scroll",
  () => {
    const navbar = document.querySelector(".navbar");
    navbar.style.boxShadow =
      window.scrollY > 10
        ? "0 2px 12px rgba(0,0,0,0.12)"
        : "0 2px 8px rgba(0,0,0,0.04)";
  },
  { passive: true }
);

// ==================== INTERSECTION OBSERVER (клас .visible) ====================
const observerOptions = {
  threshold: 0.08,
  rootMargin: "0px 0px -40px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Невелика затримка для каскадного ефекту між сусідніми картками
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const index = siblings.indexOf(entry.target);
      const delay = Math.min(index * 80, 400); // не більше 400ms

      setTimeout(() => {
        entry.target.classList.add("visible");
      }, delay);

      observer.unobserve(entry.target); // анімуємо лише один раз
    }
  });
}, observerOptions);

// Всі елементи що мають анімацію появи
document
  .querySelectorAll(
    ".welcome-card, .benefit-item, .stat-card, .review-card, " +
      ".menu-item, .contact-card, .value, .team-member, .achievement, " +
      ".faq-item, .hours-card"
  )
  .forEach((el) => observer.observe(el));

// ==================== ФОРМА КОНТАКТІВ ====================
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  const submitBtn = contactForm.querySelector(".cta-button[data-submit]");
  if (submitBtn) {
    submitBtn.addEventListener("click", handleFormSubmit);
  }
}

function handleFormSubmit() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  if (!nameInput || !emailInput || !messageInput) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    showFormMessage("Будь ласка, заповніть всі обов'язкові поля.", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormMessage("Введіть коректну email-адресу.", "error");
    return;
  }

  // Імітація відправки
  showFormMessage(
    "✓ Повідомлення надіслано! Відповімо впродовж години.",
    "success"
  );
  nameInput.value = "";
  emailInput.value = "";
  if (document.getElementById("phone"))
    document.getElementById("phone").value = "";
  messageInput.value = "";
}

function showFormMessage(text, type) {
  const existing = document.querySelector(".form-message");
  if (existing) existing.remove();

  const msg = document.createElement("p");
  msg.className = "form-message";
  msg.textContent = text;
  msg.style.cssText = `
    padding: 0.85rem 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    font-size: 0.95rem;
    font-weight: 500;
    ${
      type === "success"
        ? "background:#f0faf0;color:#2d7a2d;border:1px solid #b8e0b8;"
        : "background:#fff0f0;color:#c0392b;border:1px solid #f5c0c0;"
    }
  `;

  const form = document.querySelector(".contact-form");
  if (form) form.appendChild(msg);

  setTimeout(() => msg.remove(), 5000);
}

console.log("✨ CoffeeBliss завантажена успішно!");
