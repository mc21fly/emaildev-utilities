# emaildev-utilities README

Simple extension that will help you to track some elements in your code, that are not allowed in email development.

## Features

- Tracking `<table>` elements without `role="presentation"`, `border="0"`, `cellpadding="0"` and `cellspacing="0"`
- Tracking `<style>` elements where are `font-size` and `line-height` given in `px`
- Tracking `<img>` elements without `alt` tag (also with empty string e.g. `alt=""`)

## Commands

- `EDU: Highlight styles with font-size and line-height`: turn on/off the styles highlight
- `EDU: Highlight tables without needed attributes`: turn on/off the tables highlight
- `EDU: Highlight imgs without alt tags`: turn on/off the imgs highlight
- `EDU: Enable extension`: turn on/off extenstion

## Known Issues

There is no known issues.

## Release Notes

### 1.0.0

Initial release of Emaildev-utilities