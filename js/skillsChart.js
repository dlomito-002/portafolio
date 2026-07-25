const SkillsChart = (() => {
  const CIRCUMFERENCE = 289.03; // 2 * PI * r(46)

  const animateCard = (card) => {
    const percent = Number(card.dataset.percent) || 0;
    const progressCircle = card.querySelector(".skill-donut__progress");
    const valueLabel = card.querySelector(".skill-donut__value");

    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    progressCircle.style.strokeDashoffset = offset;

    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(progress * percent);
      valueLabel.textContent = `${current}%`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const resetCard = (card) => {
    const progressCircle = card.querySelector(".skill-donut__progress");
    const valueLabel = card.querySelector(".skill-donut__value");
    progressCircle.style.transition = "none";
    progressCircle.style.strokeDashoffset = CIRCUMFERENCE;
    valueLabel.textContent = "0%";
    requestAnimationFrame(() => {
      progressCircle.style.transition = "";
    });
  };

  const init = () => {
    const cards = document.querySelectorAll(".skill-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCard(entry.target);
          } else {
            resetCard(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    cards.forEach((card) => observer.observe(card));
  };

  return { init };
})();

