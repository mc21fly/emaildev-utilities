# EmailDev Utilities

Simple VSCode extension to help track elements in your code that are **not allowed in email development**.

---

## Features

-   Track `<table>` elements missing `role="presentation"`, `border="0"`, `cellpadding="0"`, or `cellspacing="0"`.
-   Track inline `style` attributes containing both `font-size` and `line-height` in `px`.
-   Track `<img>` elements without an `alt` attribute (including empty strings like `alt=""`).
-   Track all `alt` attributes.
-   Replace `line-height` in `px` with **unitless and percentage values**, excluding exceptions.
-   Wrap selection in `<span style="white-space:nowrap;">selection</span>`. Spaces are converted to `&nbsp;` for proper email rendering. Example: `Lorem ipsum dolor sit` → `<span style="white-space:nowrap;">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit</span>`.
-   Wrap selection in `<sup style="line-height:0;">selection</sup>`.
-   Replace `alt`, `src`, or `href` attribute values via input box.
-   Insert `&#8205;` (zero-width joiner) between characters in selection.
-   Wrap selection in `<strong style="font-weight:900;">selection</strong>`.
-   **Compress selection** by removing extra whitespace and line breaks, then copy result to clipboard (`ALT+Q`).

---

## Commands

| Command                                                | Description                                                                                | Default Keybinding                    |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------- |
| `EDU: Highlight styles with font-size and line-height` | Toggle highlighting of styles with `font-size` and `line-height`                           | N/A                                   |
| `EDU: Highlight tables without needed attributes`      | Toggle highlighting of `<table>` elements missing required attributes                      | N/A                                   |
| `EDU: Highlight imgs without alt tags`                 | Toggle highlighting of `<img>` elements without `alt`                                      | N/A                                   |
| `EDU: Highlight alt tags`                              | Toggle highlighting of `alt` attributes                                                    | N/A                                   |
| `EDU: Enable extension`                                | Turn the extension on or off                                                               | N/A                                   |
| `EDU: Replace line-height in px`                       | Convert `line-height` in `px` to **unitless and percentage values** (excluding exceptions) | N/A                                   |
| `EDU: Wrap selection with <span>`                      | Wrap selection with `<span style="white-space:nowrap;">`                                   | Win: `CTRL+W`<br>Mac: `CMD+W`         |
| `EDU: Wrap selection with <sup>`                       | Wrap selection with `<sup style="line-height:0;">`                                         | Win: `CTRL+E`<br>Mac: `CMD+E`         |
| `EDU: Replace href, alt or src attribute value`        | Replace old value with a new one via input box                                             | Win/Mac: `ALT+F2`                     |
| `EDU: Put &#8205; between characters in selection`     | Insert zero-width joiner between characters                                                | Win: `CTRL+ALT+W`<br>Mac: `CMD+ALT+W` |
| `EDU: Wrap selection with <strong>`                    | Wrap selection with `<strong style="font-weight:900;">`                                    | Win: `CTRL+ALT+Q`<br>Mac: `CMD+ALT+Q` |
| `EDU: Copy and Compress Selection`                     | Remove extra spaces/newlines from selection and copy to clipboard                          | Win/Mac: `ALT+Q`                      |

---

## Release Notes

### 1.6.4

-   Added new command `Copy and Compress Selection` (keybinding: `ALT+Q`).

### 1.6.3

-   Minor fixes and optimizations.

### 1.6.0

-   Added `Wrap selection with <strong>` (weight 900).

### 1.5.2

-   Fixed README formatting.
-   Updated zero-width joiner usage to `&#8205;`.

### 1.5.1

-   Fixed bug in `Wrap selection with <span>`.

### 1.5.0

-   Added `Put &#8205; between characters in selection`.

### 1.4.1

-   Fixed bug in `Highlight alt tags`.

### 1.4.0

-   Added `Replace href, alt or src attribute value`.
-   Refactored core code for better readability.

### 1.3.0

-   Added `Highlight alt tags`.

### 1.2.0

-   Added `Wrap selection with <sup>`.
-   Renamed `Wrap selection` to `Wrap selection with <span>`.

### 1.1.2

-   Updated keybinding for `Wrap selection` to `CTRL+W` / `CMD+W`.

### 1.1.1

-   Fixed bug in `Wrap selection`.

### 1.1.0

-   Added `Wrap selection` function.

### 1.0.3

-   Tracking now works only in HTML files.

### 1.0.2

-   Added exception handling for line-height replacements.

### 1.0.1

-   Added `Replace line-height in px` function.

### 1.0.0

-   Initial release.
