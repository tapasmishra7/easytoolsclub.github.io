import { loadComponent } from "./components/componentLoader.js";
import { initNavbar } from "./components/navbar.js";
import { initFooter } from "./components/footer.js";
import { initProducts } from "./components/products.js";
import { initBlog } from "./components/blog.js";
import { initContactForm } from "./components/contactForm.js";

await Promise.all([
  loadComponent("navbar", "/components/navbar.html"),
  loadComponent("footer", "/components/footer.html")
]);

initNavbar();
initFooter();
initProducts();
initBlog();
initContactForm();
