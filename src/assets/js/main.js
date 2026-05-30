// Archive year jumper: navigate when the <select> changes.
const archiveForm = document.querySelector("#frm-archiveForm");
if (archiveForm) {
  archiveForm.addEventListener("change", (event) => {
    const url = event.target.value;
    if (url) {
      document.location = url;
    }
  });
}

// Footnotes as inline popovers (lightweight Bigfoot replacement, no jQuery).
// Progressive enhancement: without JS the standard footnotes list stays visible.
(function () {
  const refs = document.querySelectorAll(".footnote-ref");
  if (!refs.length) return;

  const DOTS =
    '<svg viewBox="0 0 24 8" width="17" height="6" aria-hidden="true">' +
    '<circle cx="4" cy="4" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="4" r="2"/></svg>';

  let popover = null;
  let marker = null;

  function close() {
    if (popover) popover.remove();
    if (marker) marker.classList.remove("is-active");
    popover = null;
    marker = null;
  }

  // Scope the lookup to the post's own <article>: on listing pages each post
  // restarts its footnote numbering, so ids like "fn1" collide across posts.
  function contentFor(scope, href) {
    const li = scope.querySelector('[id="' + href.replace(/^#/, "") + '"]');
    if (!li) return "";
    const clone = li.cloneNode(true);
    clone.querySelectorAll(".footnote-backref").forEach((b) => b.remove());
    return clone.innerHTML.trim();
  }

  function open(btn, html) {
    close();
    const pop = document.createElement("div");
    pop.className = "fn-popover";
    pop.innerHTML = html;
    document.body.appendChild(pop);

    const r = btn.getBoundingClientRect();
    const margin = 8;
    const top = window.scrollY + r.bottom + 10;
    const maxLeft = window.scrollX + document.documentElement.clientWidth - pop.offsetWidth - margin;
    let left = window.scrollX + r.left + r.width / 2 - pop.offsetWidth / 2;
    left = Math.max(window.scrollX + margin, Math.min(left, maxLeft));
    pop.style.top = top + "px";
    pop.style.left = left + "px";
    pop.style.setProperty("--arrow", window.scrollX + r.left + r.width / 2 - left + "px");

    btn.classList.add("is-active");
    popover = pop;
    marker = btn;
  }

  refs.forEach((ref) => {
    const link = ref.querySelector("a");
    if (!link) return;
    const scope = ref.closest("article") || document;
    const html = contentFor(scope, link.getAttribute("href"));
    const num = link.textContent.replace(/[^\d]/g, "");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "fn-marker";
    btn.setAttribute("aria-label", "Footnote " + num);
    btn.innerHTML = DOTS;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (marker === btn) close();
      else open(btn, html);
    });
    ref.replaceWith(btn);
  });

  // Hide the dumped footnotes list AND its separator <hr>, for every post on
  // the page (listing pages render several).
  document
    .querySelectorAll(".footnotes, .footnotes-sep")
    .forEach((el) => (el.style.display = "none"));

  document.addEventListener("click", (e) => {
    if (popover && !popover.contains(e.target)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  window.addEventListener("resize", close);
})();
