// test
const path = require('path');

const pathObj = path.parse(__dirname, '/README.md');
console.log(pathObj);

const pathPnxu = path.parse(__filename);
console.log(pathPnxu);

const probando = path.parse('/ayuda.js');
console.log(probando);
