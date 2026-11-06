export const siteConfig = {
  name: "Spark",
  tagline: "AI support agents that finish the job",
  title: "Spark - An Astro theme for SaaS products",
  description:
    "Spark puts AI agents on chat, email and voice that resolve customer issues end to end, taking real actions in your systems inside the rules you set.",
  siteUrl: "https://spark.xocoweb.workers.dev",
  language: "en",
  locale: "en_US",
  dateLocale: "en-US",
  socialImage: "/og-image.png",
  email: "hello@example.com",
  /** The calls to action in the header, the hero and the closing panel. */
  actions: {
    primary: { label: "Get a demo", href: "/contact/" },
    secondary: { label: "Start free trial", href: "/pricing/" },
    signIn: { label: "Log in", href: "https://app.example.com/" },
  },
  /** The strip above the header. Set `enabled: false` to remove it. */
  announcement: {
    enabled: true,
    badge: "New",
    text: "Spark Voice 2.0: phone agents that answer in 600ms",
    href: "/blog/where-800-milliseconds-go/",
  },
  /** The contact page form. It stays disabled until `enabled` is true and `action` is set. */
  contact: {
    enabled: false,
    action: "",
    method: "post",
  },
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "The Spark dispatch",
    description:
      "One email a month: what shipped, what we measured, and what support teams are learning.",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** A file name from `src/icons/lucide`, shown beside the link in the menu. */
  icon?: string;
}

export interface MenuColumn {
  title?: string;
  links: NavLink[];
}

/**
 * The card on the right of a dropdown. `product` shows the agent console
 * screenshot, `story` the first testimonial from `src/config/home.ts`, `latest`
 * the newest blog post.
 */
export type MenuFeature = "product" | "story" | "latest";

export type NavItem =
  { label: string; href: string } | { label: string; columns: MenuColumn[]; feature?: MenuFeature };

export const navigation: NavItem[] = [
  {
    label: "Product",
    feature: "product",
    columns: [
      {
        title: "Agents",
        links: [
          {
            label: "Chat agent",
            href: "/#platform",
            description: "Web, in-app, WhatsApp and SMS",
            icon: "message-circle",
          },
          {
            label: "Voice agent",
            href: "/#platform",
            description: "Phone calls answered in under a second",
            icon: "audio-lines",
          },
          {
            label: "Email agent",
            href: "/#platform",
            description: "Threads triaged, answered and closed",
            icon: "mail",
          },
        ],
      },
      {
        title: "Platform",
        links: [
          {
            label: "Playbooks",
            href: "/#workflows",
            description: "Your procedures, followed step by step",
            icon: "workflow",
          },
          {
            label: "Actions",
            href: "/#capabilities",
            description: "Refunds, changes and lookups in your tools",
            icon: "zap",
          },
          {
            label: "Insights",
            href: "/#platform",
            description: "Every conversation scored and explained",
            icon: "chart-line",
          },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    feature: "story",
    columns: [
      {
        title: "By industry",
        links: [
          {
            label: "E-commerce",
            href: "/industries/ecommerce/",
            description: "Orders, returns and delivery questions",
            icon: "shopping-bag",
          },
          {
            label: "Fintech",
            href: "/#workflows",
            description: "Cards, payments and disputes",
            icon: "credit-card",
          },
          {
            label: "Travel",
            href: "/#workflows",
            description: "Changes and disruption at scale",
            icon: "plane",
          },
        ],
      },
      {
        title: "By team",
        links: [
          {
            label: "Support leaders",
            href: "/#results",
            description: "Higher resolution, lower cost per contact",
            icon: "headset",
          },
          {
            label: "Operations",
            href: "/#workflows",
            description: "Playbooks that run without a queue",
            icon: "settings-2",
          },
          {
            label: "Security and IT",
            href: "/#security",
            description: "Controls, residency and audit",
            icon: "shield-check",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    feature: "latest",
    columns: [
      {
        title: "Read",
        links: [
          {
            label: "Blog",
            href: "/blog/",
            description: "Everything we publish",
            icon: "book-open",
          },
          {
            label: "Guides",
            href: "/blog/topic/guides/",
            description: "Playbooks for going live",
            icon: "map",
          },
          {
            label: "Engineering",
            href: "/blog/topic/engineering/",
            description: "How Spark is built",
            icon: "cpu",
          },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about/", description: "Who we are and why", icon: "sparkles" },
          {
            label: "Careers",
            href: "/careers/",
            description: "Open roles, remote first",
            icon: "users",
          },
          {
            label: "Contact",
            href: "/contact/",
            description: "Sales, support and press",
            icon: "send",
          },
        ],
      },
    ],
  },
  { label: "Customers", href: "/#customers" },
  { label: "Pricing", href: "/pricing/" },
];

export const footerNavigation: MenuColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Chat agent", href: "/#platform" },
      { label: "Voice agent", href: "/#platform" },
      { label: "Email agent", href: "/#platform" },
      { label: "Playbooks", href: "/#workflows" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "E-commerce", href: "/industries/ecommerce/" },
      { label: "Fintech", href: "/#workflows" },
      { label: "Travel", href: "/#workflows" },
      { label: "Security", href: "/#security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog/" },
      { label: "Guides", href: "/blog/topic/guides/" },
      { label: "Search", href: "/blog/search/" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Careers", href: "/careers/" },
      { label: "Customers", href: "/#customers" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];
