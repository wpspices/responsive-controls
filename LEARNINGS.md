# Project Continuous Learning & Feedback Log (LEARNINGS.md)

This document is the persistent memory and feedback log for agents working on the **Responsive Controls** plugin. Consult this file before modifying block controls, CSS compilation, or release workflows.

---

## 1. Bug Diagnoses & Technical Root Causes

### 1. Broken Padding & Margin Controls (Unitless CSS Bug)
- **Symptom**: User configured padding and margin in the inspector, but no visual changes occurred in the editor canvas or frontend.
- **Root Cause**:
  - The Gutenberg `<BoxControl />` component was emitting unitless numeric values (e.g., `{ top: 20, right: 20, bottom: 20, left: 20 }`) when custom units were not explicitly declared.
  - The helper string generator `src/helper.js` interpolated this directly into CSS:
    ```css
    padding-top: 20 !important;
    ```
  - According to CSS specifications (CSS Values and Units Module Level 3/4), non-zero length values without an explicit unit (like `px`, `rem`, `%`) are **syntactically invalid**. Browsers silently drop invalid CSS declarations.
- **Solution**:
  - Added `ensureCssUnit()` in `src/helper.js` to normalize any numeric or unitless dimension string:
    ```javascript
    export const ensureCssUnit = (val, defaultUnit = 'px') => {
        if (val === undefined || val === null || val === '') return '';
        if (typeof val === 'number') return `${val}${defaultUnit}`;
        const str = String(val).trim();
        if (/^-?\d+(\.\d+)?$/.test(str)) return `${str}${defaultUnit}`;
        return str;
    };
    ```
  - Added `units={ useCustomUnits( { availableUnits: [ 'px', '%', 'em', 'rem', 'vw', 'vh' ], defaultUnit: 'px' } ) }` to `<BoxControl />` in `src/components/PaddingMargin.js`, allowing users to select their preferred units while safely defaulting to `px`.

---

### 2. WordPress 6.8+ `ButtonGroup` Deprecation
- **Symptom**: Console warning in Gutenberg editor:
  ```text
  deprecated.js:64 wp.components.ButtonGroup is deprecated since version 6.8. Please use wp.components.__experimentalToggleGroupControl instead.
  ```
- **Root Cause**: Core WordPress deprecated `ButtonGroup` in favor of `ToggleGroupControl` (and `ToggleGroupControlOptionIcon`).
- **Solution**:
  - In `src/components/SelectDevice.js`, detected available component export:
    ```javascript
    const ToggleGroup = ToggleGroupControl || __experimentalToggleGroupControl;
    const ToggleGroupOptionIcon = ToggleGroupControlOptionIcon || __experimentalToggleGroupControlOptionIcon;
    ```
  - If neither exists (older WP versions), gracefully degraded to an accessible button group with `role="group"`.
  - In `src/components/HideInDevice.js`, transitioned multi-select device visibility buttons to independent toggle buttons with clear `aria-pressed` state and `isPressed` properties.

---

### 3. Editor Canvas Style Lag & Detached Client IDs
- **Symptom**: Styles in editor canvas would occasionally lag behind inspector inputs or apply to incorrect blocks when switching quickly.
- **Root Cause**: `src/components/GenerateCss.js` previously maintained internal component `useState` for CSS strings and updated it inside a `useEffect` hook. This asynchronous two-step cycle created race conditions between block selection and style injection.
- **Solution**:
  - Converted editor CSS calculation to direct derivation during the React render pass.
  - Dynamically mounted the `<style>` tag into the editor canvas head or body with an exact `#block-${clientId}` selector, ensuring instant style feedback on every input stroke.

---

### 4. Full Site Editing (FSE) / Block Theme CSS Injection Timing
- **Symptom**: On block themes (such as Twenty Twenty-Five), custom responsive styles were not rendering on the frontend.
- **Root Cause**:
  - The plugin originally hooked styles onto `wp_head` from inside the `render_block` PHP filter.
  - In block themes, template parts and blocks are parsed and rendered when the page template executes. At that point, `wp_head` has **already fired** (`did_action('wp_head') === 1`). The hook was registered too late.
- **Solution**:
  - Accumulated responsive CSS rules in a static class variable during `render_block`.
  - Registered the CSS output callback on `wp_footer`:
    ```php
    add_action('wp_footer', [__CLASS__, 'print_dynamic_styles'], 100);
    ```
  - `wp_footer` is guaranteed to execute after all blocks on the page have completed rendering in both classic and block themes.

---

### 5. Safe HTML Class Mutation with `WP_HTML_Tag_Processor`
- **Symptom**: Traditional regex matching for `<div class="..."` occasionally broke nested blocks or attributes with similar class prefixes.
- **Solution**:
  - Upgraded `render_block` in `responsive-controls.php` to use WordPress core's `WP_HTML_Tag_Processor`:
    ```php
    $processor = new WP_HTML_Tag_Processor($block_content);
    if ($processor->next_tag()) {
        $processor->add_class('rcsid-' . $client_id);
        $block_content = $processor->get_updated_html();
    }
    ```
  - Provided a safe fallback for WordPress versions prior to 6.2.

---

### 6. Gutenberg Iframe Style Warning (False Positive Analysis)
- **Log**:
  ```text
  global-styles-css-custom-properties-inline-css was added to the iframe incorrectly. Please use block.json or enqueue_block_assets to add styles to the iframe.
  ```
- **Finding**:
  - This is an internal WordPress core warning caused by core's own stylesheet registration handle `global-styles-css-custom-properties`.
  - The Gutenberg editor iframe mechanism inspects enqueued style tags and expects them to start with `wp-` prefix or come from `block.json`.
  - This warning does not break plugin functionality and is a known core false positive.

---

## 2. Release & Repository Workflow Learnings

### 1. WordPress.org File Case Sensitivity (`readme.txt`)
- WordPress.org SVN and repository guidelines strictly require lowercase `readme.txt`.
- An uppercase `README.txt` causes linting warnings and potential distribution failures on case-sensitive Linux build systems.
- When renaming on Windows (case-insensitive filesystem), use a two-step git command:
  ```bash
  git mv README.txt readme.tmp && git mv readme.tmp readme.txt
  ```

### 2. Changelog Formatting vs Header Metadata
- `Tested up to: 7.1` must be placed exclusively in the header section of `readme.txt`.
- Do not repeat `* Tested up to WordPress 7.1.` inside the `== Changelog ==` bullet list unless requested.

### 3. Visual QA Automation & GitHub PR Attachment
- Do not pollute release branches or distribution zip archives with ad-hoc QA images.
- Create an orphan branch `qa-screenshots` to permanently store and host QA screenshots:
  ```bash
  git worktree add --orphan -b qa-screenshots <path>
  # copy screenshots, commit and push
  git push -u origin qa-screenshots
  ```
- Reference the images via `https://raw.githubusercontent.com/<owner>/<repo>/qa-screenshots/<image>.png` directly in PR descriptions and comments for complete visual proof.
