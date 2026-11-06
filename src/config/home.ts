import type { ImageMetadata } from "astro";
import ana from "@/assets/images/team/ines-moreau.jpg";
import jonas from "@/assets/images/people/jonas-lindqvist.jpg";
import marcus from "@/assets/images/people/marcus-bell.jpg";
import priya from "@/assets/images/people/priya-raman.jpg";
import sofia from "@/assets/images/people/sofia-almeida.jpg";

/** Where a demo photo came from, for the credits in the README. */
export interface Credit {
  name: string;
  url: string;
}

/** Fictional companies for the logo strip and testimonials. Marks are drawn in `CompanyLogo.astro`. */
export const companies = [
  "Northwind",
  "Kestrel",
  "Lumen",
  "Parcelry",
  "Harbor",
  "Orbitra",
  "Fieldstone",
  "Quanta",
  "Vela",
  "Mosaic",
  "Tessel",
  "Brightline",
] as const;

export type CompanyName = (typeof companies)[number];

/**
 * Headline text marks one phrase for the accent colour with asterisks:
 * "Support that *resolves*" sets "resolves" in indigo.
 */
export const hero = {
  title: "Support that *resolves,* not just replies",
  lead: "Spark puts AI agents on chat, email and voice that refund, rebook, reset and resolve, inside the rules you write and with every step on the record.",
  notes: ["14-day free trial", "Live in under a week", "SOC 2 Type II"],
  /** Read by screen readers in place of the product UI, which is drawn in `src/components/app`. */
  productLabel:
    "The Spark inbox: a chat where the agent refunds a damaged order from a photo, with the playbook steps and quality score beside it",
};

export const logoStrip = {
  title: "Trusted by 1,200+ support teams",
  /** Shown in order, then repeated for the scrolling strip. */
  items: [
    "Northwind",
    "Lumen",
    "Parcelry",
    "Harbor",
    "Orbitra",
    "Fieldstone",
    "Quanta",
    "Vela",
    "Mosaic",
    "Tessel",
    "Brightline",
    "Kestrel",
  ] as CompanyName[],
};

export interface FlowNode {
  icon: string;
  title: string;
  sub: string;
  rows?: [string, string][];
  /** A highlighted line under the rows. */
  note?: string;
  /** A message bubble. */
  bubble?: string;
  /** Tool calls, each shown with a check. */
  tools?: string[];
}

export interface Workflow {
  id: string;
  label: string;
  icon: string;
  body: string;
  /** Four cards, in order: the record, the action, the message, the outcome. */
  nodes: [FlowNode, FlowNode, FlowNode, FlowNode];
  /** The status chips between the cards. */
  steps: [string, string, string];
}

