/**
 * Central product registry for EasyToolsClub.
 *
 * How to add a product:
 * 1. Add one object to PRODUCTS with the required fields below.
 * 2. Set showOnApps/showInFooter/showInLegal/featured to control where it appears.
 * 3. Add a landingPage only when a dedicated product page exists.
 *
 * Required fields:
 * id, slug, name, shortDescription, category, platform, status, icon.
 *
 * Optional fields:
 * longDescription, playStoreUrl, landingPage, supportPage, privacySection,
 * websiteUrl, screenshots, featured, showInFooter, showOnHome, showOnApps,
 * showInLegal, comingSoon, packageName, developer, versionInfo, requirements.
 *
 * Registry-driven surfaces:
 * Apps cards, footer Products links, contact product selector, legal/support
 * product sections, and product landing-page fields are rendered or hydrated
 * from here.
 */
export const PRODUCTS = [
  {
    id: "easyspend",
    slug: "easyspend",
    name: "EasySpend",
    shortDescription: "A practical personal finance tool for recording expenses, reviewing habits, and staying aware of cash flow.",
    longDescription: "EasySpend is an offline-first Android expense tracker for budgets, income and expenses, spending summaries, categories, and personal finance control.",
    category: "Finance",
    platform: "Android",
    status: "Available",
    price: "Free with ads",
    landingPage: "/apps/easyspend/",
    supportPage: "/support/",
    privacySection: "/privacy/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.easytoolsclub.easyspend",
    websiteUrl: "/apps/easyspend/",
    icon: "ES",
    screenshots: [
      { label: "Dashboard", src: "/assets/images/apps/easyspend/dashboard.svg", alt: "EasySpend dashboard screenshot placeholder" },
      { label: "Budget", src: "/assets/images/apps/easyspend/budget.svg", alt: "EasySpend budget screenshot placeholder" },
      { label: "Analytics", src: "/assets/images/apps/easyspend/analytics.svg", alt: "EasySpend analytics screenshot placeholder" },
      { label: "Categories", src: "/assets/images/apps/easyspend/categories.svg", alt: "EasySpend categories screenshot placeholder" }
    ],
    featured: true,
    showInFooter: true,
    showOnHome: false,
    showOnApps: true,
    showInLegal: true,
    comingSoon: false,
    packageName: "com.easytoolsclub.easyspend",
    developer: "Easy Tools Club",
    designSystem: "Material Design 3",
    technology: {
      language: "Kotlin",
      ui: "Jetpack Compose",
      database: "Room Database"
    },
    versionInfo: {
      currentVersion: "To be updated",
      minimumAndroidVersion: "To be updated",
      lastUpdated: "June 29, 2026"
    },
    requirements: {
      androidVersion: "To be updated",
      storage: "Minimal local storage for app data",
      internet: "Optional for core tracking workflows",
      permissions: "Only permissions required by released app features"
    }
  },
  {
    id: "gst-calculator",
    slug: "gst-calculator",
    name: "GST Calculator",
    shortDescription: "A clean calculator for quick GST-inclusive and GST-exclusive tax calculations.",
    category: "Finance",
    platform: "Web",
    status: "Planned",
    landingPage: "",
    supportPage: "/support/",
    privacySection: "/privacy/",
    playStoreUrl: "",
    websiteUrl: "/apps/",
    icon: "GST",
    screenshots: [],
    featured: false,
    showInFooter: true,
    showOnHome: false,
    showOnApps: true,
    showInLegal: true,
    comingSoon: true
  },
  {
    id: "emi-calculator",
    slug: "emi-calculator",
    name: "EMI Calculator",
    shortDescription: "A loan planning tool for estimating monthly payments, interest, and repayment timelines.",
    category: "Finance",
    platform: "Web",
    status: "Planned",
    landingPage: "",
    supportPage: "/support/",
    privacySection: "/privacy/",
    playStoreUrl: "",
    websiteUrl: "/apps/",
    icon: "EMI",
    screenshots: [],
    featured: false,
    showInFooter: true,
    showOnHome: false,
    showOnApps: true,
    showInLegal: true,
    comingSoon: true
  },
  {
    id: "sip-planner",
    slug: "sip-planner",
    name: "SIP Planner",
    shortDescription: "A simple investing planner for recurring contributions, time horizons, and growth assumptions.",
    category: "Finance",
    platform: "Web",
    status: "Planned",
    landingPage: "",
    supportPage: "/support/",
    privacySection: "/privacy/",
    playStoreUrl: "",
    websiteUrl: "/apps/",
    icon: "SIP",
    screenshots: [],
    featured: false,
    showInFooter: true,
    showOnHome: false,
    showOnApps: true,
    showInLegal: true,
    comingSoon: true
  },
  {
    id: "budget-planner",
    slug: "budget-planner",
    name: "Budget Planner",
    shortDescription: "A focused planning workspace for monthly budgets, category limits, and spending priorities.",
    category: "Finance",
    platform: "Android & Web",
    status: "Planned",
    landingPage: "",
    supportPage: "/support/",
    privacySection: "/privacy/",
    playStoreUrl: "",
    websiteUrl: "/apps/",
    icon: "BP",
    screenshots: [],
    featured: false,
    showInFooter: false,
    showOnHome: false,
    showOnApps: true,
    showInLegal: true,
    comingSoon: true
  }
];

export const getProductById = (id) => PRODUCTS.find((product) => product.id === id);

export const getProductBySlug = (slug) => PRODUCTS.find((product) => product.slug === slug);

export const getFeaturedProducts = () => PRODUCTS.filter((product) => product.featured);

export const getVisibleProducts = () => PRODUCTS.filter((product) => product.showOnApps);

export const getVisibleFooterProducts = () => PRODUCTS.filter((product) => product.showInFooter);

export const getLegalProducts = () => PRODUCTS.filter((product) => product.showInLegal);

export const getFutureLegalProducts = () => getLegalProducts().filter((product) => product.status !== "Available");

export const getAndroidProducts = () => PRODUCTS.filter((product) => product.platform.includes("Android"));

export const getWebProducts = () => PRODUCTS.filter((product) => product.platform.includes("Web"));

export const getAvailableProductsFirst = () => [...PRODUCTS].sort((a, b) => {
  if (a.status === b.status) return a.name.localeCompare(b.name);
  return a.status === "Available" ? -1 : 1;
});
