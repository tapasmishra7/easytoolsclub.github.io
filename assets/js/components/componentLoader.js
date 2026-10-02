import { qs } from "../utils/dom.js";

export async function loadComponent(name, path) {
  const mount = qs(`[data-component="${name}"]`);
  if (!mount) return;

  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Unable to load ${name} from ${path}`);
  }

  mount.innerHTML = await response.text();
}
