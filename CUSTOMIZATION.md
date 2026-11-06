# Customization Guide

Use this guide when adapting Spark for a real product.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the product name, tagline, default metadata, canonical domain, language and date locale, contact email, the calls to action, the announcement pill, the contact and newsletter forms, and social links.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

`siteConfig.actions` holds the calls to action used across the site:

- `primary` is the "Get a demo" button in the header, the hero, the mobile menu, and the closing panel. It ships pointing at the contact page; point it at a booking page if you use one.
- `secondary` is the "Start free trial" button beside it in the hero and the closing panel.
- `signIn` is the "Log in" link in the header and the mobile menu. Replace it with your app's login URL.

`siteConfig.announcement` is the pill above the hero headline, with a `badge`, a `text`, and an `href`. Set `enabled: false` to remove it.

The logo and logomark are SVGs in [src/assets/brand](./src/assets/brand), inlined by [src/components/ui/Wordmark.astro](./src/components/ui/Wordmark.astro) in the header and footer and by [src/components/ui/Logomark.astro](./src/components/ui/Logomark.astro) as a white app-icon tile. The top arc of the S has `class="logo-mark"`, so it takes the brand colour, while the rest of the mark and the word follow `currentColor`. Replace the files with your own and keep that class on the mark. Right-clicking the logo opens a small menu, [src/components/chrome/LogoMenu.astro](./src/components/chrome/LogoMenu.astro), to copy the logo as SVG or download it. The favicon is [public/favicon.svg](./public/favicon.svg). `siteConfig.name` still names the product in page titles, the feed, the structured data, and the logo's accessible label.

## Navigation and Dropdowns

The header, its dropdowns, and the mobile menu all read `navigation` in [src/config/site.ts](./src/config/site.ts). Each entry is either a plain link or a menu:

```ts
{ label: "Pricing", href: "/pricing/" },
{
  label: "Product",
  feature: "product",
  columns: [
    {
      title: "Agents",
      links: [
        { label: "Chat agent", href: "/#platform", description: "Web, in-app, WhatsApp and SMS", icon: "message-circle" },
      ],
    },
  ],
},
```

- `columns` takes two columns, each with an optional `title`.
- `description` is the line under each link, and `icon` is a file name from [src/icons/lucide](./src/icons/lucide) shown in a tile beside it. Both are optional.
- `feature` picks the card on the right of the dropdown: `product` shows the hero conversation from the inbox view, `story` the first customer result from `src/config/home.ts`, and `latest` the newest blog post.

The header is transparent at the top of the page and turns into a floating, blurred pill once you scroll. It slides away as you scroll down and returns as soon as you scroll up. A dropdown opens on click and on hover with a short intent delay; `Arrow Down` on a trigger opens it and focuses the first link, and `Escape`, a click outside, or tabbing away closes it. Below `64rem` the same entries render as a full-screen menu, each dropdown as an expandable group.

The footer columns are `footerNavigation` in the same file.

## Homepage

The homepage is assembled in [src/pages/index.astro](./src/pages/index.astro) from independent sections in [src/components/home](./src/components/home). Reorder or remove them freely. Every word of copy lives in [src/config/home.ts](./src/config/home.ts):

| Section       | Component            | Config key     |
| ------------- | -------------------- | -------------- |
| Hero          | `Hero.astro`         | `hero`         |
| Logo strip    | `LogoStrip.astro`    | `logoStrip`    |
| Playbooks     | `Workflows.astro`    | `workflows`    |
| Capabilities  | `Capabilities.astro` | `capabilities` |
| Platform      | `Platform.astro`     | `platform`     |
| Results       | `Results.astro`      | `results`      |
| Integrations  | `Integrations.astro` | `integrations` |
| Customers     | `Testimonials.astro` | `testimonials` |
| Security      | `Security.astro`     | `security`     |
| FAQ           | `Faq.astro`          | `faq`          |
| Latest posts  | `LatestPosts.astro`  | `latestPosts`  |
| Closing panel | `Closing.astro`      | `closing`      |

