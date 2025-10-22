// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger menu
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, index) => {
    if (navMenu.classList.contains("active")) {
      if (index === 0)
        bar.style.transform = "rotate(-45deg) translate(-5px, 6px)";
      if (index === 1) bar.style.opacity = "0";
      if (index === 2)
        bar.style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    }
  });
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
  }
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Simulate form submission (Replace with real backend integration)
    showNotification(
      "Application received! A Diamond Network representative will contact you within 24 hours to verify your baseball background.",
      "success"
    );
    this.reset();

    // TODO: Replace with actual form submission to backend
    // Example: submitToServer({name, email, subject, message});
  });
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "100px",
    right: "20px",
    background:
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
    color: "white",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    zIndex: "10000",
    transform: "translateX(400px)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    fontSize: "0.9rem",
    fontWeight: "500",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = document.querySelectorAll(
    ".service-card, .team-member, .stat, .feature"
  );

  elementsToObserve.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
  });
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat h3");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent =
          Math.ceil(current) + (counter.textContent.includes("%") ? "%" : "+");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = counter.textContent; // Keep original format
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".about-stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Handle window resize for responsive navigation
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    });
  }
});

// Keyboard accessibility for navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navMenu.classList.remove("active");
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    });
  }
});

// Add focus indicators for accessibility
document.querySelectorAll(".nav-link, .btn, .social-links a").forEach((el) => {
  el.addEventListener("focus", function () {
    this.style.outline = "2px solid #667eea";
    this.style.outlineOffset = "2px";
  });

  el.addEventListener("blur", function () {
    this.style.outline = "none";
  });
});

// Preload images and optimize performance
document.addEventListener("DOMContentLoaded", () => {
  // Add lazy loading for images if any are added later
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
});

// Add scroll-to-top functionality
const createScrollToTop = () => {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = "scroll-to-top";

  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    fontSize: "1.2rem",
    cursor: "pointer",
    opacity: "0",
    visibility: "hidden",
    transition: "all 0.3s ease",
    zIndex: "1000",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.transform = "translateY(-3px)";
    scrollBtn.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
  });

  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.transform = "translateY(0)";
    scrollBtn.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
  });

  document.body.appendChild(scrollBtn);

  // Show/hide scroll button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });
};

// Initialize scroll to top button
createScrollToTop();
