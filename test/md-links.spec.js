/* eslint-disable max-len */
// const { mdLinks } = require('.././src/md-links.js');
const utils = require('../src/utils.js');

describe('pathExists function', () => {
  it('should return true for an existing path', () => {
    expect(utils.pathExists('/home/pnxu/workspace/DEV003-md-links/folder')).toBe(true);
  });
});
it('should return false for non-existent path', ()=> {
  expect(utils.pathExists('/fake-path')).toBe(false);
})
describe('isAbsolutePath function', () => {
  it('should return true to absolute paths', () => {
    const absolutePath = '/home/pnxu/workspace/DEV003-md-links/folder';
    expect(utils.isAbsolutePath(absolutePath)).toBe(true);
  });
});
it('should return false for relative paths', () => {
  const relativePath = './folder/';
  expect(utils.isAbsolutePath(relativePath)).toBe(false);
});
describe('resolveToAbsolutePath function', () => {
it('should resolve "folder" to absolute path', () => {
  expect(utils.resolveToAbsolutePath('folder')).toEqual('/home/pnxu/workspace/DEV003-md-links/folder')
});
});
describe('isFile function', () => {
  it('should return false to a directory', () => {
    expect(utils.isFile('folder')).toBe(false);
  });
});
describe('isDirectory function', () => {
  it('should return true to a directory', () => {
    expect(utils.isDirectory('/home/pnxu/workspace/DEV003-md-links/folder')).toBe(true);
  })
})
describe('fileIsMarkdown function', () => {
  it('should return false to a text file', () => {
    expect(utils.fileIsMarkdown('/home/pnxu/workspace/DEV003-md-links/folder/text-file.txt')).toBe(false);
  });
});
describe('readDirectory function', () => {
  it('should return an array with files inside a given directory', () => {
    expect(utils.readDirectory('/home/pnxu/workspace/DEV003-md-links/folder/')).toEqual([
      'file-with-links.md',
      'text-file.txt']);
  });
});
describe('getMdFilesInDirectory function', () => {
  it('should return an array with the routes of all the md files inside a given directory', () => {
    expect(utils.getMdFilesInDirectory('/home/pnxu/workspace/DEV003-md-links/folder/')).toEqual([
      '/home/pnxu/workspace/DEV003-md-links/folder/file-with-links.md',
    ]);
  });
});
describe('getLinks function', () => {
  it('should return an array of links', () => {
    const filePath = '/home/pnxu/workspace/DEV003-md-links/folder/file-with-links.md';
    return utils.getLinks(filePath)
      .then((links) => {
        expect(links).toEqual([
          {
            href: 'https://www.google.com/',
            text: 'Google',
            file: filePath
          },
          {
            href: 'https://www.instagram.com/',
            text: 'Instagram',
            file: filePath
          }
        ]);
      });
  });
  // it('should reject with an error when an invalid file path is provided', () => {
  //   const filePath = '/path/to/non-existent/file.md';
  //   return expect(utils.getLinks(filePath)).rejects.toThrow('ENOENT: no such file or directory');
  // });
});
