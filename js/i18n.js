const I18n = (() => {
  const STORAGE_KEY = "portfolio-lang";
  const DEFAULT_LANG = "es";

  const getLang = () => localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

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
      if (dict[key] !== undefined) el.textContent = dict[key];
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
    });
  };

  return { init, setLang, getLang };
})();
