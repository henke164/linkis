async function getMetaData(url) {
  console.log("Fetching meta data", url);
  try {
    const res = await fetch(url);
    const html = await res.text();

    const image = /<meta.*property="og:image*".*content="([^"]+)".*\/>/.exec(html)[1];
    const title = /<meta.*property="og:title*".*content="([^"]+)".*\/>/.exec(html)[1];
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