export const workflows: {
  id: string;
  title: string;
  lead: string;
  cta: string;
  items: Workflow[];
} = {
  id: "workflows",
  title: "From first message to *done*",
  lead: "Spark follows your procedures step by step, calls the systems that hold the answer, and closes the loop with the customer. Pick a playbook to watch it run.",
  /** The button under the canvas; it links to `siteConfig.actions.primary`. */
  cta: "See it on your tickets",
  items: [
    {
      id: "refunds",
      label: "Refunds and returns",
      icon: "receipt",
      body: "A damaged delivery is checked against the order, the photo and your refund policy, refunded inside your limit and closed with a note for the carrier claim.",
      nodes: [
        {
          icon: "package",
          title: "Order #48213",
          sub: "Delivered Oct 2 · Gold customer",
          rows: [
            ["Item", "Ceramic vase, sand"],
            ["Total", "€64.00"],
            ["Carrier", "DHL Express"],
          ],
          note: "Photo shows damage on arrival",
        },
        {
          icon: "receipt",
          title: "Refund issued",
          sub: "Stripe · re_3PkL2",
          tools: ["Damaged on arrival", "Under the €200 limit", "€64.00 to Visa 4821"],
        },
        {
          icon: "message-circle",
          title: "Chat reply",
          sub: "Sent in 0.8s",
          bubble:
            "So sorry, Maya. I've refunded €64.00 to your Visa ending 4821, and there's no need to send it back.",
        },
        {
          icon: "circle-check",
          title: "Resolved in 1m 48s",
          sub: "No hand-off needed",
          rows: [
            ["Rating", "5 / 5"],
            ["Carrier claim", "Filed"],
          ],
        },
      ],
      steps: ["Checking policy", "Replying", "Closing"],
    },
    {
      id: "delivery",
      label: "Delivery changes",
      icon: "truck",
      body: "When a customer will miss a delivery, Spark finds a new slot with the carrier, books it and confirms by text before the van leaves the depot.",
      nodes: [
        {
          icon: "truck",
          title: "Shipment UK-90231",
          sub: "Out for delivery today",
          rows: [
            ["Carrier", "Royal Mail"],
            ["Window", "Today, 14:00–16:00"],
            ["Address", "12 Elm Road, Leeds"],
          ],
          note: "Customer away until Saturday",
        },
        {
          icon: "calendar",
          title: "Delivery rescheduled",
          sub: "Carrier API",
          tools: ["Saturday 9–12 available", "Redelivery booked", "No fee applied"],
        },
        {
          icon: "phone",
          title: "SMS sent",
          sub: "To +44 7700 900 412",
          bubble:
            "Hi James, your parcel will now arrive on Saturday between 9am and 12pm. Reply CHANGE to pick another day.",
        },
        {
          icon: "circle-check",
          title: "Delivery moved",
          sub: "Confirmed by the customer",
          rows: [
            ["New slot", "Sat 9:00–12:00"],
            ["Time to resolve", "52s"],
          ],
        },
      ],
      steps: ["Contacting carrier", "Notifying", "Confirming"],
    },
    {
      id: "billing",
      label: "Billing disputes",
      icon: "credit-card",
      body: "A duplicate charge is matched to the invoice, refunded and explained in the customer's own language, before it turns into a chargeback.",
      nodes: [
        {
          icon: "credit-card",
          title: "Invoice INV-20931",
          sub: "Pro plan · monthly",
          rows: [
            ["Charged", "€29.00 × 2"],
            ["Date", "Oct 1, 08:14"],
            ["Card", "Mastercard 1102"],
          ],
          note: "Duplicate charge detected",
        },
        {
          icon: "wallet",
          title: "Duplicate refunded",
          sub: "Stripe · re_9Fh21",
          tools: ["Same amount, same minute", "Card holder verified", "€29.00 refunded"],
        },
        {
          icon: "mail",
          title: "Email reply",
          sub: "In Spanish, to match the customer",
          bubble:
            "Hola Lucía, hemos devuelto el cargo duplicado de 29,00 €. Lo verás en tu cuenta en 3 a 5 días.",
        },
        {
          icon: "circle-check",
          title: "Chargeback avoided",
          sub: "Resolved in 2m 05s",
          rows: [
            ["Refund", "€29.00"],
            ["Language", "Spanish"],
          ],
        },
      ],
      steps: ["Verifying", "Writing", "Closing"],
    },
    {
      id: "access",
      label: "Account access",
      icon: "key-round",
      body: "Locked-out customers are verified with a step-up check, unlocked and sent a fresh reset link, without a ticket ever reaching your queue.",
      nodes: [
        {
          icon: "user-round",
          title: "Account aiko.n@…",
          sub: "Locked after 5 attempts",
          rows: [
            ["Last sign-in", "14 days ago"],
            ["2FA", "Authenticator app"],
            ["Risk", "Low"],
          ],
          note: "Identity check required",
        },
        {
          icon: "fingerprint",
          title: "Identity verified",
          sub: "Okta · step-up",
          tools: ["Email code matched", "Known device", "Lock cleared"],
        },
        {
          icon: "message-circle",
          title: "Chat reply",
          sub: "Sent in 0.6s",
          bubble:
            "You're verified, Aiko. A fresh reset link is on its way to your inbox and works for the next 30 minutes.",
        },
        {
          icon: "circle-check",
          title: "Access restored",
          sub: "Signed in at 10:22",
          rows: [
            ["2FA", "Unchanged"],
            ["Time to resolve", "1m 12s"],
          ],
        },
      ],
      steps: ["Verifying identity", "Sending link", "Confirming"],
    },
    {
      id: "subscriptions",
      label: "Plan changes",
      icon: "repeat",
      body: "Upgrades, pauses and downgrades are quoted from your price book, applied with proration and written back to the CRM in the same conversation.",
      nodes: [
        {
          icon: "repeat",
          title: "Subscription",
          sub: "Starter · monthly",
          rows: [
            ["Price", "€19 / month"],
            ["Renews", "Oct 18"],
            ["Seats", "3 of 3 used"],
          ],
          note: "Asked about annual pricing",
        },
        {
          icon: "zap",
          title: "Plan upgraded",
          sub: "Billing API · prorated",
          tools: ["Annual Pro quoted", "Customer accepted", "Credit applied"],
        },
        {
          icon: "mail",
          title: "Email receipt",
          sub: "Sent with the invoice",
          bubble:
            "Welcome to Pro, Rohan! You're on the annual plan at €190 a year, with €11.40 credited for this month.",
        },
        {
          icon: "circle-check",
          title: "Upgrade closed",
          sub: "+€190 a year",
          rows: [
            ["CRM", "HubSpot updated"],
            ["Time to resolve", "3m 40s"],
          ],
        },
      ],
      steps: ["Pricing options", "Confirming", "Updating CRM"],
    },
    {
      id: "handoffs",
      label: "Hand-offs",
      icon: "users",
      body: "Cases above the agent's authority go to the right person with photos, policy and a summary attached, so nobody asks the customer anything twice.",
      nodes: [
        {
          icon: "triangle-alert",
          title: "Insurance claim",
          sub: "Policy HX-22719",
          rows: [
            ["Type", "Water damage"],
            ["Estimate", "€6,200"],
            ["Sentiment", "Frustrated"],
          ],
          note: "Above the agent's authority",
        },
        {
          icon: "list-checks",
          title: "Case prepared",
          sub: "Zendesk · ticket 88213",
          tools: ["Photos collected", "Policy attached", "Summary written"],
        },
        {
          icon: "users",
          title: "Handed to Ana",
          sub: "Claims team · online",
          bubble:
            "Tom needs a claims specialist: kitchen water damage, about €6.2k. Photos and policy attached.",
        },
        {
          icon: "circle-check",
          title: "Picked up in 40s",
          sub: "No repeat questions",
          rows: [
            ["Queue", "Claims · priority"],
            ["Rating", "5 / 5"],
          ],
        },
      ],
      steps: ["Gathering details", "Routing", "Following up"],
    },
  ],
};

