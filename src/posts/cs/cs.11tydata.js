export default {
  tags: ["postsCs"],
  layout: "layouts/post.njk",
  lang: "cs",
  // Match Jekyll's `permalink: /:title.html` → /slug.html at the root.
  // A `slug:` front-matter field can override the URL if ever needed.
  permalink: (data) => `/${data.slug || data.page.fileSlug}.html`,
};
