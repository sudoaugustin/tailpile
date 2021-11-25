# Change Log

## [0.1.0](https://github.com/sudoaugustin/tailpile/releases/tag/v0.1.0) - 2021-11-25

### Added everthing 🚀.

### Published to visual studio code marketplace.

## [0.0.2](https://github.com/sudoaugustin/tailpile/compare/v0.0.1...v0.0.2) - 2021-11-17

### Everything work fine until tailwindcss@alpha0.0.2 was used

### Problem

- When using **tailwindcss@alpha0.0.2** an jspm generator error occur.

### Removed

- Babel to transpile the fetched code to support node v10

## [0.0.1](https://github.com/sudoaugustin/tailpile/releases/tag/v0.0.1) - 2021-11-07

### Added

- `bundle` func under the uilt folder to support bundling more than `tailwindcss`
- Support `tailwindcss/nesting`
- Babel to transpile the fetched code to support node v10

### Removed

- `webpack.resolve.fallback` bec babel solved the issue by transpiling `import` into `require`
