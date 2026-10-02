import {
  getAvailableProductsFirst,
  getFutureLegalProducts,
  getLegalProducts,
  getProductById,
  getVisibleProducts
} from "../../data/products.js";
import { qs, qsa } from "../utils/dom.js";

const STATUS_BADGE_CLASS = {
  Available: "badge-success",
  Planned: "badge-warning",
  "Coming Soon": "badge-warning"
};

export function initProducts() {
  renderProductGrid();
  renderProductSelects();
  renderSupportProductSummary();
  renderProductAnchorNavs();
  renderPrivacyFutureProducts();
  renderSupportFutureProducts();
  renderTermsFutureProducts();
  hydrateEasySpendFields();
  hydrateEasySpendScreenshots();
}

function renderProductGrid() {
  const mount = qs("[data-product-grid]");
  if (!mount) return;

  mount.replaceChildren(...getVisibleProducts().map((product) => {
    const article = document.createElement("article");
    const header = document.createElement("div");
    const mark = document.createElement("span");
    const badge = document.createElement("span");
    const body = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const platform = document.createElement("p");
    const action = document.createElement("a");

    article.className = "app-card";
    mark.className = "app-mark";
    mark.textContent = product.icon;
    badge.className = `badge ${STATUS_BADGE_CLASS[product.status] || "badge-muted"}`;
    badge.textContent = product.status;
    title.textContent = product.name;
    description.textContent = product.shortDescription;
    platform.className = "app-platform";
    platform.textContent = product.platform;
    action.className = `button ${product.status === "Available" ? "button-primary" : "button-secondary"}`;
    action.href = product.landingPage || "/contact/";
    action.textContent = product.status === "Available" ? "View App" : "Request access";

    header.append(mark, badge);
    body.append(title, description, platform);
    article.append(header, body, action);
    return article;
  }));
}

function renderProductSelects() {
  qsa("[data-product-select]").forEach((select) => {
    const currentValue = select.value;
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select a product";

    select.replaceChildren(placeholder, ...getAvailableProductsFirst().map((product) => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.status === "Available" ? product.name : `${product.name} (${product.status})`;
      return option;
    }));

    select.value = currentValue;
  });
}

function renderSupportProductSummary() {
  const mount = qs("[data-support-products]");
  if (!mount) return;

  const products = getVisibleProducts();
  const available = products.filter((product) => product.status === "Available");
  const planned = products.filter((product) => product.status !== "Available");

  mount.replaceChildren(
    createFeatureItem(`${available.map((product) => product.name).join(", ")}:`, "Support documentation and product updates are being prepared."),
    createFeatureItem("Planned finance tools:", planned.map((product) => product.name).join(", ")),
    createFeatureItem("Website:", "Public pages now share the same design system and responsive foundation.")
  );
}

function renderProductAnchorNavs() {
  qsa("[data-product-anchor-nav]").forEach((nav) => {
    const prefix = nav.dataset.productAnchorNav;

    nav.replaceChildren(...getLegalProducts().map((product) => {
      const link = document.createElement("a");

      link.className = "button button-secondary";
      link.href = `#${prefix}-${product.slug}`;
      link.textContent = product.name;
      return link;
    }));
  });
}

function renderPrivacyFutureProducts() {
  const mount = qs("[data-privacy-future-products]");
  if (!mount) return;

  mount.replaceChildren(...getFutureLegalProducts().map((product) => (
    createProductStatusCard(product, "privacy")
  )));
}

function renderSupportFutureProducts() {
  const mount = qs("[data-support-future-products]");
  if (!mount) return;

  mount.replaceChildren(...getFutureLegalProducts().map((product) => (
    createProductStatusCard(product, "support")
  )));
}

function renderTermsFutureProducts() {
  const mount = qs("[data-terms-future-products]");
  if (!mount) return;

  mount.replaceChildren(...getFutureLegalProducts().map((product) => (
    createProductStatusCard(product, "terms")
  )));
}

function hydrateEasySpendFields() {
  const product = getProductById("easyspend");
  if (!product) return;

  qsa("[data-easyspend-download]").forEach((link) => {
    link.href = product.playStoreUrl;
    link.rel = "noopener";
  });

  qsa("[data-product-field]").forEach((node) => {
    const field = node.dataset.productField;
    const value = getFieldValue(product, field);

    if (value) {
      node.textContent = value;
    }
  });
}

function hydrateEasySpendScreenshots() {
  const product = getProductById("easyspend");
  if (!product?.screenshots?.length) return;

  qsa("[data-product-screenshot]").forEach((image) => {
    const screenshot = product.screenshots[Number(image.dataset.productScreenshot)];
    if (!screenshot) return;

    image.src = screenshot.src;
    image.alt = screenshot.alt;
  });
}

function getFieldValue(product, path) {
  if (!path) return "";

  return path.split(".").reduce((value, key) => {
    if (!value || typeof value !== "object") return "";
    return value[key] ?? "";
  }, product);
}

function createFeatureItem(label, text) {
  const paragraph = document.createElement("p");
  const strong = document.createElement("strong");

  strong.textContent = label;
  paragraph.append(strong, ` ${text}`);
  return paragraph;
}

function createProductStatusCard(product, prefix) {
  const article = document.createElement("article");
  const mark = document.createElement("span");
  const badge = document.createElement("span");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const platform = document.createElement("p");

  article.id = `${prefix}-${product.slug}`;
  article.className = "card";
  mark.className = "icon-box";
  mark.textContent = product.icon;
  badge.className = `badge ${STATUS_BADGE_CLASS[product.status] || "badge-muted"}`;
  badge.textContent = product.status;
  title.textContent = product.name;
  description.textContent = product.shortDescription;
  platform.className = "text-muted";
  platform.textContent = product.platform;

  article.append(mark, badge, title, description, platform);
  return article;
}
