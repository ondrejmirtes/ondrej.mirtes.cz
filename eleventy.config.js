import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { dateToRfc822, absoluteUrl } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItFootnote from "markdown-it-footnote";
import tailwindcss from "@tailwindcss/vite";
import { DateTime } from "luxon";
import fs from "node:fs";
import path from "node:path";
import i18n from "./src/_data/i18n.js";

// The eleventy-plugin-vite only passes .html files through Vite, so
// Eleventy-generated non-HTML templates (RSS feeds, sitemap.xml) would be
// dropped from the output. This Vite plugin copies them from the Vite root
// (Eleventy's temp dir) into the final output dir after the bundle is written.
function copyGeneratedFiles(extensions = [".rss", ".xml"]) {
  let root;
  let outDir;
  const walk = (dir, base = "") => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = path.join(base, entry.name);
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), rel);
      } else if (extensions.some((e) => entry.name.endsWith(e))) {
        const dest = path.join(outDir, rel);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(path.join(dir, entry.name), dest);
      }
    }
  };
  return {
    name: "copy-generated-files",
    configResolved(config) {
      root = config.root;
      outDir = config.build.outDir;
    },
    writeBundle() {
      if (root && outDir && fs.existsSync(root)) walk(root);
    },
  };
}

const HOMEPAGE_LIMIT = 10;

// Drop the .html extension to produce the canonical/public link form (/slug).
const noHtml = (url = "") => url.replace(/\.html$/, "");

// Build the yearly-archive groups, replicating _plugins/yearly_archive_plugin.rb:
// take all posts, drop the newest HOMEPAGE_LIMIT, group the rest by year
// (>2011 → that year, else "Starší"/"Older"), ordered oldest-group-first so
// `archives | last` is the newest archived year (homepage "Archiv" target).
function buildArchives(postsAsc, lang) {
  const t = i18n[lang];
  const newestFirst = [...postsAsc].reverse();
  const archived = newestFirst.slice(HOMEPAGE_LIMIT);

  const groups = new Map(); // key -> { year, isOlder, posts[] }
  for (const post of archived) {
    const year = post.date.getFullYear();
    const isOlder = year <= 2011;
    const key = isOlder ? "older" : String(year);
    if (!groups.has(key)) groups.set(key, { year, isOlder, posts: [] });
    groups.get(key).posts.push(post); // already newest-first
  }

  const list = [...groups.values()].map((g) => {
    const slug = g.isOlder ? t.olderSlug : String(g.year);
    const titleShort = g.isOlder ? t.older : t.year(g.year);
    return {
      year: g.isOlder ? t.older : g.year,
      slug,
      url: `${t.archiveBase}/${slug}/`,
      title: t.archiveTitle(titleShort),
      titleShort,
      posts: g.posts,
      count: g.posts.length,
    };
  });

  // oldest first: "Starší" group first, then ascending years
  list.sort((a, b) => {
    const av = a.slug === t.olderSlug ? -Infinity : Number(a.slug);
    const bv = b.slug === t.olderSlug ? -Infinity : Number(b.slug);
    return av - bv;
  });
  return list;
}

export default function (eleventyConfig) {
  // ---- Assets / bundler ----------------------------------------------------
  eleventyConfig.addPassthroughCopy({ "src/assets": "/assets" });
  eleventyConfig.addPassthroughCopy({ public: "/" });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss(), copyGeneratedFiles()],
      build: {
        assetsDir: "assets/bundle",
      },
    },
  });

  // ---- Markdown ------------------------------------------------------------
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({
      html: true,
      typographer: true,
      // Czech smart quotes: [openDouble, closeDouble, openSingle, closeSingle]
      quotes: ["„", "“", "‚", "‘"],
    });
    md.use(markdownItFootnote);
  });

  // ---- Filters -------------------------------------------------------------
  eleventyConfig.addFilter("noHtml", noHtml);
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("isoDate", (date) =>
    DateTime.fromJSDate(date, { zone: "Europe/Prague" }).toFormat("yyyy-LL-dd")
  );

  // "%-d. %-m. %Y" → e.g. 28. 4. 2013 (no leading zeros)
  eleventyConfig.addFilter("postDate", (date) =>
    DateTime.fromJSDate(date, { zone: "Europe/Prague" }).toFormat("d. L. yyyy")
  );

  // Meta description: strip HTML/newlines, truncate to N words.
  eleventyConfig.addFilter("excerpt", (html = "", words = 50) => {
    const text = String(html)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const parts = text.split(" ");
    return parts.length > words ? parts.slice(0, words).join(" ") : text;
  });

  eleventyConfig.addFilter("year", (date) =>
    DateTime.fromJSDate(date).toFormat("yyyy")
  );

  eleventyConfig.addFilter("rfc822", (date) => dateToRfc822(date));
  eleventyConfig.addFilter("absoluteUrl", (url, base) => absoluteUrl(url, base));

  // Prev/next within a newest-first collection (matches _layouts/post.html:
  // "prev" = the newer post, "next" = the older post).
  eleventyConfig.addFilter("newerPost", (collection, url) => {
    const i = collection.findIndex((p) => p.url === url);
    return i > 0 ? collection[i - 1] : null;
  });
  eleventyConfig.addFilter("olderPost", (collection, url) => {
    const i = collection.findIndex((p) => p.url === url);
    return i >= 0 && i < collection.length - 1 ? collection[i + 1] : null;
  });

  // Archive year nav. `list` is oldest-first; "newer" = next year up (prev
  // link, → Homepage when none), "older" = previous year (next link).
  eleventyConfig.addFilter("archiveNav", (list, slug) => {
    const i = list.findIndex((a) => a.slug === slug);
    return {
      newer: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
      older: i > 0 ? list[i - 1] : null,
    };
  });

  // ---- Collections ---------------------------------------------------------
  eleventyConfig.addCollection("postsCs", (api) =>
    api.getFilteredByTag("postsCs").reverse()
  );
  eleventyConfig.addCollection("postsEn", (api) =>
    api.getFilteredByTag("postsEn").reverse()
  );
  eleventyConfig.addCollection("archivesCs", (api) =>
    buildArchives(api.getFilteredByTag("postsCs"), "cs")
  );
  eleventyConfig.addCollection("archivesEn", (api) =>
    buildArchives(api.getFilteredByTag("postsEn"), "en")
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "11ty.js"],
  };
}
