const execSh = require('exec-sh').promise;

const packages = ['postcss', 'tailwindcss', 'tailwindcss/nesting', 'autoprefixer'];

Promise.all(packages.map(pkg => execSh(`ncc build node_modules/${pkg} -o modules/${pkg}`)))
  .then(values => console.log(values))
  .catch(() => console.log('!Error Kiddo'));
