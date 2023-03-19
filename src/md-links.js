const path = require('path');
const fs = require('fs');
const utils = require('./utils.js');

// funcion md links que acepta dos parametros
const mdLinks = (userPath, options) => {
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
        console.log('the file is markdown');
        console.log('reading content, searching for links');
      } else {
        console.log('markdown files is not provided.rejecting promise');
      }
    }
    console.log(mdPaths);
    // else
    // ver si es un archivo md
    //  si es un directorio, para sacar los archivos md.
    // resolve()
  });
};
mdLinks('.');

module.exports = {
  mdLinks
};
