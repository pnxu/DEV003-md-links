const path = require('path');
const fs = require('fs');
const functions = require('./functions.js')

// funcion md links que acepta dos parametros
const mdLinks = (userPath, options) => {
    return new Promise((resolve, reject) => {
        if(!functions.pathExists(userPath))
        reject('La ruta no existe');
        // identificar si la ruta existe
        // si no existe, devuelve error
            // chequear si es ruta absoluta o convertirla a una ruta bsoluta.
            // probar si esa ruta absoluta es un archivo o un directorio
            // ver si es un archivo md
            //  si es un directorio, para sacar los archivos md.
        // resolve()
    });
};

module.exports = {
mdLinks
};
