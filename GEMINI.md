# Project: Jheison Quiroga Portfolio

## Project Overview
A personal static web portfolio for Jheison Dubán Quiroga, a Web Developer in training. The project showcases skills, projects, and contact information with a modern, dark-themed design featuring purple accents and interactive elements.

### Technologies
- **HTML5:** Semantic structure.
- **CSS3:** Custom styling using BEM methodology and CSS variables.
- **Tailwind CSS:** Used via CDN for utility classes and custom theme configuration.
- **JavaScript:** Client-side interactivity (dynamic date, mouse-following spotlight effect).
- **Fonts:** Inter (Sans) and JetBrains Mono (Mono) from Google Fonts.

### Architecture
- `index.html`: Main entry point and structure.
- `src/styles.css`: Main stylesheet containing layout, typography, and component styles.
- `src/js/script.js`: Interactive logic and DOM manipulation.
- `assets/`: Static assets like the CV in PDF format.

## Building and Running
Since this is a static website, there is no complex build process.

### Running Locally
1.  **Open File:** Simply open `index.html` in any modern web browser.
2.  **Local Server (Recommended):** Use a simple local server to avoid potential CORS issues or for a better development experience.
    - If you have Node.js: `npx serve .`
    - If you have Python: `python3 -m http.server`
    - VS Code: Use the "Live Server" extension.

### Deployment
The project is designed to be deployed via **GitHub Pages**.

## Development Conventions

### Styling (CSS)
- **Methodology:** Follows **BEM (Block Element Modifier)** for naming classes (e.g., `.header__container`, `.hero__title--featured`).
- **Variables:** Use the defined CSS variables in `:root` for consistency in colors and typography.
- **Responsiveness:** Ensure new sections are responsive. The project uses a mix of custom media queries and Tailwind utility classes.
- **Tailwind:** The Tailwind configuration is embedded in `index.html`. For deep styling changes, prefer `src/styles.css`.

### JavaScript
- Keep scripts modular if possible.
- Current functionality includes:
  - Updating the copyright year dynamically.
  - A mouse-tracking "spotlight" effect implemented via CSS variables (`--x`, `--y`) updated on `mousemove`.

### Structure
- Keep `index.html` semantic and well-commented.
- Add new projects to the `projects__grid` in `index.html` following the existing `article.project` pattern.
