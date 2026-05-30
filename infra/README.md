# Infrastructure (AWS CDK)

AWS hosting for **ondrej.mirtes.cz**, plus a redirect for `mirtes.cz` /
`www.mirtes.cz`. Everything lives in **us-east-1** (CloudFront ACM
certificates must be there). Stack name: `OndrejMirtesCzSite`.

**Infrastructure and content are two independent processes:**
- **Infrastructure** is this CDK app — `cdk deploy`.
- **Content** is the built site — `../deploy-content.sh`.

The CDK stack does **not** upload site content; it only provisions the bucket,
CDN, certs, functions and DNS. That keeps an infra change from forcing a
content redeploy and vice-versa.

## What it creates

- **S3 bucket** — private, encrypted, read only by CloudFront via **Origin
  Access Control** (OAC). Starts empty; content is pushed by `deploy-content.sh`.
- **ACM certificate** for `ondrej.mirtes.cz`, DNS-validated against the
  `mirtes.cz` Route 53 zone.
- **CloudFront Function** `cloudfront/rewrite.js` (viewer-request) — pretty URLs
  → S3 keys: `/foo → /foo.html`, `/archiv/2016/ → …/index.html`,
  `/rss → /rss.rss`, `/en/rss → /en/rss.rss`.
- **ResponseHeadersPolicy** — HSTS, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy, X-XSS-Protection.
- **Distribution** — redirect-to-https, TLS 1.2_2021, HTTP/2+3, PriceClass 100,
  default root object `index.html`, `403`/`404 → /en/404.html` (404).
- **Redirect distribution** for `mirtes.cz` + `www.mirtes.cz` — its own cert and
  a `cloudfront/redirect.js` function that `301`s to `https://ondrej.mirtes.cz`
  (path + query preserved). No bucket; the origin is never contacted.
- **Route 53** A + AAAA aliases for `ondrej.mirtes.cz`, `mirtes.cz`,
  `www.mirtes.cz`.

## Update the infrastructure

Edit the CDK (`lib/site-stack.ts`, `cloudfront/*.js`) and:

```sh
cd infra
npm install            # first time
npm test               # tests for the rewrite function
npx cdk diff           # review the change
npx cdk deploy
```

This never touches site content.

## Update the content

After editing posts/templates in the repo, from the **repo root**:

```sh
./deploy-content.sh
```

It runs `npm run build`, reads the bucket + distribution id from the stack
outputs, `aws s3 sync`s `_site/` (with `--delete`), fixes the `.rss`
content-type, and invalidates the CloudFront cache. It never touches infra.

## First-time / cutover deploy

```sh
# build + bootstrap
npm run build
cd infra && npm install && npx cdk bootstrap aws://928192134594/us-east-1

# Free the alias from any old distribution that still holds it, then remove the
# old DNS records (Route 53 forbids an A record next to a CNAME). For the
# initial ondrej.mirtes.cz cutover this was the old CNAME; for mirtes.cz /
# www.mirtes.cz it's the apex A/AAAA + the www CNAME.

npx cdk deploy        # creates everything (infra only)
cd .. && ./deploy-content.sh   # then push content
```

## How this replaces the old setup

| Old | New |
| --- | --- |
| Public-read S3 bucket | Private bucket + **OAC** |
| `web-ondrej-mirtes-cz-rewrite-url` (Lambda@Edge) | **CloudFront Function** — now also handles `/en/rss` |
| `web-ondrej-mirtes-cz-response` (Lambda@Edge) | native **ResponseHeadersPolicy** |
| TLS 1.1 | TLS 1.2_2021 |
| `web-mirtes.cz` / `web-www.mirtes.cz` S3 redirect buckets | redirect **CloudFront Function** (no bucket) |

The old rewrite used `uri.startsWith('/rss')`, so `/en/rss` fell through to
`.html` and 404'd. The new function tests the **last path segment**, so every
feed resolves. Covered by `npm test`.
