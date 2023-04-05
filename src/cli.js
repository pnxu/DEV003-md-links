const {mdLinks} = require('./md-links.js');

// const input = process.argv;
const route = process.argv[2];
const utils = require('./utils.js')
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');

if (validate) {
  mdLinks(route, {validate: true})
    .then((result) => console.log('result', result))
    .catch((err) => console.error(err));
} else {
  mdLinks(route, {validate: false})
    .then((result) => console.log('result', result))
    .catch((err) => console.error(err));
}