export const capabilities = {
  id: "capabilities",
  title: "Everything it takes to *finish* the job",
  lead: "Answering is the easy part. Spark is built for the rest: acting in your systems, staying inside policy and knowing when to bring in a person.",
  actions: {
    title: "Takes real actions",
    body: "Refunds, rebookings, plan changes and lookups, through the same APIs your team uses.",
    calls: [
      { tool: "shopify.find_order", detail: "#48213 · delivered" },
      { tool: "stripe.refund", detail: "€64.00 · succeeded" },
      { tool: "zendesk.add_note", detail: "carrier claim" },
      { tool: "hubspot.update", detail: "lifecycle: customer" },
    ],
  },
  channels: {
    title: "One agent, every channel",
    body: "The same brain on chat, email, voice, WhatsApp and SMS.",
    items: [
      { icon: "message-circle", label: "Chat" },
      { icon: "mail", label: "Email" },
      { icon: "phone", label: "Voice" },
    ],
  },
  languages: {
    title: "Fluent in 45 languages",
    body: "Detected in the first message and answered in kind.",
    words: ["Hello", "Hola", "Bonjour", "Hallo", "Ciao", "Olá", "Hej", "Merhaba"],
  },
  guardrails: {
    title: "Guardrails on every turn",
    body: "Each reply is checked before it's sent.",
    checks: ["PII masked", "Refund under limit", "On-policy answer", "Prompt injection blocked"],
  },
  knowledge: {
    title: "Learns from what you already have",
    body: "Help centre, macros, past tickets and PDFs, kept in sync.",
    sources: [
      { label: "Help centre", count: "412 articles" },
      { label: "Past tickets", count: "38k resolved" },
      { label: "Policies", count: "16 PDFs" },
    ],
  },
  handoff: {
    title: "Hands off with context",
    body: "When a person should take over, they get the whole story.",
    badge: "Handed off · 40s",
    /** The person receiving the hand-off. */
    to: { name: "Ana", photo: ana },
    summary:
      "Water damage claim, €6.2k. Photos and policy attached. Customer prefers a call after 5pm.",
    attachments: [
      { icon: "paperclip", label: "3 photos" },
      { icon: "file-text", label: "Policy HX-22719" },
      { icon: "clock", label: "Call after 5pm" },
    ],
  },
};

