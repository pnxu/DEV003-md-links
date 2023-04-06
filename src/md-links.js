/* eslint-disable max-len */
const utils = require('./utils.js');

// funcion md links que acepta dos parametros
const mdLinks = (userPath, options) => {
  console.log(options);
  return new Promise((resolve, reject) => {
    // identificar si la ruta existe
    if (!utils.pathExists(userPath)) reject('La ruta no existe');
    // chequear si es ruta absoluta o convertirla a una ruta absoluta.
    let absolutePath = '';
    let mdPaths = [];
    if (utils.isAbsolutePath(userPath)) absolutePath = userPath;
    else absolutePath = utils.resolveToAbsolutePath(userPath);
    // probar si esa ruta absoluta es un archivo o un directorio
    if (utils.isDirectory(userPath)) {
      console.log('user path is directory');
      mdPaths = utils.getMdFilesInDirectory(absolutePath);
    } else {
      console.log('user path is a file');
      console.log('checking if file is md');
      const isMarkdown = utils.fileIsMarkdown(absolutePath);
      if (isMarkdown) {
        mdPaths.push(absolutePath);
      } else {
        reject('markdown files not provided');
      }
    }
    if (mdPaths.length === 0) reject('md files not found');
    console.log('reading content, searching for links');
    let output = mdPaths.map((path) => {
      // console.log('path', path);
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
