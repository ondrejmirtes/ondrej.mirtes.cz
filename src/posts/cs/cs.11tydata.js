export default {
  tags: ["postsCs"],
  layout: "layouts/post.njk",
  lang: "cs",
  // Match Jekyll's `permalink: /:title.html` → /slug.html at the root.
  permalink: (data) => `/${data.page.fileSlug}.html`,
};
