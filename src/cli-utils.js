/* eslint-disable max-len */
// CLI STATS
const getStatsSummary = (result, { stats, validate }) => {
  if (!stats) return;
  const totalLinks = result.length;
  const uniqLinks = new Set(result.map((element) => element.href)).size;
  if (totalLinks === 0) return 'No links found';
  let statsResult = `Total: ${totalLinks}\nUnique: ${uniqLinks}\n`;
  if (validate) {
    const brokenLinks = new Set(result.filter((href) => href.status >= 400))
      .size;
    statsResult += `Broken: ${brokenLinks}\n`;
  }
  console.log(statsResult);
};

module.exports = {
  getStatsSummary
};
