// Show privacy policy popup when clicking footer button
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
// Footer navigation links scroll to respective sections
document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.getElementById("footerHomeLink");
  const platformLink = document.getElementById("footerPlatformLink");
  const contactLink = document.getElementById("footerContactLink");
  const homeTab = document.querySelector(
    '.boom-in-option-item[data-page="home"]'
  );
  const platformTab = document.querySelector(
    '.boom-in-option-item[data-page="platform"]'
  );
  const contactTab = document.querySelector(
    '.boom-in-option-item[data-page="contact"]'
  );
  if (homeLink && homeTab) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();
      homeTab.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  if (platformLink && platformTab) {
    platformLink.addEventListener("click", function (e) {
      e.preventDefault();
      platformTab.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  if (contactLink && contactTab) {
    contactLink.addEventListener("click", function (e) {
      e.preventDefault();
      contactTab.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
// Enable Privacy Policy button only after scrolling to bottom
document.addEventListener("DOMContentLoaded", function () {
  const privacyBtn = document.getElementById("privacyPolicyBtn");
  if (privacyBtn) {
    function checkScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= scrollable - 2) {
        privacyBtn.disabled = false;
      } else {
        privacyBtn.disabled = true;
      }
    }
    window.addEventListener("scroll", checkScroll);
    checkScroll();
    // Privacy button click handler is handled in the first event listener above
  }
});
// Show only the relevant content section based on selected appbar option
document.addEventListener("DOMContentLoaded", function () {
  const options = document.querySelectorAll(".boom-in-option-item");
  const homeContent = document.getElementById("homeContent");
  const platformContent = document.getElementById("platformContent");
  const contactContent = document.getElementById("contactContent");
  const appbarLogo = document.getElementById("boomInAppbarLogo");
  const boomInMainTitle = document.getElementById("boomInMainTitle");
  const homeBgVideo = document.getElementById("homeBgVideo");
  const homeBgVideoContainer = document.querySelector(
    ".home-bg-video-container"
  );

  function showPage(page) {
    const footer = document.querySelector(".boom-in-footer");
    homeContent.style.display = page === "home" ? "flex" : "none";
    platformContent.style.display = page === "platform" ? "flex" : "none";
    contactContent.style.display = page === "contact" ? "flex" : "none";
    if (footer) footer.style.display = "block";
    // Always show Boom-In logo in appbar
    if (appbarLogo) appbarLogo.style.display = "block";
    // Video and home title logic
    if (homeBgVideo && homeBgVideoContainer) {
      if (page === "home") {
        homeBgVideoContainer.style.display = "none";
        if (boomInMainTitle) boomInMainTitle.style.display = "block";
        // Wait for the Boom-In title fade animation, then show video
        setTimeout(() => {
          // Hide Boom-In main title when video starts
          if (boomInMainTitle) boomInMainTitle.style.display = "none";
          homeBgVideoContainer.style.display = "flex";
          homeBgVideo.currentTime = 0;
          homeBgVideo.play();
        }, 1200); // match CSS animation duration
      } else {
        homeBgVideo.pause();
        homeBgVideoContainer.style.display = "none";
        if (boomInMainTitle) boomInMainTitle.style.display = "block";
      }
    }
  }

  if (homeBgVideo) {
    homeBgVideo.addEventListener("ended", function () {
      // Hide video and show Boom-In main title again
      if (homeBgVideoContainer) homeBgVideoContainer.style.display = "none";
      if (boomInMainTitle) boomInMainTitle.style.display = "block";
    });
  }

  options.forEach((opt) => {
    opt.addEventListener("click", function () {
      options.forEach((o) => o.classList.remove("selected"));
      this.classList.add("selected");
      const page = this.getAttribute("data-page");
      showPage(page);
    });
  });

  // Make appbar logo clickable to return home
  if (appbarLogo) {
    appbarLogo.addEventListener("click", function () {
      // Remove selected class from all options
      options.forEach((o) => o.classList.remove("selected"));
      // Add selected class to home option
      const homeOption = document.querySelector(
        '.boom-in-option-item[data-page="home"]'
      );
      if (homeOption) {
        homeOption.classList.add("selected");
      }
      // Navigate to home page
      showPage("home");
    });
  }

  // Initial state: show home
  showPage("home");

  // Mobile menu functionality
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileDropdown = document.getElementById("mobileDropdown");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

  if (mobileMenuToggle && mobileDropdown) {
    // Toggle mobile menu
    mobileMenuToggle.addEventListener("click", function () {
      const isActive = mobileDropdown.classList.contains("active");

      if (isActive) {
        mobileDropdown.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      } else {
        mobileDropdown.classList.add("active");
        mobileMenuToggle.classList.add("active");
      }
    });

    // Handle mobile nav item clicks
    mobileNavItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remove selected from all mobile items
        mobileNavItems.forEach((i) => i.classList.remove("selected"));
        // Add selected to clicked item
        this.classList.add("selected");

        // Also update desktop nav
        options.forEach((o) => o.classList.remove("selected"));
        const page = this.getAttribute("data-page");
        const desktopItem = document.querySelector(
          `.boom-in-option-item[data-page="${page}"]`
        );
        if (desktopItem) {
          desktopItem.classList.add("selected");
        }

        // Navigate to page
        showPage(page);

        // Close mobile menu
        mobileDropdown.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !mobileMenuToggle.contains(e.target) &&
        !mobileDropdown.contains(e.target)
      ) {
        mobileDropdown.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });
  }
});

// Handle contact form submission - Submit to Google Forms while keeping current design
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // TODO: Replace these with your actual Google Form field IDs
      // Instructions:
      // 1. Create your Google Form at forms.google.com
      // 2. Add Name, Email, Message fields
      // 3. Right-click on each field → "Inspect" to find the field names
      // 4. Look for name="entry.XXXXXXX" and copy those numbers
      // 5. Replace the values below

      const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdAmdQBFXs9aAVGcP6S5PEEhJokHmMKFX-u5bSFEbBQTmqIrQ/viewform";
      const NAME_FIELD = "entry.1752235031"; // Found field ID - need to verify which field this is
      const EMAIL_FIELD = "entry.1965386154"; // Replace with actual field ID  
      const MESSAGE_FIELD = "entry.1342546266"; // Replace with actual field ID
      
      if (GOOGLE_FORM_URL === "YOUR_GOOGLE_FORM_URL_HERE") {
        alert(
          "Google Form not set up yet! Please follow the setup instructions."
        );
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append(NAME_FIELD, name);
      formData.append(EMAIL_FIELD, email);
      formData.append(MESSAGE_FIELD, message);

      // Submit to Google Forms silently
      fetch(GOOGLE_FORM_URL.replace("/viewform", "/formResponse"), {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
        .then(() => {
          // Show success message
          alert(
            "Thanks for reaching out! Your message has been sent successfully. 🎉"
          );
          contactForm.reset();
        })
        .catch(() => {
          // Fallback - still show success since no-cors mode can't detect errors
          alert(
            "Thanks for reaching out! Your message has been sent successfully. 🎉"
          );
          contactForm.reset();
        });
    });
  }
});
