# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Portafolio personal estático de Diego Velásquez: **solo HTML, CSS y JavaScript vanilla**. No hay frameworks, librerías, bundler, `package.json` ni pruebas, y no debe añadirse ninguno. La única dependencia externa es la fuente Inter de Google Fonts.

## Ejecutar

No hay build ni lint. Sirve la carpeta con cualquier servidor estático (`python3 -m http.server 8765`) y abre `index.html`.

## Arquitectura

- **Una sola página** (`index.html`) con secciones `#hero`, `#about`, `#skills`, `#education`, `#projects`, `#contact`. El HTML está escrito a mano: no hay plantillas ni generación de tarjetas, así que agregar un proyecto o una habilidad significa copiar el bloque HTML correspondiente.
- **CSS** se carga en este orden fijo: `reset` → `variables` → `base` → `components` → `layout` → `animations` → `responsive`. Los tokens (colores, espaciados, tipografía) viven en `variables.css`; casi todo el CSS de secciones está en `layout.css`. Los breakpoints están en `responsive.css` (768px y 480px) y `components.css` (640px, lightbox).
- **JS**: cada módulo es un IIFE global (`I18n`, `Navigation`, `ScrollReveal`, `ProjectCarousel`, `Translations`). Se cargan con `defer` en el orden de `index.html` y `main.js` los inicializa en `DOMContentLoaded`. Sin módulos ES: el orden de los `<script>` importa (`translations.js` e `i18n.js` antes de `navigation.js`, que usa `I18n.t`).

## i18n (ES/EN)

El contenido visible está en español **dentro del HTML** y se sobrescribe con `js/translations.js` según el idioma guardado en `localStorage` (`portfolio-lang`, por defecto `es`).

- `data-i18n="clave"` reemplaza el `textContent`; `data-i18n-attr="atributo:clave,..."` reemplaza atributos (`aria-label`, `alt`).
- Texto nuevo requiere **la misma clave en `Translations.es` y `Translations.en`**; si falta una, queda el texto en español del HTML.
- Plantillas con `{n}`, `{project}`, `{age}`: las rellena `i18n.js`. La edad se calcula desde `data-birthdate`; las etiquetas de los puntos del carrusel y los `alt`/`aria-label` de capturas se generan desde `data-index`, `data-shot` y `data-project`.
- `I18n.t(clave, params)` expone traducciones a otros módulos; el cambio de idioma emite el evento `langchange`.
- Las etiquetas de tecnología (`.tag`), nombres de proyecto y de habilidades técnicas no se traducen.

## Convenciones del contenido

- Las habilidades técnicas se muestran por nivel (`data-level="1|2|3"` → Básico/Intermedio/Avanzado), no por porcentaje.
- Cada tarjeta de proyecto lleva tipo, rol, descripción, etiquetas de tecnología verificadas contra su repositorio y enlace a GitHub. Las capturas van en `assets/img/projects/<proyecto>/<proyecto>-NN.jpg` (~900px de ancho), con `width`/`height` y `loading="lazy"`.
- Los `.reveal` se animan una sola vez con `IntersectionObserver` (`scrollReveal.js`).
- El CV descargable está en `assets/docs/CV-Diego-Velasquez.pdf` y no debe incluir dirección de domicilio.
- Faltan `og:image` y `canonical` hasta tener la URL pública del sitio.

## Git

Ramas por tarea (`PF00N`) con PRs hacia `main`; commits en español con prefijo convencional (`feat:`, `fix:`, `chore:`).
