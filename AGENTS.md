# Repository Guidelines

## Project Structure & Module Organization
This repository is a static portfolio site (no build pipeline). Keep changes scoped to the existing layout:

- `index.html`: Main page structure, content sections, and Tailwind CDN config.
- `src/styles.css`: Core styles, CSS variables, responsive rules, and BEM-based classes.
- `src/js/script.js`: UI behavior (active nav state, spotlight effect, skills carousel, date rendering).
- `assets/`: Static files (for example `assets/JheisonQuirogaCV.pdf`).
- `.github/agents/`: Agent-specific workflow notes.

## Build, Test, and Development Commands
Use a lightweight local server for development:

- `python3 -m http.server 8000`: Serve the site locally.
- `npx serve .`: Alternative static server with cleaner routing behavior.
- `open index.html` (or browser double-click): Quick visual check without a server.

There is no compile step; deployment targets GitHub Pages.

## Coding Style & Naming Conventions
- Use semantic HTML sections and keep IDs aligned with nav anchors (`#inicio`, `#proyectos`, etc.).
- Follow BEM naming for custom CSS (`block__element--modifier`) and reuse `:root` variables for colors/fonts.
- Use 2-space indentation in HTML/CSS/JS to match current files.
- Prefer small, focused DOM handlers in `src/js/script.js`; avoid global side effects beyond page UI behavior.
- Keep text/content edits in Spanish unless the section is intentionally bilingual.

## Testing Guidelines
No automated test suite is configured yet. Validate changes manually before opening a PR:

1. Run a local server and check all sections/anchors.
2. Verify responsive behavior on mobile and desktop widths.
3. Confirm interactive features: nav active state, carousel movement, and spotlight/mouse effects.
4. Re-check console for JavaScript errors.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects in English (for example: `Fix ...`, `Add ...`, `Refactor ...`).

- Keep commit titles concise and action-oriented.
- Group related HTML/CSS/JS changes in one commit.
- PRs should include: purpose summary, affected sections, before/after screenshots for UI changes, and linked issue (if any).
- Call out accessibility/responsiveness impact in the PR description.

## Agent-Specific Notes
If using repository agents, align with `.github/agents/agent-portfolio.agent.md`: prioritize responsive, professional portfolio updates and keep project/skills/contact sections up to date.
