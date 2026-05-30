// UI strings + per-language routing. Czech (cs) is the default, unprefixed.
// English (en) lives under /en/. Templates read everything through this map
// by the page's `lang`, so dropping en translations lights up the EN site.
export default {
  cs: {
    locale: "cs",
    prefix: "", // URL prefix; Czech is unprefixed
    htmlLang: "cs",
    langName: "Čeština",
    // routes
    home: "/",
    aboutUrl: "/o-mne",
    archiveBase: "/archiv",
    feedUrl: "/rss",
    // nav + chrome
    nav: { home: "Homepage", archive: "Archiv", about: "O mně" },
    a11y: {
      toNav: "Přejít k navigaci",
      toContent: "Přejít na obsah",
      toSidebar: "Přejít k postrannímu sloupci",
      shortcuts: "Klávesové zkratky",
    },
    archiveLink: "Archiv",
    older: "Starší",
    olderSlug: "starsi",
    year: (y) => `Rok ${y}`,
    archiveTitle: (s) => `Archiv - ${s}`,
    homepageLink: "Homepage",
    notFound: {
      title: "Stránka nenalezena",
      body: "Požadovaná stránka nebyla nalezena. Je možné, že jste následovali chybný odkaz, nebo že stránka již neexistuje. Pokračujte prosím na <a href=\"/\">homepage</a>.",
      code: "chyba 404",
    },
  },
  en: {
    locale: "en",
    prefix: "/en",
    htmlLang: "en",
    langName: "English",
    home: "/en/",
    aboutUrl: "/en/about",
    archiveBase: "/en/archiv",
    feedUrl: "/en/rss",
    nav: { home: "Homepage", archive: "Archive", about: "About" },
    a11y: {
      toNav: "Skip to navigation",
      toContent: "Skip to content",
      toSidebar: "Skip to sidebar",
      shortcuts: "Keyboard shortcuts",
    },
    archiveLink: "Archive",
    older: "Older",
    olderSlug: "older",
    year: (y) => `Year ${y}`,
    archiveTitle: (s) => `Archive - ${s}`,
    homepageLink: "Homepage",
    notFound: {
      title: "Page not found",
      body: "The requested page could not be found. You may have followed a broken link, or the page may no longer exist. Please continue to the <a href=\"/en/\">homepage</a>.",
      code: "error 404",
    },
  },
};
