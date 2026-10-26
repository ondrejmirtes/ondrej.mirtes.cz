# Infrastructure (AWS CDK)

AWS hosting for **ondrej.mirtes.cz**, plus a redirect for `mirtes.cz` /
`www.mirtes.cz`. Everything lives in **us-east-1** (CloudFront ACM
certificates must be there). Stack name: `OndrejMirtesCzSite`.

**Infrastructure and content are two independent processes:**
- **Infrastructure** is this CDK app — `cdk deploy`.
- **Content** is the built site — `../deploy-content.sh`.

Both run automatically from GitHub Actions on pushes to `eleventy` (see
[Continuous deployment](#continuous-deployment)); the commands below are for
manual runs.

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
npx cdk diff --all     # review the change
npx cdk deploy --all
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

npx cdk deploy --all  # creates everything (infra only)
cd .. && ./deploy-content.sh   # then push content
```

## Continuous deployment

Two workflows in `.github/workflows/`, each triggered only by its own files on
pushes to `eleventy` (or manually via *Run workflow*):

| Workflow | Runs when these change | Does |
| --- | --- | --- |
| `deploy-infra.yml` | `infra/**` (except this README) | `npm test`, `cdk deploy --all` |
| `deploy-content.yml` | `src/**`, `public/**`, `eleventy.config.js`, `package*.json`, `deploy-content.sh` | `./deploy-content.sh` |

They authenticate with **GitHub OIDC**, so there are no AWS secrets in the repo.
The `OndrejMirtesCzGithubDeploy` stack (`lib/github-deploy-stack.ts`) creates
the OIDC provider and two roles that only workflows on the `eleventy` branch of
`ondrejmirtes/ondrej.mirtes.cz` can assume:

- `github-deploy-infra` — may only assume the CDK bootstrap roles.
- `github-deploy-content` — read the site stack outputs, read/write/delete in
  the site bucket, invalidate the distribution.

**One-time setup** (the roles must exist before CI can use them), with admin
credentials:

```sh
cd infra && npx cdk deploy --all
```

If the account already has an IAM OIDC provider for
`token.actions.githubusercontent.com`, this fails on the duplicate provider;
delete the old provider or import it in `github-deploy-stack.ts` instead.

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
