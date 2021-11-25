const fs = require('fs');
const path = require('path');

const packages = ['postcss', 'tailwindcss', 'tailwindcss/nesting', 'autoprefixer'];
const node_modules = path.join(__dirname, '..', 'node_modules');

const modules = packages.reduce((modules, name) => {
  //* tailwind/nesting --> tailwind_nesting
  const exportName = name.replace('/', '_');
  const isNodeExists = fs.existsSync(path.join(node_modules, ...name.split('/')));
  return { ...modules, [exportName]: require(isNodeExists ? name : `./${name}`) };
}, {});

module.exports = modules;
