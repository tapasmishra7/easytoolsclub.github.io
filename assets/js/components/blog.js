import {
  getFeaturedPosts,
  getPostBySlug,
  getPostCategories,
  getPublishedPosts,
  getRecentPosts
} from "../../data/posts.js";
import { getProductById } from "../../data/products.js";
import { qs } from "../utils/dom.js";

export function initBlog() {
  renderBlogPage();
  renderHomeBlogSection();
  renderArticlePage();
}

function renderBlogPage() {
  const latestMount = qs("[data-blog-latest]");
  const featuredMount = qs("[data-blog-featured]");
  const categoriesMount = qs("[data-blog-categories]");
  const emptyState = qs("[data-blog-empty-state]");

  if (!latestMount && !featuredMount && !categoriesMount) return;

  const posts = getPublishedPosts();
  const featuredPost = getFeaturedPosts()[0] || posts[0];

  if (emptyState) {
    emptyState.hidden = posts.length > 0;
  }

  if (featuredMount) {
    featuredMount.replaceChildren(...(featuredPost ? [createPostCard(featuredPost)] : []));
  }

  if (latestMount) {
    latestMount.replaceChildren(...posts.map(createPostCard));
  }

  if (categoriesMount) {
    categoriesMount.replaceChildren(...getPostCategories().map(createCategoryBadge));
  }
}

function renderHomeBlogSection() {
  const section = qs("[data-home-blog-section]");
  const mount = qs("[data-home-blog]");
  if (!section || !mount) return;

  const posts = getRecentPosts(3);

  if (!posts.length) {
    section.hidden = true;
    mount.replaceChildren();
    return;
  }

  section.hidden = false;
  mount.replaceChildren(...posts.map(createPostCard));
}

function renderArticlePage() {
  const article = qs("[data-article-slug]");
  if (!article) return;

  const post = getPostBySlug(article.dataset.articleSlug);
  if (!post) return;

  const title = qs("[data-article-title]");
  const meta = qs("[data-article-meta]");
  const author = qs("[data-article-author]");
  const category = qs("[data-article-category]");
  const relatedProducts = qs("[data-article-related-products]");
  const relatedArticles = qs("[data-article-related-articles]");

  if (title) title.textContent = post.title;
  if (meta) meta.textContent = formatPostMeta(post);
  if (author) author.textContent = post.author;
  if (category) category.textContent = post.category;

  if (relatedProducts) {
    relatedProducts.replaceChildren(...(post.relatedProducts || [])
      .map(getProductById)
      .filter(Boolean)
      .map(createRelatedProductCard));
  }

  if (relatedArticles) {
    relatedArticles.replaceChildren(...getPublishedPosts()
      .filter((relatedPost) => relatedPost.slug !== post.slug)
      .slice(0, 2)
      .map(createPostCard));
  }
}

function createPostCard(post) {
  const article = document.createElement("article");
  const eyebrow = document.createElement("span");
  const title = document.createElement("h2");
  const link = document.createElement("a");
  const description = document.createElement("p");
  const meta = document.createElement("p");

  article.id = post.slug;
  article.className = "card";
  eyebrow.className = "eyebrow";
  eyebrow.textContent = post.category;
  link.href = post.url || `/blog/${post.slug}/`;
  link.textContent = post.title;
  title.append(link);
  description.textContent = post.excerpt || post.description;
  meta.className = "text-muted";
  meta.textContent = formatPostMeta(post);

  article.append(eyebrow, title, description, meta);
  return article;
}

function createRelatedProductCard(product) {
  const article = document.createElement("article");
  const mark = document.createElement("span");
  const title = document.createElement("h3");
  const link = document.createElement("a");
  const description = document.createElement("p");

  article.className = "card";
  mark.className = "icon-box";
  mark.textContent = product.icon;
  link.href = product.landingPage || product.websiteUrl || "/apps/";
  link.textContent = product.name;
  title.append(link);
  description.textContent = product.shortDescription;

  article.append(mark, title, description);
  return article;
}

function createCategoryBadge(category) {
  const badge = document.createElement("span");

  badge.className = "badge";
  badge.textContent = category;
  return badge;
}

function formatPostMeta(post) {
  const date = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(post.publishDate));

  return `${date} | ${post.readingTime}`;
}
