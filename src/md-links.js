const utils = require('./utils.js');

// funcion md links que acepta dos parametros
const mdLinks = (userPath, options) => {
  return new Promise((resolve, reject) => {
    if (!utils.pathExists(userPath)) reject('The path does not exist.');
    let absolutePath = '';
    let mdPaths = [];
    if (utils.isAbsolutePath(userPath)) absolutePath = userPath;
    else absolutePath = utils.resolveToAbsolutePath(userPath);
    if (utils.isDirectory(userPath)) {
      mdPaths = utils.getMdFilesInDirectory(absolutePath);
    } else {
      const isMarkdown = utils.fileIsMarkdown(absolutePath);
      if (isMarkdown) {
        mdPaths.push(absolutePath);
      } else {
        reject('markdown files not provided');
      }
    }
    if (mdPaths.length === 0) reject('md files not found');
    let output = mdPaths.map((path) => {
      return utils.getLinks(path, options.validate);
    });
    Promise.all(output).then((results) => {
      resolve(results.flat());
    });
  });
};

// mdLinks('folder', { validate: true })
// .then((result) => console.log('result', result))
// .catch((err) => console.error(err));

module.exports = {
  mdLinks
};
