const path = require('path');

console.log(path.join(__dirname, 'src/index.js'));

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  purge: {
    enabled: true,
    content: [path.join(__dirname, 'src/index.js')],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
