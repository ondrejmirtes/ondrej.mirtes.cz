// Tests for the CloudFront Function in ../cloudfront/rewrite.js
// Run: node --test  (from the infra/ directory)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(__dirname, '..', 'cloudfront', 'rewrite.js'), 'utf8');

// The file defines `function handler(event)`; load it without modifying it.
// eslint-disable-next-line no-new-func
const handler = new Function(`${source}\nreturn handler;`)();

function rewrite(uri) {
  // CloudFront viewer-request event shape (minimal).
  const event = { request: { uri } };
  return handler(event).uri;
}

const cases = [
  // pretty article/page URLs -> .html
  ['/php-is-much-better-than-you-think', '/php-is-much-better-than-you-think.html'],
  ['/o-mne', '/o-mne.html'],
  ['/en/about', '/en/about.html'],
  ['/union-types-vs-intersection-types', '/union-types-vs-intersection-types.html'],

  // directory URLs -> index.html
  ['/', '/index.html'],
  ['/en/', '/en/index.html'],
  ['/archiv/2016/', '/archiv/2016/index.html'],
  ['/en/archiv/older/', '/en/archiv/older/index.html'],

  // feeds -> .rss
  ['/rss', '/rss.rss'],
  ['/rss-alt', '/rss-alt.rss'],
  ['/rss-twitter', '/rss-twitter.rss'],
  ['/rss-weblogy', '/rss-weblogy.rss'],

  // the bug that prompted the rewrite: English feeds
  ['/en/rss', '/en/rss.rss'],
  ['/en/rss-alt', '/en/rss-alt.rss'],

  // already has an extension -> unchanged
  ['/foo.html', '/foo.html'],
  ['/sitemap.xml', '/sitemap.xml'],
  ['/robots.txt', '/robots.txt'],
  ['/favicon.ico', '/favicon.ico'],
  ['/apple-touch-icon-precomposed.png', '/apple-touch-icon-precomposed.png'],
  ['/assets/bundle/main-CmHm-Db3.css', '/assets/bundle/main-CmHm-Db3.css'],
  ['/assets/bundle/main-C_VW3L9Z.js', '/assets/bundle/main-C_VW3L9Z.js'],
  ['/gfx/logo-new.png', '/gfx/logo-new.png'],
];

for (const [input, expected] of cases) {
  test(`${input} -> ${expected}`, () => {
    assert.equal(rewrite(input), expected);
  });
}

// The function must not mutate anything other than the uri.
test('returns the request object', () => {
  const event = { request: { uri: '/x', headers: { host: [{ key: 'Host', value: 'ondrej.mirtes.cz' }] } } };
  const out = handler(event);
  assert.equal(out, event.request);
  assert.deepEqual(out.headers, { host: [{ key: 'Host', value: 'ondrej.mirtes.cz' }] });
});
