document.addEventListener("DOMContentLoaded", () => {
  // ===== REVEAL ON SCROLL ANIMATION =====
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger immediately on load

  // ===== MOBILE MENU TOGGLE =====
  const menuBtn = document.getElementById("mobile-menu");
  const nav = document.querySelector(".nav-links");

  if (menuBtn) {
    // Toggle menu on button click
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("active");
      
      // Animate hamburger to X (optional)
      menuBtn.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove("active");
        menuBtn.classList.remove("active");
      }
    });
  }

  // ===== DYNAMIC YEAR IN FOOTER =====
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    // If no specific year span, update any footer copyright year
    const footer = document.querySelector('footer p');
    if (footer) {
      const currentYear = new Date().getFullYear();
      footer.innerHTML = footer.innerHTML.replace(/2025/g, currentYear);
    }
  }

  // ===== EMAIL VALIDATION HELPER =====
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ===== FORM MESSAGE DISPLAY HELPER =====
  function showFormMessage(message, type) {
    // Check if message element already exists
    let messageEl = document.querySelector('.form-status-message');
    
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.className = 'form-status-message';
      const contactForm = document.getElementById('contactForm');
      contactForm.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `form-status-message ${type}`;
    
    // Remove message after 5 seconds
    setTimeout(() => {
      if (messageEl) {
        messageEl.remove();
      }
    }, 5000);
  }

  // ===== CONTACT FORM HANDLER (demo with validation) =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form fields
      const name = contactForm.querySelector('input[type="text"]').value.trim();
      const email = contactForm.querySelector('input[type="email"]').value.trim();
      const message = contactForm.querySelector("textarea").value.trim();

      // Validation
      if (!name || !email || !message) {
        showFormMessage("⚠️ Please fill in all fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage("⚠️ Please enter a valid email address.", "error");
        return;
      }

      if (message.length < 10) {
        showFormMessage("📝 Message should be at least 10 characters.", "error");
        return;
      }

      // Success message (demo)
      showFormMessage("✨ Thanks for reaching out! (Demo - your message would be sent)", "success");
      
      // Optionally log to console (for demo)
      console.log("Form submission demo:", { name, email, message });
      
      // Reset form
      contactForm.reset();
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ===== ACTIVE NAV LINK HIGHLIGHT ON SCROLL =====
  const sections = document.querySelectorAll("section[id]");
  
  function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active-link");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active-link");
          }
        });
      }
    });
  }
  
  window.addEventListener("scroll", highlightNavLink);
  
  // ===== ADD SOME CSS FOR ACTIVE NAV LINK =====
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active-link {
      color: var(--primary) !important;
      border-bottom: 2px solid var(--primary);
    }
    
    .form-status-message {
      margin-top: 1rem;
      padding: 0.8rem;
      border-radius: 8px;
      text-align: center;
      font-size: 0.9rem;
      animation: fadeIn 0.3s ease;
    }
    
    .form-status-message.success {
      background: rgba(204, 255, 0, 0.1);
      color: var(--secondary);
      border: 1px solid var(--secondary);
    }
    
    .form-status-message.error {
      background: rgba(255, 0, 0, 0.1);
      color: #ff6b6b;
      border: 1px solid #ff6b6b;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .menu-toggle.active .bar:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active .bar:nth-child(2) {
      opacity: 0;
    }
    
    .menu-toggle.active .bar:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  `;
  document.head.appendChild(style);
});