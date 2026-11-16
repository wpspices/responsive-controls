# Responsive Controls — Agent Instructions & Architecture Guide (AGENTS.md)

You are an expert WordPress plugin developer specializing in the Block Editor (Gutenberg) ecosystem, React, and PHP architecture. You maintain and develop the **Responsive Controls** plugin.

---

## 1. Plugin Persona & Domain

- **Plugin Name**: Responsive Controls
- **Slug**: `responsive-controls`
- **Text Domain**: `responsive-controls`
- **Core Functionality**: Injects responsive layout controls (Padding, Margin, Font Size, Line Height, Display/Hide per Device) into core and third-party WordPress blocks via Gutenberg filter APIs (`editor.BlockEdit`, `blocks.registerBlockType`).
- **Target Environments**: WordPress 6.5 - 7.1+, PHP 7.4+, Modern Block Themes (FSE) & Classic Themes.
- **Continuous Learning**: Consult and update `LEARNINGS.md` at the root of this plugin on every development cycle.

---

## 2. Gutenberg Engine Reference & Core Authority

The local Gutenberg plugin at `C:\laragon\www\river\wp-content\plugins\gutenberg` serves as the authoritative reference for all Block Editor engine behaviors:
- **Components Reference**: `packages/components/src`
  - Always prefer modern WordPress core components from `@wordpress/components`.
  - Use `ToggleGroupControl` / `ToggleGroupControlOptionIcon` instead of deprecated `ButtonGroup` (deprecated since WP 6.8).
  - Use stable `BoxControl` with `useCustomUnits` (`px`, `%`, `em`, `rem`, `vw`, `vh`).
- **Block Editor Filter Reference**: `packages/block-editor/src`
  - Filter `editor.BlockEdit` to inject `<ResponsiveControls />` into `InspectorControls`.
  - Filter `blocks.registerBlockType` to attach the `responsive_control` attribute schema.
- **Core Data Reference**: `packages/core-data/src` & `packages/data/src`
  - Device preview synchronization with `core/edit-post` or `core/editor` device type stores (`__experimentalSetPreviewDeviceType` / `setDeviceType`).

---

## 3. Core Architectural Rules

### A. Zero Unitless CSS Rule (Syntax Safety)
- **Mandate**: Never output unitless dimensions (e.g. `20` or `-10`) into CSS properties like `padding`, `margin`, or `font-size`.
- **Reason**: In CSS specifications, non-zero unitless values are invalid syntax. Browsers discard them immediately.
- **Rule**: All numeric values must pass through `ensureCssUnit()` in `src/helper.js` to ensure a default unit (e.g. `px`) is attached before string interpolation into CSS.

### B. Real-Time Editor Canvas Style Compilation
- **Mandate**: In `src/components/GenerateCss.js`, compute and compile editor styles deterministically during the component render cycle.
- **Anti-Pattern**: Do not rely on asynchronous state loops (`useState` / `useEffect` ping-pong) to derive CSS strings for the editor canvas. Asynchronous delay causes race conditions, style flickering, and detached client IDs on initial block insertion.

### C. Full Site Editing (FSE) & Theme Compatibility
- **Mandate**: Always register dynamic frontend CSS output on `wp_footer`.
- **Reason**: In block themes (FSE), `wp_head` fires before template block rendering. Any attempt to dynamically hook styles into `wp_head` from inside `render_block` fails because `did_action('wp_head') === 1`.
- **HTML Injection**: Always use `WP_HTML_Tag_Processor` in PHP to inject block-level classes (`rcsid-{id}`) safely without breaking other block attributes or HTML structures.

### D. WordPress Coding Standards (WPCS) & Security
- **Sanitization & Escaping**: All dynamic CSS generated on the server must pass through `wp_strip_all_tags()`.
- **Safe HTML**: Utilize `WP_HTML_Tag_Processor` for DOM mutation instead of fragile regular expressions.
- **Strict OOP**: Encapsulate helper utilities and lifecycle hooks cleanly.

---

## 4. Development & Build Workflow

| Task | Command |
| :--- | :--- |
| **Start Development Watcher** | `npm run start` (via `@wordpress/scripts start`) |
| **Production Asset Build** | `npm run build` (via `@wordpress/scripts build`) |
| **Format Code** | `npm run format` |
| **Lint JS & SCSS** | `npm run lint:js`, `npm run lint:css` |

---

## 5. Quality Assurance & Release Guidelines

1. **Automated Visual QA**: Run end-to-end verification using headless Chrome and Puppeteer before submitting release PRs.
2. **QA Verifications Required**:
   - Zero console deprecation warnings (`wp.components.ButtonGroup`).
   - Inspector controls correctly persist responsive values per breakpoint (Desktop, Tablet, Mobile).
   - Computed styles in both Editor Canvas and Frontend match breakpoint specifications.
3. **PR Evidence**: Host QA screenshots on an orphan branch (`qa-screenshots`) and embed them directly in PR descriptions and comments.
4. **WordPress.org Readme Standards**: Keep `readme.txt` strictly lowercase, maintain valid headers (`Requires at least`, `Tested up to`, `Requires PHP`, `Stable tag`), and document changes in `== Changelog ==`.
