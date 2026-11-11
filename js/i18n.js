const I18n = (() => {
  const STORAGE_KEY = "portfolio-lang";
  const DEFAULT_LANG = "es";

  const getLang = () => localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  const getDict = () => Translations[getLang()] || Translations[DEFAULT_LANG];

  const t = (key, params = {}) =>
    Object.entries(params).reduce(
      (text, [name, value]) => text.replace(`{${name}}`, value),
      getDict()[key] || ""
    );

  const getAge = (birthdate) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const hadBirthday =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    return hadBirthday ? age : age - 1;
  };

  const applyMeta = (dict) => {
    document.title = dict.meta_title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict.meta_description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", dict.meta_title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", dict.meta_description);
  };

  const applyTextNodes = (dict) => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] === undefined) return;
      el.textContent = el.dataset.birthdate
        ? dict[key].replace("{age}", getAge(el.dataset.birthdate))
        : dict[key];
    });
  };

  const applyCarouselLabels = (dict) => {
    document.querySelectorAll(".project-carousel__dot").forEach((dot) => {
      dot.setAttribute(
        "aria-label",
        dict.carousel_goto.replace("{n}", Number(dot.dataset.index) + 1)
      );
    });

    document.querySelectorAll(".project-carousel__slide").forEach((slide) => {
      const { shot, project } = slide.dataset;
      const fill = (text) => text.replace("{n}", shot).replace("{project}", project);
      slide.setAttribute("aria-label", fill(dict.shot_open));
      if (shot !== "1") slide.querySelector("img").setAttribute("alt", fill(dict.shot_alt));
    });
  };

  const applyAttributeNodes = (dict) => {
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr")
        .split(",")
        .forEach((pair) => {
          const [attr, key] = pair.split(":").map((part) => part.trim());
          if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
        });
    });
  };

  const updateToggleLabel = (lang) => {
    const toggle = document.getElementById("langToggle");
    if (!toggle) return;
    toggle.textContent = lang === "es" ? "EN" : "ES";
  };

  const applyTranslations = (lang) => {
    const dict = Translations[lang] || Translations[DEFAULT_LANG];
    applyMeta(dict);
    applyTextNodes(dict);
    applyAttributeNodes(dict);
    applyCarouselLabels(dict);
    document.documentElement.setAttribute("lang", lang);
    updateToggleLabel(lang);
  };

  const setLang = (lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
  };

  const init = () => {
    applyTranslations(getLang());

    const toggle = document.getElementById("langToggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const nextLang = getLang() === "es" ? "en" : "es";
      setLang(nextLang);
      document.dispatchEvent(new CustomEvent("langchange"));
    });
  };

  return { init, setLang, getLang, t };
})();
