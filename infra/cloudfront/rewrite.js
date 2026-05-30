// CloudFront Function (viewer-request) — rewrites pretty URLs to S3 object keys.
// Replaces the old `web-ondrej-mirtes-cz-rewrite-url` Lambda@Edge.
//
//   /foo            -> /foo.html
//   /archiv/2016/   -> /archiv/2016/index.html
//   /rss            -> /rss.rss
//   /rss-alt        -> /rss-alt.rss
//   /en/rss         -> /en/rss.rss   (the old Lambda used uri.startsWith('/rss')
//                                     and missed the /en/ feeds — fixed here by
//                                     testing the last path segment instead)
//
// Written in CloudFront-Functions-safe (ES5) JavaScript.
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    var last = uri.substring(uri.lastIndexOf('/') + 1);

    // Only rewrite paths whose last segment has no file extension.
    if (last.indexOf('.') === -1) {
        if (last.indexOf('rss') === 0) {
            request.uri = uri + '.rss';
        } else if (last === '') {
            request.uri = uri + 'index.html';
        } else {
            request.uri = uri + '.html';
        }
    }

    return request;
}
