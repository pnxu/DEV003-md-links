const { mdLinks } = require('./md-links.js');

const route = process.argv[2];
const utils = require('./cli-utils.js');
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');
console.log(validate, stats);

mdLinks(route, { validate, stats })
  .then((result) => {
    console.log(result);
    utils.getStatsSummary(result, { stats, validate });
  })
  .catch((err) => console.error(err));
