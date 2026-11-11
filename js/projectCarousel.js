const ProjectCarousel = (() => {
  let openGallery = [];
  let openIndex = 0;
  let lastFocused = null;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  const setupCarousel = (carousel) => {
    const track = carousel.querySelector(".project-carousel__track");
    const slides = Array.from(carousel.querySelectorAll(".project-carousel__slide"));
    const prevBtn = carousel.querySelector(".project-carousel__arrow--prev");
    const nextBtn = carousel.querySelector(".project-carousel__arrow--next");
    const dots = Array.from(carousel.querySelectorAll(".project-carousel__dot"));
    let index = 0;

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) =>
        dot.classList.toggle("is-active", dotIndex === index)
      );
    };

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));
    dots.forEach((dot) =>
      dot.addEventListener("click", () => goTo(Number(dot.dataset.index)))
    );

    slides.forEach((slide) =>
      slide.addEventListener("click", () => open(slides, Number(slide.dataset.index)))
    );
  };

  const renderLightbox = () => {
    const img = openGallery[openIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent =
      openGallery.length > 1 ? `${openIndex + 1} / ${openGallery.length}` : "";
    const multi = openGallery.length > 1;
    lightboxPrev.style.display = multi ? "flex" : "none";
    lightboxNext.style.display = multi ? "flex" : "none";
  };

  const open = (slides, index) => {
    openGallery = slides.map((slide) => slide.querySelector("img"));
    openIndex = index;
    renderLightbox();
    lastFocused = document.activeElement;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  const trapFocus = (e) => {
    const focusable = Array.from(lightbox.querySelectorAll("button")).filter(
      (btn) => btn.style.display !== "none"
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const step = (delta) => {
    openIndex = (openIndex + delta + openGallery.length) % openGallery.length;
    renderLightbox();
  };

  const initLightboxControls = () => {
    lightboxClose.addEventListener("click", close);
    lightboxPrev.addEventListener("click", () => step(-1));
    lightboxNext.addEventListener("click", () => step(1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "Tab") trapFocus(e);
    });
  };

  const init = () => {
    if (!lightbox) return;
    document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
    initLightboxControls();
  };

  return { init };
})();
