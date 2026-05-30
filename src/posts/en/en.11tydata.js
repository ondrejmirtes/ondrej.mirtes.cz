export default {
  tags: ["postsEn"],
  layout: "layouts/post.njk",
  lang: "en",
  // English translations live under /en/<same-slug>.html
  permalink: (data) => `/en/${data.page.fileSlug}.html`,
};
