const ScrollReveal = (() => {
  const init = () => {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 4) * 80}ms`;
      observer.observe(el);
    });
  };

  return { init };
})();

