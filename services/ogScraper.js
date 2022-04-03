function isSWFVideo(url) {
  return url.toLowerCase().includes('.swf');
}

async function getMetaData(url) {
  console.log("Fetching meta data", url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Linkisbot/2.1)'
      }
    });
    const html = await res.text();
    
    let titleRegex = /<title>(.*?)<\/title>/.exec(html);
    if (!titleRegex) {
      titleRegex = /<meta.*?property="og:title".*?content="(.*?)".*?>/.exec(html);
    }

    const imageRegex = /<meta.*?property="og:image".*?content="(.*?)".*?>/.exec(html);
    
    let videoRegex = /<meta.*?property="og:video:url".*?content="(.*?)".*?>/.exec(html);
    if (!videoRegex) {
      console.log('Try og video');
      videoRegex = /<meta.*?property="og:video".*?content="(.*?)".*?>/.exec(html);
    }

    const result = {
      title: titleRegex && titleRegex.length > 1 ? titleRegex[1] : 'Untitled',
      image: imageRegex && imageRegex.length > 1 ? imageRegex[1] : undefined,
      video: videoRegex && videoRegex.length > 1 ? videoRegex[1] : undefined,
    }

    if (result.video && isSWFVideo(result.video)) {
      console.log("Detected SWF. Removing video");
      delete result.video;
    }

    return result;
  } catch(e) {
    console.log('Failed to fetch meta data', e.message);
    return null;
  }
}

module.exports = {
  getMetaData,
};