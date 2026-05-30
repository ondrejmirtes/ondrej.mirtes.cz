# Infrastructure (AWS CDK)

Static hosting for **ondrej.mirtes.cz** on AWS: S3 (private) + CloudFront, with
a CloudFront Function for pretty URLs and a managed response-headers policy.

Everything lives in **us-east-1** (CloudFront ACM certificates must be there).

## What it creates

- **S3 bucket** — private, encrypted, read only by CloudFront via **Origin
  Access Control** (OAC). The site content (`../_site`) is uploaded on deploy.
- **ACM certificate** for `ondrej.mirtes.cz`, DNS-validated against the existing
  `mirtes.cz` Route 53 zone.
- **CloudFront Function** (`cloudfront/rewrite.js`, viewer-request) — rewrites
  pretty URLs to S3 keys: `/foo → /foo.html`, `/archiv/2016/ → …/index.html`,
  `/rss → /rss.rss`, `/en/rss → /en/rss.rss`.
- **ResponseHeadersPolicy** — HSTS, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy, X-XSS-Protection.
- **CloudFront distribution** — `redirect-to-https`, TLS 1.2_2021, HTTP/2+3,
  PriceClass 100, default root object `index.html`, `404 → /404.html`.
- **Route 53** A + AAAA alias records `ondrej.mirtes.cz → distribution`.

## How this replaces the old setup

The previous infrastructure used a **public-read** S3 bucket and two
**Lambda@Edge** functions. This CDK stack modernizes it:

| Old | New |
| --- | --- |
| Public S3 bucket + bucket policy | Private bucket + **OAC** |
| `web-ondrej-mirtes-cz-rewrite-url` (Lambda@Edge, origin-request) | **CloudFront Function** (viewer-request) — and it now handles `/en/rss` |
| `web-ondrej-mirtes-cz-response` (Lambda@Edge, viewer-response) | native **ResponseHeadersPolicy** |
| TLS 1.1 | TLS 1.2_2021 |

The old rewrite used `uri.startsWith('/rss')`, so `/en/rss` (and `/en/rss-*`)
fell through to `.html` and 404'd. The new function tests the **last path
segment**, so every feed — Czech and English — resolves.

## Deploy

```sh
# 1. Build the site (from the repo root)
npm run build

# 2. Install + bootstrap (first time only)
cd infra
npm install
npx cdk bootstrap aws://928192134594/us-east-1

# 3. Remove the existing CNAME so the new A/AAAA aliases can be created
#    (downtime starts here). Route 53 forbids an A record alongside a CNAME.
aws route53 change-resource-record-sets --hosted-zone-id Z3DG4DJKE958FW \
  --change-batch '{"Changes":[{"Action":"DELETE","ResourceRecordSet":{
    "Name":"ondrej.mirtes.cz.","Type":"CNAME","TTL":300,
    "ResourceRecords":[{"Value":"d3b0411au8ldqy.cloudfront.net"}]}}]}'

# 4. Deploy
npx cdk deploy
```

`cdk deploy` provisions everything, uploads `_site`, and invalidates the cache.
Subsequent content updates are just `npm run build` (repo root) + `cdk deploy`.

## Notes

- The stack is independent of the legacy distribution `E1898YK90LCMAV`; once the
  DNS points at the new one and you're happy, the old distribution, bucket
  (`web-ondrej.mirtes.cz`), and the two Lambda@Edge functions can be deleted.
- `removalPolicy: DESTROY` + `autoDeleteObjects` on the bucket — content is
  disposable (regenerated from `_site`), so the bucket can be torn down cleanly.
