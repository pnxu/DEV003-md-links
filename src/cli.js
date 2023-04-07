/* eslint-disable max-len */
const { mdLinks } = require('./md-links.js');
const colors = require('colors');
const utils = require('./cli-utils.js');
const route = process.argv[2];
const validate =
  process.argv.includes('--validate') || process.argv.includes('--v');
const stats = process.argv.includes('--stats') || process.argv.includes('--s');
const help = process.argv.includes('--help') || process.argv.includes('--h');

if (help) {
  console.log('');
  console.log(
    `\n  ${colors.gray('$ ')}${colors.magenta(
      'md-links'
    )} <path-to-file> ${colors.bold('[options]')}`
  );
  console.log('');
  console.log(
    `\n***************${colors.bold('[valid options]')}***************`
  );
  console.log('');
  console.log(
    `\n ${colors.gray('$ ')}md-links <path-to-file> ${colors.cyan(
      '(no-option)'
    )}`
  );
  console.log(`${colors.gray('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯')}`);
  console.log(`
  ${colors.gray('-')}href:       ${colors.gray('>>')} URL.
  ${colors.gray('-')}text:       ${colors.gray('>>')} Anchor text
  ${colors.gray('-')}file:       ${colors.gray('>>')} Path of the file.
  `);
  console.log(
    `\n ${colors.gray('$ ')}md-links <path-to-file> ${colors.cyan(
      '--'
    )}validate ${colors.gray('or')} ${colors.cyan('--')}v`
  );
  console.log(
    `${colors.gray('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯')}`
  );
  console.log(`
  ${colors.gray('-')}href:       ${colors.gray('>>')} URL.
  ${colors.gray('-')}text:       ${colors.gray('>>')} Anchor text.
  ${colors.gray('-')}file:       ${colors.gray('>>')} Path of the file.
  ${colors.gray('-')}status:     ${colors.gray('>>')} HTTP response.
  ${colors.gray('-')}statusText: ${colors.gray('>>')} HTTP response message.
                  ${colors.red('FAIL')} or ${colors.green('OK')}.
                  `);
  console.log(
    `\n ${colors.gray('$ ')}md-links <path-to-file> ${colors.cyan(
      '--'
    )}stats ${colors.gray('or')} ${colors.cyan('--')}s`
  );
  console.log(`${colors.gray('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯')}`);
  console.log(`
  ${colors.gray('-')}Total:      ${colors.gray('>>')} Total number of links.
  ${colors.gray('-')}Unique:     ${colors.gray(
    '>>'
  )} Total number of unique links.
  `);
  console.log(
    `\n ${colors.gray('$ ')}md-links <path-to-file> ${colors.cyan(
      '--'
    )}stats ${colors.cyan('--')}validate`
  );
  console.log(
    `${colors.gray('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯')}`
  );
  console.log(`
  ${colors.gray('-')}Total:      ${colors.gray('>>')} Total number of links.
  ${colors.gray('-')}Unique:     ${colors.gray(
    '>>'
  )} Total number of unique links.
  ${colors.gray('-')}Broken:     ${colors.gray(
    '>>'
  )} Total numbers of broken links.`);
  console.log('');
  process.exit();
}

mdLinks(route, { validate, stats })
  .then((result) => {
    if (!stats) console.log(result);
    utils.getStatsSummary(result, { stats, validate });
  })
  .catch((err) => console.error(err));
