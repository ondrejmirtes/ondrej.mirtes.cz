# CLAUDE.md

Guidance for working in this repository.

## Project

The personal blog of **Ondřej Mirtes** — https://ondrej.mirtes.cz. A Czech blog
about software development, UX, Apple, games and travel, mixing two kinds of
entries: **full articles** and **link posts** (short commentary that links to an
external URL, Daring-Fireball style). English translations are published under
`/en/`.

This is a rewrite of the original Jekyll site. Goals: keep the content and look
faithful to the original, on a modern, fast, Node-based toolchain; and make it
easy to ship English translations alongside the Czech posts.

## Tech

- **[Eleventy](https://www.11ty.dev/) v3** — static site generator (ESM config).
- **[Vite](https://vite.dev/)** via `@11ty/eleventy-plugin-vite` — bundles,
  minifies and content-hashes CSS/JS and rewrites references.
- **[Tailwind CSS v4](https://tailwindcss.com/)** (`@tailwindcss/vite`) with the
  typography plugin for article bodies. Stock utilities; not a pixel-for-pixel
  clone of the old hand-written CSS.
- **markdown-it** (Eleventy's default) with `markdown-it-footnote` and Czech
  smart quotes; **Prism** syntax highlighting (`@11ty/eleventy-plugin-syntaxhighlight`).
- **Nunjucks** (`.njk`) templates, **Markdown** (`.md`) content.
- **luxon** for date formatting; **Playwright** for responsive checks.

## Commands

```sh
npm install
npm run dev      # dev server with live reload
npm run build    # production build → _site/
```

## Structure

```
eleventy.config.js        Collections, filters, markdown + Vite/Tailwind wiring
src/
  _data/
    site.js               Site name, description, baseurl, homepageLimit
    i18n.js               Per-language UI strings, routes, language names
  _includes/
    layouts/base.njk      Page shell: header, sidebar nav, footer, lang switcher
    layouts/post.njk      Single post + prev/next nav
    layouts/feed.njk      RSS channel wrapper
    article.njk           Macro rendering an article / link post + date
    feeditems.njk         Macro rendering <item>s for the feed variants
  posts/
    CLAUDE.md             Writing-style guide for posts
    cs/                   Czech posts (Markdown); /slug.html URLs
    en/                   English translations (same filenames); /en/slug.html
  index.njk o-mne.md archiv.njk 404.njk        Czech pages
  rss.njk rss-alt.njk rss-twitter.njk rss-weblogy.njk sitemap.njk
  en/                     Mirrored English pages (index, about, archiv, 404, rss)
  assets/css/main.css     Tailwind entry + theme tokens
  assets/js/main.js       Small vanilla JS (archive jumper, footnote popovers)
public/                   Copied to site root: gfx/, images/, icons, robots.txt
```

## Key behaviors

- **URLs**: posts are emitted as `/slug.html`; internal links use the
  extensionless `/slug` form (matches the original Jekyll output).
- **Link posts** are posts with an `external_url` front-matter field; everything
  else is a full article. See `src/posts/CLAUDE.md` for front matter.
- **Archives** (`/archiv/<year>/`) replicate the old plugin: all posts except the
  10 most recent, grouped by year, pre-2012 grouped as "Starší".
- **i18n**: Czech is default and unprefixed; English lives under `/en/`. A
  translation keeps the Czech filename (so the pair shares a `fileSlug`) and sets
  an English URL via the `slug:` field. The language switcher links mirrored pages.
- **CLAUDE.md** files are ignored by Eleventy (not published).

## Conventions

- Match the surrounding code style. Keep templates and CSS approximate to the
  original look rather than introducing heavy bespoke CSS.
- After changing templates or data, run `npm run build` and sanity-check the
  output in `_site/`.
