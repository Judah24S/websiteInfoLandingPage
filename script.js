// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // Close menu when a link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });
}

// Particle effect for background
function createParticles() {
  const particleCount = 30;
  const container = document.body;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = Math.random() * 2 + 1 + "px";
    particle.style.height = particle.style.width;
    particle.style.background =
      Math.random() > 0.5 ? "rgba(0, 217, 255, 0.5)" : "rgba(255, 0, 110, 0.3)";
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "-1";
    particle.style.animation = `float-particle ${
      Math.random() * 20 + 10
    }s infinite ease-in-out`;
    particle.style.boxShadow =
      "0 0 " + (Math.random() * 10 + 5) + "px rgba(0, 217, 255, 0.4)";
    container.appendChild(particle);
  }
}

// Add particle animation to stylesheet
const style = document.createElement("style");
style.textContent = `
  @keyframes float-particle {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
    25% { transform: translateY(-30px) translateX(20px); opacity: 0.6; }
    50% { transform: translateY(-60px) translateX(-20px); opacity: 0.3; }
    75% { transform: translateY(-30px) translateX(30px); opacity: 0.5; }
  }
  
  @keyframes glow-pulse {
    0%, 100% { text-shadow: 0 0 20px rgba(0, 217, 255, 0.5); }
    50% { text-shadow: 0 0 40px rgba(0, 217, 255, 0.8), 0 0 20px rgba(255, 0, 110, 0.4); }
  }
`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener("load", createParticles);

// Contact Modal functionality
const contactTriggers = document.querySelectorAll(".contactTrigger");
const contactModal = document.getElementById("contactModal");
const contactModalClose = document.getElementById("contactModalClose");

if (contactTriggers && contactModal) {
  contactTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      contactModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
}

if (contactModalClose && contactModal) {
  contactModalClose.addEventListener("click", () => {
    contactModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

// Close modal when clicking overlay
if (contactModal) {
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    contactModal &&
    contactModal.style.display === "flex"
  ) {
    contactModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && !this.id.includes("contactTrigger")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Privacy Policy functionality
document.addEventListener("DOMContentLoaded", function () {
  const privacyBtn = document.getElementById("privacyPolicyBtn");
  const privacyPopup = document.getElementById("privacyPopup");
  const privacyCloseBtn = document.getElementById("privacyCloseBtn");

  if (privacyBtn && privacyPopup) {
    privacyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      privacyPopup.style.display = "flex";
    });
  }

  if (privacyCloseBtn && privacyPopup) {
    privacyCloseBtn.addEventListener("click", function () {
      privacyPopup.style.display = "none";
    });
  }

  // Close popup when clicking overlay
  if (privacyPopup) {
    privacyPopup.addEventListener("click", function (e) {
      if (e.target === privacyPopup) {
        privacyPopup.style.display = "none";
      }
    });
  }
});

// Contact form handling - Submit to Google Forms
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const inquiryType = document.getElementById("inquiry-type").value;
    const heardFrom = document.getElementById("heard-from").value;
    const message = document.getElementById("message").value;

    const GOOGLE_FORM_URL =
      "https://docs.google.com/forms/d/e/1FAIpQLSdAmdQBFXs9aAVGcP6S5PEEhJokHmMKFX-u5bSFEbBQTmqIrQ/formResponse";
    const NAME_FIELD = "entry.1752235031";
    const EMAIL_FIELD = "entry.1965386154";
    const INQUIRY_TYPE_FIELD = "entry.635989138";
    const HEARD_FROM_FIELD = "entry.1342546266";
    const MESSAGE_FIELD = "entry.1120757408";

    // Create form data
    const formData = new FormData();
    formData.append(NAME_FIELD, name);
    formData.append(EMAIL_FIELD, email);
    formData.append(INQUIRY_TYPE_FIELD, inquiryType);
    formData.append(HEARD_FROM_FIELD, heardFrom);
    formData.append(MESSAGE_FIELD, message);

    // Submit to Google Forms
    fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then(() => {
        alert("Thanks for reaching out! We'll get back to you soon.");
        contactForm.reset();
        if (contactModal) {
          contactModal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      })
      .catch(() => {
        alert("Thanks for reaching out! We'll get back to you soon.");
        contactForm.reset();
        if (contactModal) {
          contactModal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
  });
}
