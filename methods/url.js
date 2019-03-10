const UrlSchema = require('../models/url');

const newUrl = async url => {
    const short_url = await highestNumber() + 1;
    const original_url = UrlValidation(url);
    const shortenedUrl = new UrlSchema({
        original_url,
        short_url
    })
    let result;

    try {
        result = await shortenedUrl.save();
    }
    catch (e) {
        result = e.message;
    }

    return result;
}

const redirectUrl = short_url => {
    return UrlSchema.findOne({ short_url })
        .then(doc => doc.original_url)
        .catch(e => e)
}

/* helpers */
const highestNumber = () => UrlSchema.findOne().sort('-short_url').then(doc => doc ? doc.short_url : 1);
const UrlValidation = url => {
    if (url.includes('https')) return url;
    else return `http://${url}`;
}

module.exports = { newUrl, redirectUrl }