export const platform: {
  id: string;
  title: string;
  lead: string;
  steps: {
    label: string;
    title: string;
    body: string;
    points: string[];
    view: "build" | "launch" | "improve";
    viewLabel: string;
  }[];
} = {
  id: "platform",
  title: "Build it, launch it, *improve* it",
  lead: "One workspace for the people who write the procedures, the people who answer for the results and the agent that does the work.",
  steps: [
    {
      label: "Build",
      title: "Write playbooks in plain language",
      body: "Describe the procedure the way you'd train a new hire. Mention a tool and Spark calls it; set a limit and Spark won't cross it. Simulate hundreds of conversations before anything goes live.",
      points: [
        "Natural-language steps with typed tool calls",
        "Limits and hand-off rules per playbook",
        "Simulation on real past tickets",
      ],
      /** Which view in `src/components/app` the step shows. */
      view: "build",
      viewLabel:
        "The playbook editor: four numbered steps with tool calls and a refund condition, beside a test run and its simulated results",
    },
    {
      label: "Launch",
      title: "Go live on every channel at once",
      body: "Turn on chat, email and voice from one configuration. Your team sees every conversation as it happens and can take over with a click.",
      points: [
        "Chat, email, voice, WhatsApp and SMS",
        "Live inbox with one-click take-over",
        "Brand voice and tone per channel",
      ],
      view: "launch",
      viewLabel:
        "The channels view: chat, email, voice and WhatsApp with today’s volume, above a list of live conversations",
    },
    {
      label: "Improve",
      title: "See what to fix next",
      body: "Every conversation is scored for accuracy, policy and tone. Spark spots the questions it can't answer yet and drafts the fix for you to approve.",
      points: [
        "Quality scores on 100% of conversations",
        "Knowledge gaps found automatically",
        "Suggested fixes, tested before release",
      ],
      view: "improve",
      viewLabel:
        "The insights dashboard: resolution rate, rating and cost, a weekly trend and a suggested fix for a knowledge gap",
    },
  ],
};

export const results = {
  id: "results",
  title: "Numbers your CFO and your customers *both* like",
  stats: [
    { value: 82, suffix: "%", label: "of conversations resolved without a person" },
    { value: 0.9, suffix: "s", decimals: 1, label: "median first response, on every channel" },
    {
      value: 4.8,
      suffix: "/5",
      decimals: 1,
      label: "average customer rating after a Spark conversation",
    },
    { value: 71, prefix: "−", suffix: "%", label: "cost per contact in the first year" },
  ],
  note: "Median across Spark customers live for six months or more.",
};

/** File names in `src/assets/integrations`, without `.svg`. */
export const integrations = {
  id: "integrations",
  title: "Plugs into the stack you *already* run",
  lead: "Native connectors for helpdesks, commerce, billing and CRM, plus a typed API for anything in-house. Most teams connect their first three systems in an afternoon.",
  inner: ["zendesk", "shopify", "stripe", "slack", "salesforce", "intercom"],
  outer: [
    "hubspot",
    "whatsapp",
    "twilio",
    "notion",
    "jira",
    "gmail",
    "okta",
    "snowflake",
    "googledrive",
    "confluence",
  ],
  categories: ["Helpdesk", "Commerce", "Payments", "CRM", "Messaging", "Voice", "Identity", "Data"],
  cta: { label: "Browse all 120+ integrations", href: "/contact/?topic=partners" },
};

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: CompanyName;
  photo: ImageMetadata;
  /** Where the face sits in the photo, as an `object-position` value. */
  focus?: string;
  credit: Credit;
  result: { value: string; label: string };
}

