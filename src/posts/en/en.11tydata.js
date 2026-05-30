export default {
  tags: ["postsEn"],
  layout: "layouts/post.njk",
  lang: "en",
  // English translations live under /en/<slug>.html. They keep the Czech
  // filename (so the cs/en pair shares a fileSlug for the language switcher),
  // but a `slug:` front-matter field gives them an English URL.
  permalink: (data) => `/en/${data.slug || data.page.fileSlug}.html`,
};
