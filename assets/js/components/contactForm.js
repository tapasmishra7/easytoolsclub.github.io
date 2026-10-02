import { qs } from "../utils/dom.js";

export function initContactForm() {
  const status = qs("[data-contact-status]");
  const params = new URLSearchParams(window.location.search);

  if (!status || params.get("sent") !== "1") return;

  status.textContent = "Thanks. Your message was sent to EasyToolsClub.";
  status.hidden = false;
  window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
}
