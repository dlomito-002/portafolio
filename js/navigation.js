const Navigation = (() => {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  const navLinks = document.querySelectorAll(".nav-link");

  const closeMenu = () => {
    navList.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const initHeaderScroll = () => {
    const toggleHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", toggleHeaderState, { passive: true });
    toggleHeaderState();
  };

  const initMobileMenu = () => {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  };

  const initActiveLinkOnScroll = () => {
    const sections = document.querySelectorAll("main section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${id}`
            );
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  };

  const init = () => {
    initHeaderScroll();
    initMobileMenu();
    initActiveLinkOnScroll();
  };

  return { init };
})();
