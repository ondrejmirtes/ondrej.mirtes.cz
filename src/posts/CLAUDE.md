# Blog Writing Style Guide

This is the personal blog of **Ondřej Mirtes** (ondrej.mirtes.cz). It is **not**
the PHPStan blog — that lives at phpstan.org/blog. This is a personal site about
software development, user experience, Apple, games, travel and caffeine.

## Core Voice

- Written **in first person** by Ondřej Mirtes. Always "já" / "I" for the
  author's own opinions and decisions; "we" only when it genuinely refers to a
  team or project.
- Conversational but technically authoritative. Confident and opinionated —
  avoid hedging.
- Room for self-deprecating humor and the occasional footnote aside.
- Genuine enthusiasm for the topic; never condescend to a competent reader.

## Languages

- The blog is primarily in **Czech**. Czech posts live in `cs/`.
- English translations live in `en/` and are published under `/en/`.
- A translation **keeps the same filename** as its Czech original (so the two
  are paired automatically and a language switcher can link between them), but
  sets an English URL slug via the `slug:` front matter field. See below.

## Front Matter

Two kinds of entries:

**Articles** — full original posts. Minimal front matter:
```yaml
---
title: Title of the article
date: 2024-01-31T09:00:00   # optional; falls back to the date in the filename
---
```

**Link posts** — short commentary pointing at an external URL (the title links
out, Daring-Fireball style). Add `external_url`:
```yaml
---
title: Title of the linked thing
date: 2024-01-31T09:00:00
external_url: https://example.com/the-link
---
```

Optional fields:
- `guid` — stable identifier for RSS (legacy; keep existing ones, new posts can omit it).
- `slug` — overrides the URL slug. Used on **English translations** to give them
  an English URL while keeping the Czech filename:
  ```yaml
  # file: en/2016-02-08-zbavte-se-vetvi-v-kodu-pomoci-promises.md
  ---
  title: Get rid of branches in your code with promises
  slug: get-rid-of-conditions-with-promises
  ---
  ```
  → published at `/en/get-rid-of-conditions-with-promises`.

The filename is `YYYY-MM-DD-czech-slug.md`. The date prefix sets the post date
and, for Czech posts, the URL (`/czech-slug`).

## Writing Conventions

- Czech typographic quotes are produced automatically — just write `"..."` and
  `'...'` and they become `„…"` / `‚…'`.
- Code uses fenced blocks with a language: `php`, `js`, `bash`, `xml`, `html`,
  `neon`. Inline comments in code are welcome to explain what's happening.
- Footnotes use standard Markdown footnote syntax (`text[^1]` … `[^1]: note`).
- Images go in `/images/` and are referenced as `![alt](/images/file.png)`.
  To center an image inside an HTML wrapper, leave blank lines around the
  Markdown so it still parses:
  ```html
  <div style="text-align:center">

  ![alt](/images/file.png)

  </div>
  ```
- Link generously to documentation, sources, and people's profiles to credit them.

## Structure

- Release/announcement-style posts open with why the thing matters.
- How-to posts frame the problem before the solution.
- Prefer concrete demonstrations over abstract theory; acknowledge tradeoffs.
