async function getMetaData(url) {
  console.log("Fetching meta data", url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
      }
    });
    const html = await res.text();
    const image = /<meta.*property="og:image*".*content="([^"]+)".*(\/)?>/.exec(html)[1];
    const title = /<meta.*property="og:title*".*content="([^"]+)".*(\/)?>/.exec(html)[1];
    return {
      title,
      image,
    }
  } catch {
    return null;
  }
}

module.exports = {
  getMetaData,
};