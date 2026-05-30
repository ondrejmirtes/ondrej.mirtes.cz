# ondrej.mirtes.cz

Personal blog, built with [Eleventy](https://www.11ty.dev/) + [Vite](https://vite.dev/) + [Tailwind CSS](https://tailwindcss.com/).

## Develop

```sh
npm install
npm run dev      # local dev server with live reload
npm run build    # production build to _site/
```

## Structure

- `src/posts/cs/` — Czech posts (Markdown). `src/posts/en/` — English translations (same filenames), served under `/en/`.
- `src/_includes/layouts/` — Nunjucks layouts (`base`, `post`, `feed`).
- `src/_includes/article.njk` — article/link-post rendering macro.
- `src/_data/site.js`, `src/_data/i18n.js` — site config and UI strings (cs/en).
- `src/assets/` — CSS (Tailwind) and JS, bundled/hashed by Vite.
- `public/` — static files copied to the site root (`gfx/`, `images/`, icons, `robots.txt`).
- `eleventy.config.js` — collections (posts, yearly archives), filters, markdown + Vite/Tailwind wiring.

### Posts

Front matter: `title` (required), `date`, `external_url` (presence marks a *link post*), `guid`.
A post with `external_url` renders as a link post (title links out); otherwise it's a full article.

### Adding an English translation

Drop a file with the **same name** as the Czech post into `src/posts/en/`. It is published at
`/en/<slug>.html` and the English homepage/archive/feed pick it up automatically.
