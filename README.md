# emaildev-utilities README

Simple extension that will help you to track some elements in your code, that are not allowed in email development.

## Features

- Tracking `<table>` elements without `role="presentation"`, `border="0"`, `cellpadding="0"` and `cellspacing="0"`
- Tracking `style` attributes where are `font-size` and `line-height` given in `px`
- Tracking `<img>` elements without `alt` tag (also with empty string e.g. `alt=""`)
- Replacing `line-height` given in px, to be unitless and in percentage.
- Adding exception for styles replacement.

## Commands

- `EDU: Highlight styles with font-size and line-height`: turn on/off the styles highlight
- `EDU: Highlight tables without needed attributes`: turn on/off the tables highlight
- `EDU: Highlight imgs without alt tags`: turn on/off the imgs highlight
- `EDU: Enable extension`: turn on/off extenstion
- `EDU: Replace line-height in px`: automatically converts `line-height` in px to be unitless and in percentage e.g. `font-size: 14px; line-height: 21px` will be converted to `font-size: 14px; line-height: 125%; line-height: 1.5!important;`

## Known Issues

There is no known issues.

## Release Notes

### 1.0.3

- Tracking only available in `html` files

### 1.0.2
- Exceptions added

### 1.0.1

- `Replace line-height in px` function added.

### 1.0.0

Initial release of Emaildev-utilities