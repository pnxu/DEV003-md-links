/* eslint-disable max-len */
const path = require('path');
const fs = require('fs');
const axios = require('axios');

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

// Read the directory content
const readDirectory = (userPath) => fs.readdirSync(userPath);
// console.log(readDirectory('/home/pnxu/workspace/DEV003-md-links'));

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

const getLinkStatus = (link) => {
  return axios
    .get(link)
    .then((response) => {
      return {
        status: response.status,
        statusText: response.statusText
      };
    })
    .catch((error) => {
      return {
        status: error.code,
        statusText: error.message
      };
    });
};

const getLinks = (userPath, validate) => {
  return new Promise((resolve, reject) => {
    fs.readFile(userPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error:', err);
        reject(err);
        return;
      }
      const links = data.match(/\[(.+?)\]\((https?:\/\/[^\s]+)\)/g);
      if (!links) {
        resolve([]);
        return;
      }
      const arr = links.map((link) => {
        const matches = link.match(/\[(.+?)\]\((https?:\/\/[^\s]+)\)/);
        const result = {
          href: matches[2],
          text: matches[1],
          file: userPath
        };
        // console.log({links, matches, result})
        if (validate) {
          return getLinkStatus(result.href)
            .then((response) => {
              if (response.status !== 200) {
                console.log('BROKEN LINK');
                result.status = 400;
                result.statusText = 'FAIL';
                return result;
              }
              result.status = response.status;
              result.statusText = response.statusText;
              return result;
            })
            .catch((err) => {
              console.error(
                `There was an error requesting ${result.href}`,
                err
              );
              return err;
            });
        }
        return result;
      });
      if (validate) {
        Promise.all(arr)
          .then((results) => resolve(results))
          .catch((error) => reject(error));
        return;
      }
      resolve(arr);
    });
  });
};

module.exports = {
  pathExists,
  isAbsolutePath,
  resolveToAbsolutePath,
  isFile,
  isDirectory,
  getLinkStatus,
  fileIsMarkdown,
  readDirectory,
  getMdFilesInDirectory,
  getLinks
};
