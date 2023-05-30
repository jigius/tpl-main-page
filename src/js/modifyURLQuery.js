 /**
  * Manipulates with query params into passes URL
  * Extracted from js-core code module `tr_filter`
  *
  * jigius@gmail.com, 2022
  *
  * @queryParams url
  * @queryParams queryParams
  * @returns {string}
 */
const modifyURLQuery = function(url, queryParams) {
    let value = {};
    const query = String(url).split('?');
    if (query[1]) {
        const part = query[1].split('&');
        for (let i = 0; i < part.length; i++) {
            const data = part[i].split('=');
            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }
    }
    value = Object.assign(value, queryParams);
    // Generate query parameter string
    let query_param = '';
    for (let i in value) {
        if (value[i]) {
            if (i === 'route') { // Skip route value to encode
                query_param += '&' + i + '=' + value[i];
            } else {
                query_param += '&' + i + '=' + encodeURIComponent(value[i]);
            }
        }
    }
    // Return url with modified parameter
    if (query_param) {
        return query[0] + '?' + query_param.substring(1);
    } else {
        return query[0];
    }
};

module.exports = modifyURLQuery;
