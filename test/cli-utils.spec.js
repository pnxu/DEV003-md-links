/* eslint-disable max-len */
const { getStatsSummary } = require('../src/cli-utils.js');

const urls = [
  {
    href: 'https://www.github.com/pnxu/',
    text: 'github',
    file: '/home/pnxu/workspace/DEV003-md-links/for-test/file-with-links.md'
  },
  {
    href: 'https://www.instagsdsdram.com/',
    text: 'nothing',
    file: '/home/pnxu/workspace/DEV003-md-links/for-test/file-with-links.md'
  },
  {
    href: 'https://www.instagsdsdram.com/',
    text: 'nothing x2',
    file: '/home/pnxu/workspace/DEV003-md-links/for-test/file-with-links.md'
  },
  {
    href: 'http://community.l-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'broken',
    file: '/home/pnxu/workspace/DEV003-md-links/for-test/file-with-links.md'
  },
  {
    href: 'https://www.wwrwrqrqrqrqfggg.com/',
    text: 'void',
    file: '/home/pnxu/workspace/DEV003-md-links/for-test/file-with-links.md'
  },
  {
    href: 'https://www.vvvvvsafasfdsadsadsadsa.com/',
    text: 'void',
    file: '/home/pnxu/workspace/DEV003-md-links/for-test/file-with-links.md'
  }
];

it('should return the total and unique number of links', () => {
  const logSpy = jest.spyOn(console, 'log');
  getStatsSummary(urls, { stats: true, validate: false });
  expect(logSpy).toHaveBeenCalledWith('Total: 6\nUnique: 5\n');
  logSpy.mockRestore();
});

it('should return the correct number of broken links when validate is true', () => {
  const logSpy = jest.spyOn(console, 'log');
  getStatsSummary(urls, { stats: true, validate: true });
  expect(logSpy).toHaveBeenCalledWith('Total: 6\nUnique: 5\nBroken: 0\n');
});

it('should return "No links found" if the input array is empty', () => {
  const result = getStatsSummary([], { stats: true, validate: false });
  expect(result).toBe('No links found');
});

it('should return undefined if stats is false', () => {
  const result = getStatsSummary(urls, { stats: false, validate: false });
  expect(result).toBe(undefined);
});
