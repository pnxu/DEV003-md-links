const {mdLinks} = require('./md-links.js');

mdLinks('../archivo.md').then(() => {
})
.catch((error) => {
    console.log(error)
});
