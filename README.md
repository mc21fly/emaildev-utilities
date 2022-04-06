Simple extension that will help you to track some elements in your code, that are not allowed in email development.

## Features

- Tracking `<table>` elements without `role="presentation"`, `border="0"`, `cellpadding="0"` and `cellspacing="0"`
- Tracking `style` attributes where are `font-size` and `line-height` given in `px`
- Tracking `<img>` elements without `alt` tag (also with empty string e.g. `alt=""`)
- Tracking all `alt` tags.
- Replacing `line-height` given in px, to be unitless and in percentage excluding exceptations.
- Wraping selection into `<span style="white-space:nowrap;">selection</span>`. If selection contains whitespaces, they will be changed for `&nbsp;` e.g. `Lorem ipsum dolor sit` will be changed into `<span style="white-space: nowrap;">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit</span>`
- Wraping selection into `<sup style="line-height:100%;">selection</sup>`.
- Replacing `alt`, `src` and `href` attribute values.

## Commands

- `EDU: Highlight styles with font-size and line-height`: turn on/off the styles highlight
- `EDU: Highlight tables without needed attributes`: turn on/off the tables highlight
- `EDU: Highlight imgs without alt tags`: turn on/off the imgs highlight
- `EDU: Highlight alt tags`: turn on/off the alt tags highlight;
- `EDU: Enable extension`: turn on/off extenstion
- `EDU: Replace line-height in px`: convert `line-height` in px to be unitless and in percentage excluding exceptations.
- `EDU: Wrap selection with <span>`: wrap selection with `<span style="white-space:nowrap;">`_SELECTION_`</span>`

  - Default keybinding:
    - Win: `CTRL` + `W`
    - Mac: `CMD` + `W`

- `EDU: Wrap selection with <sup>`: wrap selection with `<sup style="line-height:100%;">`_SELECTION_`</sup>`

  - Default keybinding:
    - Win: `CTRL` + `E`
    - Mac: `CMD` + `E`

- `EDU: Replace href, alt or src attribute value`: replace old value with new one, by copying it into `Input box`. (Cursor must be in one of given attribute position)
  - Default keybinding:
    - Win: `ALT` + `F2`
    - Mac: `ALT` + `F2`

## Release Notes

### 1.4.1

- `Highlight alt tags` bug fixed.

### 1.4.0

- `Replace href, alt or src attribute value` function added.
- Code refactor.

### 1.3.0

- `Highlight alt tags` function added.

### 1.2.0

- `Wrap selection with <sup>` function added.
- `Wrap selection` renamed to `Wrap selection with <span>`.

### 1.1.2

- `Wrap selection` command keybinding changed to be `CTRL+W`, `CMD+W`

### 1.1.1

- `Wrap selection` bug fixed.

### 1.1.0

- `Wrap selection` function added.

### 1.0.3

- Tracking only available in `html` files

### 1.0.2

- Exceptions added

### 1.0.1

- `Replace line-height in px` function added.

### 1.0.0

Initial release of Emaildev-utilities
