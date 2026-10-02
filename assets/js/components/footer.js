import { FOOTER_GROUPS } from "../utils/constants.js";
import { getVisibleFooterProducts } from "../../data/products.js";
import { qs, qsa } from "../utils/dom.js";

export function initFooter() {
  renderFooterLinks();

  qsa("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function renderFooterLinks() {
  const mount = qs("[data-footer-links]");
  if (!mount) return;

  const productGroup = {
    title: "Products",
    links: getVisibleFooterProducts().map((product) => ({
      href: product.landingPage || product.websiteUrl || "/apps/",
      label: product.name,
      meta: product.status === "Available" ? "" : "Coming Soon"
    }))
  };
  const groups = [productGroup, ...FOOTER_GROUPS];

  mount.replaceChildren(...groups.map((group) => {
    const column = document.createElement("nav");
    const title = document.createElement("h2");
    const list = document.createElement("ul");

    column.className = "footer-column";
    column.setAttribute("aria-label", group.title);
    title.className = "footer-title";
    title.textContent = group.title;
    list.className = "footer-links";

    group.links.forEach((item) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.href = item.href;
      link.textContent = item.meta ? `${item.label} (${item.meta})` : item.label;

      listItem.append(link);
      list.append(listItem);
    });

    column.append(title, list);
    return column;
  }));
}
