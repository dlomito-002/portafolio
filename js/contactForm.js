const ContactForm = (() => {
  const form = document.getElementById("contactForm");
  if (!form) return { init: () => {} };

  const fields = {
    name: {
      input: document.getElementById("name"),
      group: document.getElementById("nameGroup"),
      error: document.getElementById("nameError"),
      validate: (value) => (value.trim().length < 2 ? "Escribe tu nombre." : ""),
    },
    email: {
      input: document.getElementById("email"),
      group: document.getElementById("emailGroup"),
      error: document.getElementById("emailError"),
      validate: (value) =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? "Ingresa un correo válido."
          : "",
    },
    message: {
      input: document.getElementById("message"),
      group: document.getElementById("messageGroup"),
      error: document.getElementById("messageError"),
      validate: (value) =>
        value.trim().length < 10 ? "Tu mensaje debe tener al menos 10 caracteres." : "",
    },
  };

  const statusEl = document.getElementById("formStatus");

  const validateField = (key) => {
    const field = fields[key];
    const message = field.validate(field.input.value);
    field.error.textContent = message;
    field.group.classList.toggle("has-error", Boolean(message));
    return !message;
  };

  const init = () => {
    Object.keys(fields).forEach((key) => {
      fields[key].input.addEventListener("blur", () => validateField(key));
      fields[key].input.addEventListener("input", () => {
        if (fields[key].group.classList.contains("has-error")) {
          validateField(key);
        }
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      statusEl.classList.remove("is-visible");

      const results = Object.keys(fields).map((key) => validateField(key));
      const isValid = results.every(Boolean);

      if (isValid) {
        statusEl.classList.add("is-visible");
        form.reset();
      }
    });
  };

  return { init };
})();
