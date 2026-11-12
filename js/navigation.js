const Navigation = (() => {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  const navLinks = document.querySelectorAll(".nav-link");

  const setMenuState = (isOpen) => {
    navList.classList.toggle("is-open", isOpen);
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", I18n.t(isOpen ? "nav_close" : "nav_open"));
  };

  const closeMenu = () => setMenuState(false);

  const initHeaderScroll = () => {
    const toggleHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", toggleHeaderState, { passive: true });
    toggleHeaderState();
  };

  const initMobileMenu = () => {
    navToggle.addEventListener("click", () =>
      setMenuState(!navList.classList.contains("is-open"))
    );

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navList.classList.contains("is-open")) {
        closeMenu();
        navToggle.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (!navList.classList.contains("is-open")) return;
      if (!navList.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
    });

    document.addEventListener("langchange", () =>
      setMenuState(navList.classList.contains("is-open"))
    );
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
