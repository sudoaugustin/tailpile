const CleanCSS = require('clean-css');
const { readFile, writeFile } = require('./utils/fs');
const { postcss, tailwindcss, autoprefixer, tailwindcss_nesting } = require('../modules');

function optimize(css, compact) {
  return new CleanCSS({ format: !compact && 'beautify' }).minify(css).styles;
}

function getBrowserslist(uri) {
  return readFile(uri)
    .then(JSON.parse)
    .then(({ browserslist }) => browserslist);
}

module.exports = async ({ css, from, output, compact, browsers, tailwindConfig }) => {
  const browserslist = browsers.path ? await getBrowserslist(browsers) : browsers;
  return postcss([
    tailwindcss_nesting,
    tailwindcss(tailwindConfig),
    autoprefixer({ overrideBrowserslist: browserslist }),
  ])
    .process(css, { from, to: output.path })
    .then(res => optimize(res.css, compact))
    .then(css => writeFile(output, css))
    .then(() => {
      const warnings = browsers.path &&
        !browserslist && ['`browserslist` not found in `package.json`.'];
      return { from, to: output.path, warnings };
    });
};