export const testimonials: { id: string; title: string; items: Testimonial[] } = {
  id: "customers",
  title: "Loved by the teams who *answer* for it",
  items: [
    {
      quote:
        "We expected Spark to deflect the easy tickets. It ended up closing refunds and delivery changes end to end, and our team finally has time for the conversations that need a person.",
      name: "Priya Raman",
      role: "VP Customer Operations",
      company: "Parcelry",
      photo: priya,
      focus: "62% 22%",
      credit: {
        name: "Abenezer Shewaga / Unsplash",
        url: "https://unsplash.com/photos/xc5gojDaxW8",
      },
      result: { value: "84%", label: "resolved end to end" },
    },
    {
      quote:
        "Compliance signed off because they could read the playbooks themselves. Spark writes the reply; the limits decide the money.",
      name: "Jonas Lindqvist",
      role: "Head of Digital Service",
      company: "Harbor",
      photo: jonas,
      focus: "50% 38%",
      credit: { name: "Alef Morais / Unsplash", url: "https://unsplash.com/photos/LPvi7DMp-HU" },
      result: { value: "0", label: "policy breaches in a year" },
    },
    {
      quote:
        "Storm days used to mean a four-hour hold queue. Now the agent rebooks thousands of passengers before our morning shift logs on.",
      name: "Sofia Almeida",
      role: "Director of Customer Care",
      company: "Vela",
      photo: sofia,
      credit: {
        name: "Cemrecan Yurtman / Unsplash",
        url: "https://unsplash.com/photos/ih03D0F6M6M",
      },
      result: { value: "9×", label: "peak-day capacity" },
    },
    {
      quote:
        "We connected Shopify, Stripe and Zendesk on a Tuesday and had Spark answering live chat by Friday. The simulations meant no surprises.",
      name: "Marcus Bell",
      role: "Head of Support Engineering",
      company: "Northwind",
      photo: marcus,
      credit: { name: "mehdi pezhvak / Unsplash", url: "https://unsplash.com/photos/43AUR3OGt3I" },
      result: { value: "4 days", label: "from contract to live" },
    },
  ],
};

export const security = {
  id: "security",
  title: "Enterprise-grade, from the *first* conversation",
  lead: "Spark runs in your region, keeps your data out of model training and records every action with the rule that allowed it.",
  badges: [
    { name: "SOC 2", note: "Type II" },
    { name: "ISO", note: "27001" },
    { name: "GDPR", note: "EU hosting" },
    { name: "HIPAA", note: "BAA available" },
  ],
  features: [
    {
      icon: "eye-off",
      title: "PII redaction",
      body: "Card numbers, IDs and health data are masked before any model sees them.",
    },
    {
      icon: "globe",
      title: "Data residency",
      body: "Host in the EU, US or UK, or deploy privately in your own cloud.",
    },
    {
      icon: "lock",
      title: "SSO and roles",
      body: "SAML, SCIM and permissions down to a single playbook.",
    },
    {
      icon: "file-text",
      title: "Full audit trail",
      body: "Every action, rule change and release, exportable to your SIEM.",
    },
    {
      icon: "shield-check",
      title: "No training on your data",
      body: "Conversations never train shared models. It's in the contract.",
    },
    {
      icon: "server",
      title: "99.95% uptime",
      body: "Multi-region failover across cloud and model providers.",
    },
  ],
};

export const faq = {
  id: "faq",
  title: "Questions, *answered*",
  lead: "Can't find what you need? Our team replies within a working day.",
  items: [
    {
      q: "How is Spark different from a chatbot?",
      a: "A chatbot answers questions. Spark finishes the job: it follows your playbooks, calls your systems to refund, rebook or update an account, and only hands off when a person is genuinely needed.",
    },
    {
      q: "How long does it take to go live?",
      a: "Most teams are live on one channel within a week. Connecting your helpdesk and knowledge takes an afternoon; the rest of the week goes on writing playbooks and simulating them against past tickets.",
    },
    {
      q: "What happens when Spark can't help?",
      a: "It hands the conversation to the right queue in your helpdesk with a summary, the customer's details and everything it already tried, so nobody asks the same question twice.",
    },
    {
      q: "Which language models does Spark use?",
      a: "Spark routes each step to the model that suits it best across several leading providers, and fails over automatically. Enterprise plans can bring their own model or keep processing in their own cloud.",
    },
    {
      q: "Is our data used to train models?",
      a: "No. Your conversations stay in your workspace and are never used to train shared models. That commitment is written into every contract.",
    },
    {
      q: "How is Spark priced?",
      a: "Per resolved conversation, not per seat. Hand-offs to your team are never billed. See the pricing page for plans and a full comparison.",
    },
  ],
};

export const latestPosts = {
  title: "Notes from the *team*",
  cta: { label: "All posts", href: "/blog/" },
};

export const closing = {
  title: "Give your team its *evenings* back",
  lead: "Bring a week of real tickets. We'll show you how many Spark resolves, and exactly how it got there.",
};