Headlines across the theme mark one phrase for the accent colour with asterisks: `"Support that *resolves,* not just replies"`. The [src/components/ui/Accent.astro](./src/components/ui/Accent.astro) component turns those into `<em>`, which the stylesheet sets in `--brand`, or `--spark` on dark grounds.

A few sections are worth knowing in more detail:

- **Hero.** The inbox view sits in an app window on a light grey canvas. `hero.productLabel` describes it for screen readers. `hero.notes` are the checked lines under the buttons, reused in the closing panel. The inbox reflows to the width it has, down to a single conversation on phones; see [Product UI](#product-ui).
- **Logo strip.** `logoStrip.items` are fictional companies drawn in [src/components/ui/CompanyLogo.astro](./src/components/ui/CompanyLogo.astro). The strip scrolls slowly, pauses on hover, and becomes a wrapped row under reduced motion.
- **Playbooks.** A list of playbooks beside a canvas that runs one at a time. Each item in `workflows.items` has an `id`, a `label`, an `icon`, a `body` shown under the active label, four `nodes`, and three `steps`. The nodes are, in order, the record the agent starts from, the action it takes, the message it sends, and the outcome. A node has an `icon`, a `title` and a `sub`, plus any of `rows` (label and value pairs), a highlighted `note`, `tools` (checked lines), or a message `bubble`. The `steps` are the status chips between the cards. `workflows.cta` is the label of the button under the canvas. The canvas lights each card and chip in turn, then moves to the next playbook; hovering or focusing it lets the current playbook finish without moving on, and the button in its corner pauses it. The list is a set of ARIA tabs with arrow-key support. Under reduced motion every card shows at once and nothing advances.
- **Capabilities.** A bento grid of six cards, each with a `title`, a `body`, and the content for its small visual: `actions.calls` (a tool name and a detail), `guardrails.checks`, `languages.words` (cycled in lime), `knowledge.sources`, `channels.items`, and the hand-off card (`handoff.badge`, `handoff.to` with a `name` and `photo`, `handoff.summary`, and `handoff.attachments`).
- **Platform.** Three `steps`, each with a `label`, a `title`, a `body`, `points`, a `view` (`build`, `launch`, or `improve`), and a `viewLabel` for screen readers. On desktop the view stays pinned while the steps scroll past and swaps to match the step in the middle of the screen. On smaller screens each step shows its own view.
- **Results.** Each stat has a `value`, an optional `prefix` and `suffix`, and `decimals` for values such as `0.9`. They count up once as they come into view. `results.note` explains where the figures come from.
- **Integrations.** `inner` and `outer` are file names in [src/assets/integrations](./src/assets/integrations), placed around two rings that turn slowly in opposite directions around the logomark. `categories` are the chips beside it. The names are read from each SVG's `<title>` and listed for screen readers. To add a connector, drop its SVG from [Simple Icons](https://simpleicons.org/) into that folder and add its file name to a ring.
- **Customers.** The first testimonial is the wide feature card with a portrait; the rest sit beneath it. Each has a `photo` and its `credit`, an optional `focus` for `object-position`, and a `result`. Replace them with real quotes from real customers, each with their permission, and swap the marks for their logos.
- **Latest posts.** The three newest posts, under `latestPosts.title`, with a `cta` to the blog. The section is left out when there are no posts.
- **Security.** `badges` are the round seals beside the heading, each with a `name` and a `note`. Only list standards the product actually meets. `features` are the cards below, each with an `icon`, a `title`, and a `body`.
- **Closing panel.** `closing.title` and `closing.lead`, with the site's two actions and `hero.notes` below them. On wide screens the phone chat widget sits beside them, cropped by the panel's bottom edge.

## Product UI

The product screens are HTML and CSS, not images, so they stay sharp at every size and zoom level and follow the theme's tokens. The shared pieces live in [src/components/app](./src/components/app):

- `AppWindow.astro` is the frame around each view, with `tone` set to `light` or `dark` for the ground it sits on.
- `AppRail.astro` is the app's icon rail, with `active` naming the highlighted item.
- `InboxView.astro` is the hero screen: the conversation list, a chat where the agent refunds a damaged order from a photo, and the customer, order, playbook, and quality panel. The header's `product` dropdown card shows it too.
- `PlaybookView.astro`, `ChannelsView.astro`, and `InsightsView.astro` are the Build, Launch, and Improve screens in the platform section.
- `PhoneWidget.astro` is the customer-facing chat widget on a phone, in the closing panel. Everything inside it scales with the width you give it.
- `Avatar.astro` draws a customer photo with an optional channel badge, `Pill.astro` a status pill, and `BrandMark.astro` an integration logo in its brand colour.

The workspace they show is demo data in [src/config/demo.ts](./src/config/demo.ts): the `workspace` name, the `people` with their photos from `src/assets/images/customers` and credits, and the `attachment` photo the customer sends. The conversation copy lives in each view. The views use container queries, so they drop columns as the window narrows instead of needing a separate phone layout.

Replace them with screenshots of your own product if you prefer: put a PNG in `src/assets/images` and swap the component for an `<Image>`.

## Pricing Page

[src/pages/pricing.astro](./src/pages/pricing.astro) shows the plan cards, the logo strip, the comparison table, an FAQ, and the closing panel. Everything on it lives in [src/config/pricing.ts](./src/config/pricing.ts):

- **Plans.** Each plan has an `id`, a `name`, a `description`, `highlights` for its card, and a `cta`. Set `monthly` and `annual` to monthly amounts in dollars, or both to `null` for a "Custom" plan. `featured: true` makes one card dark and raised and highlights its column in the table. The billing toggle is two native radio buttons and updates the cards and the table together. `notes` are the checked lines under the cards.
- **Comparison table.** `groups` are the sections of the table, each with a `name` and `rows`. A row has a `name`, an optional `hint` under it, and `values`, one per plan in plan order: `true` shows a check, `false` a dash, and a string is shown as written. The plan header stays pinned under the site header while the table scrolls. On phones the table shows one plan at a time, the featured one first, and a switcher above it picks another.
- **FAQ.** `faq` has its own `title` and `items`, rendered by the same `Faq.astro` as the homepage.

## Images

Photographs live in [src/assets/images](./src/assets/images) and are imported in the config for their page ([src/config/home.ts](./src/config/home.ts), [src/config/about.ts](./src/config/about.ts), [src/config/careers.ts](./src/config/careers.ts), [src/config/industries.ts](./src/config/industries.ts)), so Astro resizes them and serves responsive sources. Replace a file in place, or import a new one and point the config at it. Keep the `credit` and `photoCredit` fields up to date for anything that needs attribution.

## Blog

Posts live in [src/content/blog](./src/content/blog), one folder per post. The folder name is the URL. Frontmatter is validated by [src/content.config.ts](./src/content.config.ts):

```yaml
---
title: "Why our refund playbook never asks the model for permission"
description: "Between 40 and 220 characters, used on cards, in search, and as the meta description."
date: 2026-09-16
updated: 2026-09-20 # optional
topic: Engineering
author: Tomasz Wrona
coauthors: [Ines Moreau] # optional, more names on the byline
cover: ./cover.jpg
coverAlt: "Cardboard parcels stacked inside a delivery van"
coverCredit: # optional, printed under the cover
  name: "Tima Miroshnichenko / Pexels"
  url: "https://www.pexels.com/photo/6170458/"
tags: [playbooks, reliability]
cta: # optional, see below
  after: 2
featured: true # optional, pins the post to the lead slot
draft: false # optional
---
```

- `topic` must be one of the topics in [src/config/blog.ts](./src/config/blog.ts). Add, remove, or rename topics there, with a one-line description each; the topic pages, the topic filter, and the schema all follow.
- `author` is looked up in `authors` in the same file for a role and an optional `photo` with its `credit`, shown in the byline and in the author card at the foot of the post. A name with no entry still builds, with the logomark in place of a portrait.
- `coauthors` adds more names after `author`, each looked up the same way. The byline overlaps their portraits and joins the names ("Ines Moreau & Tomasz Wrona"), the author card gives each one a row, and search, the feed, and the structured data list every name.
- `draft: true` keeps a post out of every listing, feed, search index, and route in production. Drafts still show in `npm run dev`.
- `POSTS_PER_PAGE` in `src/config/blog.ts` sets the page size for the index and topic archives. The first page opens with the featured post, or the newest if none is flagged.

Every post carries a dark call-to-action panel, [src/components/blog/PostCta.astro](./src/components/blog/PostCta.astro). Its copy is `postCta` in `src/config/blog.ts` and its button is `siteConfig.actions.primary`. By default it closes the post; a `cta` block in frontmatter moves it and changes its copy for that post:

```yaml
cta:
  after: 2 # below the second ## section
  title: Walk through the five weeks with our team
  body: We will map the plan onto your queue.
  label: Talk to us
  href: /pricing/
```

Every field is optional, and `cta: false` removes the panel. The panel is moved into place by a line of inline script as the page loads, so it works in `.md` and `.mdx` posts alike and stays at the end of the post without JavaScript.

On the post page, every `##` heading becomes an entry in the table of contents and every `###` nests under the `##` before it; the list tracks the reader's position. Code blocks get a language label and a copy button. Tables, blockquotes, and lists are styled in `.prose` in [src/styles/global.css](./src/styles/global.css).

## Blog Covers

The demo posts use landscape photos from [Pexels](https://www.pexels.com/), saved as `cover.jpg` in each post's folder with a `coverCredit` that prints under the image on the post. Use any landscape photo around 1800 pixels wide. The cover is also the post's share image, cropped to 1200x630 at build time.

For posts without a photo, [scripts/covers.mjs](./scripts/covers.mjs) draws a line icon on a glass tile over a flat brand colour with a light dither, into the post's folder as `cover.png`. Point `cover` at `./cover.png` and run:

```bash
npm run covers            # covers for posts that have none
npm run covers -- --force # every cover again
```

Each post picks its icon with `coverArt`, any file name from [src/icons/lucide](./src/icons/lucide) without the extension, and its colour with `coverTone`: `iris` for bright indigo, `night` for dark, or `lilac` for a pale cover with a dark icon. Leave either field off and the script picks one. The script skips posts whose cover is a photo, and needs Node.js `22.18.0` or newer. Either way, write a `coverAlt` that describes the picture.

## Sharing

Every post has a Share button beside the byline and in the sidebar. Both open one share sheet, [src/components/blog/ShareSheet.astro](./src/components/blog/ShareSheet.astro), a native `<dialog>` with X, LinkedIn, Facebook, email, WhatsApp, Telegram, and Threads, plus Bluesky, Mastodon, Reddit, and Pinterest behind "More", and the page link with a copy button. Add or remove networks in the `targets` and `extraTargets` lists at the top of the file; each takes a label, a Bootstrap icon from [src/icons/bootstrap](./src/icons/bootstrap) addressed as `social-<file name>`, a brand colour, and a share URL.

## Search

Search covers the blog, so it only appears there: the search field in the blog header, `Ctrl + K` or `Command + K`, or `/` outside a form field opens the palette in [src/components/chrome/SearchDialog.astro](./src/components/chrome/SearchDialog.astro), and `/blog/search/` is a full results page that lists every post without JavaScript and filters as you type. Both rank results with the same function in [src/lib/search.ts](./src/lib/search.ts): title matches first, then topic and tags, then everything else, matched on word starts.

The index is served from [src/pages/search-index.json.ts](./src/pages/search-index.json.ts) and fetched the first time search is opened. It carries each post's title, description, topic, author, date, tags, and URL, but not its body. For full-text search across a large archive, consider [Pagefind](https://pagefind.app/).

## Industry Pages

[src/pages/industries/[slug].astro](./src/pages/industries/[slug].astro) builds one page per entry in `industryPages` in [src/config/industries.ts](./src/config/industries.ts). The demo ships E-commerce at `/industries/ecommerce/` as a template. To add another industry, copy that entry, give it a new `slug`, and point its menu link at `/industries/<slug>/`.

Each entry holds:

- **Header.** `name`, `title`, `lead`, a `photo` with `photoAlt` and `photoCredit`, and four `metrics` laid over the photo.
- **Intents.** `intents.items` is the table of the conversations that fill the queue. Each has an `intent`, an `example` quote, a `share` and a `resolved` percentage, and the `playbook` that handles it. A `resolved` of `0` reads "To a person".
- **Playbook.** `playbook.photo` with its `photoAlt` and `photoCredit` sits beside the copy, with two cards over it: the customer's `question` and the `result`, a `title` and a `detail`. `playbook.points` are the checked lines beside it.
- **Peak.** `peak.days` is the line chart, one day each with a `date`, total `contacts`, and the `handedOff` part drawn as the lower line. `highlight` marks a day on the line. A crosshair follows the pointer, a tap, or the arrow keys, and the headline follows it.
- **Systems.** `systems.items` lists each connected system with an `icon`, and what the agent `reads` and `writes`.
- **Story, FAQ and closing.** `story` is the `name` of a testimonial in [src/config/home.ts](./src/config/home.ts). `faq` has its own `title` and `items`, and `closing` is the `title` and `body` of the panel at the foot of the page.

## Contact

The contact page is [src/pages/contact.astro](./src/pages/contact.astro), with its copy in [src/config/contact.ts](./src/config/contact.ts): the headline, the `steps` under the intro, the `topics` in the "I'd like to…" select, the `teamSizes`, the `routes` under `routesTitle` (each with a `label`, a `detail`, and an `email`), and the `offices`, each with a `city` and an `address`.

Link to `/contact/?topic=<value>` to preselect a topic; the pricing plans do this. The form posts `topic`, `name`, `email`, `company`, `team_size`, and `message` to `siteConfig.contact`:

```ts
contact: {
  enabled: true,
  action: "https://example.com/contact",
  method: "post",
}
```

It only submits when `enabled` is `true` and `action` is set. Until then the fields can be filled in but the send button is disabled, and a note says so.

## About

The about page is [src/pages/about.astro](./src/pages/about.astro), with all its content in [src/config/about.ts](./src/config/about.ts): the headline, the team photo, the story, four facts, the milestones, the leadership portraits (each with a `photo` and `credit`), the team globe, and the closing call to careers. `team.places` are the pins on the globe in [src/components/about/TeamGlobe.astro](./src/components/about/TeamGlobe.astro): each has a `city`, a `country`, a `people` count, a `location` as `[latitude, longitude]`, and `hub: true` for the hubs. The globe spins on its own and can be dragged; each place types out its label as it turns to the front. The closing panel counts the open roles in [src/config/careers.ts](./src/config/careers.ts).

## Careers

The careers page is [src/pages/careers.astro](./src/pages/careers.astro), with all its content in [src/config/careers.ts](./src/config/careers.ts): the headline, the photo, three facts, the values, the benefits, the open roles, and the closing prompt.

Each role has a `title`, a `team`, a `location`, a `type`, and an `applyUrl`. Roles are grouped by team in the order they first appear, and a filter above the list shows one team at a time. `applyUrl` is where the row links; the demo leaves it empty, so rows render without a link until you point each one at its posting.

## Feeds and Social Cards

`/rss.xml` carries the twenty newest posts. Posts share their own cover, cropped to 1200x630 at build time; every other page uses `public/og-image.png`, a 1200x630 card showing the homepage hero over a dithered indigo background. Replace it with your own card at the same size after rebranding.

Structured data is built in [src/lib/schema.ts](./src/lib/schema.ts): `Organization` and `WebSite` on every page, and `BlogPosting` with a `BreadcrumbList` on posts.

## Newsletter

The footer signup is provider-neutral. Configure `siteConfig.newsletter`:

```ts
newsletter: {
  enabled: true,
  action: "https://example.com/subscribe",
  method: "post",
  emailFieldName: "email",
  title: "The Spark dispatch",
  description: "One email a month: what shipped, what we measured, and what support teams are learning.",
}
```

The form only submits when `enabled` is `true` and `action` is set. Until then the field and button are disabled, and a note says so.

## Adding Pages

To add a page such as `/press/`, create `src/pages/press.astro`, wrap it in `BaseLayout`, and reuse the pieces already in the theme: `.shell` for the page width, `text-display-lg` and `text-lead` for headings and intros, `pattern` for the faint dither behind a header (or the indigo glow on an `on-night` panel), `on-night` for dark sections, `card` for a rounded surface, and `SectionHead` for a centred section heading. [src/pages/careers.astro](./src/pages/careers.astro) is a good starting point. Then link to it from `navigation` or `footerNavigation`.

## Icons

Interface icons come from [Lucide](https://lucide.dev/) in [src/icons/lucide](./src/icons/lucide) and social and share marks from Bootstrap Icons in [src/icons/bootstrap](./src/icons/bootstrap), each folder with its license notice. [src/components/ui/Icon.astro](./src/components/ui/Icon.astro) loads both by file name: `<Icon name="arrow-right" />` for a Lucide outline, and `<Icon name="social-linkedin" />` for a Bootstrap mark. To add an icon, drop its SVG into the right folder and use its file name. Integration marks are separate, in [src/assets/integrations](./src/assets/integrations).

## Theme Tokens

Colours, radii, type sizes, and the page width are custom properties at the top of [src/styles/global.css](./src/styles/global.css), exposed to Tailwind as utilities (`bg-page`, `text-muted`, `bg-brand`, `text-spark`, `bg-night`, `bg-brand-wash`, `rounded-card`, and so on).

- `--page`, `--surface`, and `--sunken` are the light grounds. Cards sit on `--surface`.
- `--brand` is the indigo used for buttons, links, and accents, with `--brand-ink` for hover and `--brand-soft` and `--brand-wash` for tinted backgrounds.
- `--spark` is the lime highlight, used on dark grounds and for small badges.
- `--night` is the dark ground for the platform and security sections, the closing panel, and the footer, with `--night-raised` for cards on it and `--night-ink` and `--night-muted` for text. `--night-glow` is the indigo that `pattern` spreads across dark sections and panels; a panel moves it with `--glow`, for example `[--glow:80%_90%_at_85%_10%]`.
- `--good`, `--good-soft`, `--warn`, and `--warn-soft` colour status chips and checks.
- `--radius-card` and `--radius-panel` are the two main corner sizes (`rounded-card`, `rounded-panel`); buttons and pills are fully rounded.
- The `pattern` class lays a faint ordered dither behind a section, in soft clouds that stay light behind a centred headline and fade out toward the bottom. The dots come from [public/textures/dither.png](./public/textures/dither.png), used only as a mask, so they take `--ink` on light grounds and `--night-ink` on dark ones; change their strength with the `opacity` on `.pattern::before`. The icon-cover script uses the same file. The `dither` class puts a dot grid behind the playbook canvas.
- `--measure` is the content width and `--gutter` the side padding, used by `.shell`.

To change the brand colour, set `--brand`, `--brand-ink`, `--brand-soft`, `--brand-wash`, and `--night-glow`, update the indigo in `public/favicon.svg` and in `scripts/covers.mjs` before regenerating any icon covers, and replace `public/og-image.png`.

## Fonts

Spark self-hosts one OFL-licensed font in [public/fonts/instrument](./public/fonts/instrument): **Instrument Sans**, a variable sans for everything. Code uses the system monospace stack.

To swap the typeface, replace the `@font-face` rule and the `--font-sans` token at the top of `global.css`, and update the font preload in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro).

## Motion

- Page headers rise in once on load with a short stagger (the `rise` class, delayed by `--i`).
- Sections below the fold carry `reveal`, which animates on a CSS view timeline where supported and falls back to a small IntersectionObserver in `BaseLayout.astro` elsewhere.
- The playbook canvas, the logo strip, the language card, the integrations rings, the result counters, and the about-page globe all stop or settle into a final frame under `prefers-reduced-motion: reduce`.
