// script.js
// Lightweight enhancements for Robert Aaron Graham portfolio

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------
     Smooth scrolling for internal links
     ----------------------------------------- */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.slice(1); // remove "#"
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      event.preventDefault();

      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update URL hash without jumping
      if (history.replaceState) {
        history.replaceState(null, "", `#${targetId}`);
      }
    });
  });

  /* -----------------------------------------
     Highlight active nav link on scroll
     ----------------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;
          navLinks.forEach((link) => {
            const linkId = link.getAttribute("href").slice(1);
            link.classList.toggle("active", linkId === id);
          });
        });
      },
      {
        threshold: 0.5, // section is "active" when ~50% in view
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* -----------------------------------------
     Header shadow / state on scroll
     ----------------------------------------- */
  const header = document.querySelector("header");

  if (header) {
    const toggleHeaderScrolled = () => {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    toggleHeaderScrolled(); // run once on load
    window.addEventListener("scroll", toggleHeaderScrolled, { passive: true });
  }
});
