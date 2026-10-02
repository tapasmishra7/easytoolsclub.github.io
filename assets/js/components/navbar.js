import { NAV_LINKS } from "../utils/constants.js";
import { qs, qsa } from "../utils/dom.js";

export function initNavbar() {
  const header = qs("[data-site-header]");
  const toggle = qs("[data-nav-toggle]");
  const menu = qs("[data-nav-menu]");
  const linksMount = qs("[data-nav-links]");
  const page = getActivePageId();

  renderNavLinks(linksMount, page);

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menu?.classList.contains("is-open")) return;

    menu.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");

    if (restoreFocus) {
      toggle?.focus();
    }
  };

  const openMenu = () => {
    menu?.classList.add("is-open");
    toggle?.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  };

  toggle?.addEventListener("click", () => {
    if (menu?.classList.contains("is-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  menu?.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menu?.classList.contains("is-open")) return;
    if (header?.contains(event.target)) return;

    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();
}

function renderNavLinks(mount, activePage) {
  if (!mount) return;

  mount.replaceChildren(...NAV_LINKS.map((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    link.dataset.navLink = item.id;
    link.className = "nav-link";

    if (item.id === activePage) {
      link.setAttribute("aria-current", "page");
    }

    return link;
  }));
}

function getActivePageId() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (!firstSegment) {
    return "home";
  }

  if (firstSegment === "apps") {
    return "apps";
  }

  return NAV_LINKS.some((item) => item.id === firstSegment) ? firstSegment : "home";
}
