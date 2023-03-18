const {mdLinks} = require('.././src/md-links.js');
const {isAbsolutePath}  = require('../src/functions.js')

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('Debe devolver una promesa', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });
  it('Debe rechazar cuando el path no existe', () => {
    return mdLinks('pnxu/workspace/noexiste.md').catch((error) => {
      expect(error).toBe('La ruta no existe')
  })
});
});
describe('isAbsolutePath', () => {
  it('debe retornar true para rutas absolutas', () => {
    const absolutePath = '/DEV003-MD-LINKS/carpeta/archivotxt.txt';
    expect(isAbsolutePath(absolutePath)).toBe(true);
  });
});
it('should return false for relative paths', () => {
  const relativePath = './carpeta/archivotxt.txt';
  expect(isAbsolutePath(relativePath)).toBe(false);
});
