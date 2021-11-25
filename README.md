# Tailpile

### Transpile tailwindcss into purecss files on save.

> Tailwindcss comes with the concept of node, package managers, configs files which may be unnecessary for some developers and css designers. Tailpile gives easy to use tailwindcss experience by transpiling tailwindcss into purecss just on file save.

![⌛](https://raw.githubusercontent.com/sudoaugustin/tailpile/main/.github/Preview.gif)

</br>

## 📦 Installation

**[Install via VSCode Marketplace ➜](https://marketplace.visualstudio.com/items?itemName=sudoaugustin.tailpile)**

#### ⚠️ Note:

- In order for the extension to activate you must have \*.tailwind.css file in your workspace.
- Tailpile transpile only files extension with `.tailwind.css` .

</br>

## ✨ Features

### Nesting

Support nested css styles using [tailwindcss/nesting](https://github.com/tailwindlabs/tailwindcss/tree/master/nesting).

![⌛](https://raw.githubusercontent.com/sudoaugustin/tailpile/main/.github/snippets/Nesting.png)

### Autoprefix

Tailpile use [autoprefixer](https://github.com/postcss/autoprefixer) to add vendor prefixes.

![⌛](https://raw.githubusercontent.com/sudoaugustin/tailpile/main/.github/snippets/Prefix.png)

### Optimize

Tailpile use [clean-css](https://github.com/clean-css/clean-css) to optimize css and save file size.

![⌛](https://raw.githubusercontent.com/sudoaugustin/tailpile/main/.github/snippets/Optimize.png)

</br>

## 🎛️ Commands

### Tailpile: Install Tailwind CSS

By default, tailpile has tailwindcss@v2.2.19 built-in. This command will install the latest(or)next version of tailwindcss.

</br>

## 🛠️ Setting

### tailpile.output

The output directory for the transpiled css files. (Note: Set the path relative from workspace root.)

```JSON
"tailpile.output": "dist/css"
```

### tailpile.compact

If `true`, the transpiled css will be minified. Defaults to `true`.

```JSON
"tailpile.compact": false
```

### tailpile.browsers

The browsers you target for transpiled css. This can either be a [browserslist](https://github.com/browserslist/browserslist) query or `package.json` to use `browserslist` key in package.json file. Defaults to `["defaults"]`.

```JSON
"tailpile.browsers": "package.json"
```

### tailpile.packageManager

The package manager to use for installing tailwindcss. Possible values are `npm` or `yarn`. Defaults to `npm`.

```JSON
"tailpile.packageManager": "npm"
```

### tailpile.tailwindcss.version

TailwindCSS version tag to install with [**Install Tailwind CSS**](#tailpile-install-tailwind-css) command. Either `latest` or `next`. Defaults to `latest`.

```JSON
"tailpile.tailwindcss.config": "latest"
```

### tailpile.tailwindcss.config

The path for the tailwindcss configuration file, defaults to `''`. (Note: Set the path relative from workspace root.)

```JSON
"tailpile.tailwindcss.config": "config/tailwind.js"
```

⚠️ The purge content path must be absolute path.

```Cycript
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  // 🔴 This purge won't work.
  purge:['./src/**/*.js']
};
```

```Cycript
const path = require('path');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  // 🟢 This purge will work.
  purge:[path.join(__dirname, 'src/**/*.js')]
};
```

</br>

[<img src="https://raw.githubusercontent.com/sudoaugustin/tailpile/main/.github/ProjectBy.png">](https://github.com/sudoaugustin)
