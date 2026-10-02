/**
 * Central blog post registry for EasyToolsClub.
 *
 * How to add an article:
 * 1. Add one object to POSTS with the required fields below.
 * 2. Set status to "Published" when it should render publicly.
 * 3. Use featured/showOnHome/showInBlog to control where it appears.
 *
 * Required fields:
 * id, slug, title, description, excerpt, category, author, publishDate,
 * readingTime, status, url.
 *
 * Optional fields:
 * tags, coverImage, featured, showOnHome, showInBlog, relatedProducts.
 *
 * Registry-driven surfaces:
 * Blog featured article, latest articles, category list, and homepage latest
 * posts are rendered from this file.
 */
export const POSTS = [
  {
    id: "easyspend-budget-guide",
    slug: "easyspend-budget-guide",
    title: "EasySpend budget guide",
    description: "A practical guide to building a monthly budget with EasySpend and reviewing everyday spending habits.",
    excerpt: "Plan a monthly budget, track expenses consistently, and use EasySpend to understand where your money goes.",
    category: "Product",
    tags: ["EasySpend", "Budgeting", "Personal Finance"],
    author: "EasyToolsClub",
    publishDate: "2026-07-04",
    readingTime: "6 min read",
    coverImage: "",
    status: "Published",
    featured: true,
    showOnHome: true,
    showInBlog: true,
    url: "/blog/easyspend-budget-guide/",
    relatedProducts: ["easyspend"]
  },
  {
    id: "building-easytoolsclub-foundation",
    slug: "building-easytoolsclub-foundation",
    title: "Building the EasyToolsClub foundation",
    description: "How EasyToolsClub started with a reusable static website architecture and design system.",
    excerpt: "The first public version of the site establishes a reusable design system and static component architecture.",
    category: "Company",
    tags: ["Design System", "Static Web", "Architecture"],
    author: "EasyToolsClub",
    publishDate: "2026-07-03",
    readingTime: "3 min read",
    coverImage: "",
    status: "Draft",
    featured: false,
    showOnHome: false,
    showInBlog: false,
    url: "/blog/building-easytoolsclub-foundation/",
    relatedProducts: [],
  },
  {
    id: "why-offline-first-tools-matter",
    slug: "why-offline-first-tools-matter",
    title: "Why offline-first tools matter",
    description: "A short note on reliable software, unstable networks, and durable everyday workflows.",
    excerpt: "Reliable software should respect unstable networks and keep essential workflows available.",
    category: "Product",
    tags: ["Offline First", "Product Design", "Reliability"],
    author: "EasyToolsClub",
    publishDate: "2026-07-03",
    readingTime: "4 min read",
    coverImage: "",
    status: "Draft",
    featured: false,
    showOnHome: false,
    showInBlog: false,
    url: "/blog/why-offline-first-tools-matter/",
    relatedProducts: ["easyspend"],
  }
];

export const getPublishedPosts = () => POSTS
  .filter((post) => post.status === "Published" && post.showInBlog)
  .sort(sortNewestFirst);

export const getFeaturedPosts = () => getPublishedPosts().filter((post) => post.featured);

export const getRecentPosts = (limit = 3) => getPublishedPosts()
  .filter((post) => post.showOnHome)
  .slice(0, limit);

export const getPostBySlug = (slug) => POSTS.find((post) => post.slug === slug);

export const getPostsByCategory = (category) => getPublishedPosts()
  .filter((post) => post.category === category);

export const getPostCategories = () => [...new Set(getPublishedPosts().map((post) => post.category))].sort();

function sortNewestFirst(a, b) {
  return new Date(b.publishDate) - new Date(a.publishDate);
}
