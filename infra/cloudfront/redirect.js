// CloudFront Function (viewer-request) — permanently redirects the
// redirect-only domains (mirtes.cz, www.mirtes.cz) to ondrej.mirtes.cz,
// preserving the path and query string. The function returns the response at
// the edge, so the distribution's origin is never contacted.
//
// Replaces the old S3 "RedirectAllRequestsTo: ondrej.mirtes.cz" website config.
function handler(event) {
    var request = event.request;

    // Rebuild the query string from the structured querystring object.
    var query = '';
    for (var name in request.querystring) {
        var v = request.querystring[name];
        if (v.multiValue) {
            for (var i = 0; i < v.multiValue.length; i++) {
                query += (query ? '&' : '?') + name + '=' + v.multiValue[i].value;
            }
        } else {
            query += (query ? '&' : '?') + name + (v.value ? '=' + v.value : '');
        }
    }

    return {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: {
            'location': { value: 'https://ondrej.mirtes.cz' + request.uri + query },
        },
    };
}
