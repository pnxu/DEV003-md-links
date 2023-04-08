# :link: @pnxu/md-links :link:

Markdown is a lightweight markup language frequently utilized by developers. It is utilized across various platforms that handle plain text, including GitHub, forums, and blogs, among others. It is typical to find multiple files in this format in any type of repository, with the README.md being the most common.

However, Markdown files often contain links that are broken or no longer valid, rendering the information they contain less valuable.

`@pnxu/md-links` is a library that helps you extract links from markdown files and perform various operations on them. With MD-Links, you can easily visualize and validate the HTTP status of links, as well as get statistics on the total number of links, unique links, and broken links in your markdown files.

## Table of contents

- [1. Installation](#1-installation)
- [2. API usage](#2-api-usage)
- [3. CLI Usage](#3-cli-usage)
- [4. Help](#4-Help)
- [5. Flowcharts: API and CLI](#5-Flowcharts)
- [6. Author Information](#6-author)

## 1. Installation

To use md-links-pnxu, you need to have Node.js and npm installed on your computer. Once you have those, you can install MD-Links using npm with the following command:

```js
$ npm install @pnxu/md-links
```

## 2. API usage

To use MD-Links in your JavaScript project, you can simply import it as a module:

```js
const mdLinks = require('md-links');
```

The mdLinks package provides a single interface, which takes two arguments:

#### `mdLinks(path, options)`

### Arguments

- `path` : Absolute or relative path to the file or directory to analyze.
- `options` : An object with a single property:
  - `validate` : A boolean that determines whether to validate the found links.

### Return value

The function returns a Promise that resolves to an array of objects, where each object represents a link and contains the following properties:

If `validate` is `false`, the object will return the `href`, `text`, and `file` properties.

```js
[
  {
    href: 'https://example.com',
    text: 'Example',
    file: '/path/to/file.md'
  }
];
```

If `validate` is `true`, the object will have additional `status` and `statusText` properties, where status is the HTTP response status code and statusText is either "FAIL" (in case of failure) or "OK" (in case of success).

```js
[
  {
    href: 'https://example.com',
    text: 'Example',
    file: '/path/to/file.md',
    status: 200,
    statusText: OK
  }
];
```

Here is an example of how to use the mdLinks function:

```js
mdLinks('./some/example.md')
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks('./some/example.md', { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, statusText }, ...]
  })
  .catch(console.error);

mdLinks('./some/dir')
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

## 3. CLI usage

You can use the md-links command-line tool to analyze Markdown files and extract links. Here's the basic usage:

```js
$ md-links <path-to-file> [options]
```

### Arguments

Where `<path-to-file>` is the path to the file or directory to analyze. You can also specify one or more of the following `options`:

- `--validate` or `--v` : check if the links are working or broken, and include the HTTP status code and status message for each link.

![cli-validate](/readme-content/cli-validate.png)

- `--stats` or `--s` : show basic statistics about the links, such as the total number of links and the number of unique links.

![cli-stats](/readme-content/cli-stats.png)

- `--validate` `--stats` : show statistics about the links, including the number of broken links.

![cli-stats](/readme-content/cli-stats-validate.png)

If you run md-links `without any options`, it will only display the href, text, and file columns.

![cli-no-option](/readme-content/cli-no-option.png)

Here are some other examples:

```js
$ md-links example.md
$ md-links example.md --validate
$ md-links example.md --stats
$ md-links example.md --validate --stats
```

## 4. Help

If you need assistance using the md-links command line tool, you can access the help documentation by using the following command:

```js
$ md-links --help
```

Alternatively, you can also use the shorthand version of the help command:

```js
$ md-links --h
```

The help documentation provides an overview of the available commands, options, and arguments that can be used with the md-links tool. If you have any further questions or issues, please consult the documentation or reach out to the software author for support.

## 5. Flowcharts

### API

![api](/flowcharts/api.jpg)

### CLI

![cli](/flowcharts/cli.jpg)

## 6. Author Information

Francisca Vega Valenzuela

<div>
  <a href="https://github.com/pnxu">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/fcaavv/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
  <a href="mailto:fcaavv@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
  </a>
</div>
