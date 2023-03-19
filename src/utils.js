const path = require('path');
const fs = require('fs');
// const marked = require("marked");
// const markdownLinkExtractor = require('markdown-link-extractor');
// const axios = require('axios');

// Check synchronously if given path exists.
const pathExists = (userPath) => fs.existsSync(userPath);
// console.log(pathExists('/README.md'));

// Check if given path is an absolute route.
// return Boolean
const isAbsolutePath = (userPath) => path.isAbsolute(userPath);
// console.log(isAbsolutePath('README.md'));

// Get the absolute path from a given relative path.
// return String
const resolveToAbsolutePath = (userPath) => {
  const result = path.resolve(userPath);
  console.log('resolving path', userPath, result);
  return result;
};
// console.log(resolveToAbsolutePath('README.md'));

// Get the file stats and check if the target is a file.
// return Boolean
const isFile = (userPath) => fs.statSync(userPath).isFile();
// console.log(isFile('src'));

// Check the stats of a given path and check if is directory.
// return Boolean
const isDirectory = (userPath) => fs.lstatSync(userPath).isDirectory();
// console.log(isFile('/home/pnxu/workspace/DEV003-md-links/README.md'))

// Get the file of a given path, and check if the extension is .md.
// return Boolean
const fileIsMarkdown = (userPath) => path.extname(userPath) === '.md';
// console.log(getExtension('/home/pnxu/workspace/DEV003-md-links/README.js'))

// Read a file synchronously
// return Buffer
// TODO:  - Change to async read
//        - DRY dont repeat yourself (dont re-declare functions that
//  do the exact same thing
const readFileSync = (userPath) => fs.readFileSync(userPath, 'utf-8');
// console.log(readFileSync('README.md'));

// Read the directory content
const readDirectory = (userPath) => fs.readdirSync(userPath);
// console.log(readDirectory('/home/pnxu/workspace/DEV003-md-links'));

// Check if the directory of a given path contain files
const isThereFiles = (userPath) => {
  if (fs.readdirSync(userPath).length > 0) {
    return true;
  } else {
    return false;
  }
};
// console.log(isThereFiles('/home/pnxu/workspace/DEV003-md-links/'))

// This function reads files in a directory and their subdirectories
//  recursively, and filter the .md files.
// It returns an array of paths.
const getMdFilesInDirectory = (userPath) => {
  const files = fs.readdirSync(userPath);
  const mdFiles = files.flatMap((file) => {
    const filePath = path.join(userPath, file);
    const stat = fs.statSync(filePath);
    const isDirectory = stat.isDirectory();
    if (isDirectory) {
      return getMdFilesInDirectory(filePath);
    } else if (stat.isFile() && path.extname(file) === '.md') {
      return filePath;
    } else {
      return [];
    }
  });
  return mdFiles;
};

// get links
// const getLinks = (userPath) => {
//   const mdFiles = getMdFiles(userPath);
//   const links = mdFiles.flatMap((file) => {
//     const markdown = fs.readFileSync(file, "utf-8");
//     const renderer = new marked.Renderer();
//     const linkList = [];
//     renderer.link =  (href, title, text) => {
//       linkList.push({
//         href: href,
//         text: text,
//         file: file,
//       });
//     };
//     marked(markdown, { renderer });
//     return linkList;
//   });
//   return links;
// };
// console.log(getLinks('/home/pnxu/workspace/DEV003-md-links/carpeta/'));

// const getLinks = (userPath) => {
//     const mdFiles = getMdFiles(userPath);
//     const links = mdFiles.flatMap((file) => {
//       const markdown = fs.readFileSync(file, "utf-8");
//       const extractor = markdownLinkExtractor;
//       return extractor.extractLinks(markdown).map((link) => {
//         return {
//         href: link.href,
//         text: link.text,
//         file: file,
//         };
//       });
//     });
//     return links;
//   };
// console.log(getLinks('/home/pnxu/workspace/DEV003-md-links/carpeta/'));

module.exports = {
  pathExists,
  isAbsolutePath,
  resolveToAbsolutePath,
  isFile,
  isDirectory,
  fileIsMarkdown,
  readFileSync,
  readDirectory,
  isThereFiles,
  getMdFilesInDirectory
};
