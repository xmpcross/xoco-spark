export interface Plan {
  /** Used as the column key in the comparison table. */
  id: string;
  name: string;
  /** Monthly prices in dollars. `null` on both shows "Custom". */
  monthly: number | null;
  annual: number | null;
  description: string;
  /** The short list on the plan card. */
  highlights: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}

/**
 * A comparison cell: `true` is included, `false` is not, and a string is
 * shown as written (a limit, a period, a support level).
 */
export type Cell = boolean | string;

export interface FeatureRow {
  name: string;
  /** A short explanation under the feature name. */
  hint?: string;
  /** One value per plan, in plan order. */
  values: Cell[];
}

export const pricing = {
  title: "Pay for *resolutions,* not seats",
  lead: "Every plan includes chat, email and voice. You pay for the conversations Spark resolves; hand-offs to your team are always free.",
  annualSaving: "−20%",
  plans: [
    {
      id: "starter",
      name: "Starter",
      monthly: 390,
      annual: 310,
      description: "One agent on one brand, for teams proving the case.",
      highlights: [
        "1,500 resolutions a month",
        "Chat, email and voice",
        "10 playbooks",
        "Weekly quality report",
      ],
      cta: { label: "Start free trial", href: "/contact/?topic=pricing" },
    },
    {
      id: "growth",
      name: "Growth",
      monthly: 1490,
      annual: 1190,
      description: "Several agents, every conversation scored, and SSO.",
      highlights: [
        "8,000 resolutions a month",
        "Unlimited playbooks",
        "Quality scores on every conversation",
        "SSO and role-based access",
      ],
      cta: { label: "Get a demo", href: "/contact/?topic=demo" },
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthly: null,
      annual: null,
      description: "Private deployment, custom terms and a named engineer.",
      highlights: [
        "Volume pricing",
        "Private cloud deployment",
        "Data residency of your choice",
        "99.95% uptime SLA",
      ],
      cta: { label: "Talk to sales", href: "/contact/?topic=pricing" },
    },
  ] as Plan[],

  /** Short reassurances under the plan cards. */
  notes: ["14-day free trial on every plan", "No setup fees", "Cancel any time"],

  compareTitle: "Compare every plan",
  groups: [
    {
      name: "Usage",
      rows: [
        {
          name: "Resolved conversations",
          hint: "Per month, all channels",
          values: ["1,500", "8,000", "Custom"],
        },
        { name: "Agents", values: ["1", "5", "Unlimited"] },
        { name: "Brands", values: ["1", "3", "Unlimited"] },
        { name: "Languages", values: ["45", "45", "45"] },
        { name: "Hand-offs to your team", hint: "Never billed", values: ["Free", "Free", "Free"] },
      ],
    },
    {
      name: "Channels",
      rows: [
        { name: "Web and in-app chat", values: [true, true, true] },
        { name: "Email", values: [true, true, true] },
        { name: "Voice", values: [true, true, true] },
        { name: "WhatsApp and SMS", values: [false, true, true] },
        { name: "Custom channels via API", values: [false, false, true] },
      ],
    },
    {
      name: "Playbooks and actions",
      rows: [
        {
          name: "Knowledge sync",
          hint: "Help centre, macros, past tickets",
          values: [true, true, true],
        },
        { name: "Playbooks", values: ["10", "Unlimited", "Unlimited"] },
        {
          name: "Actions in your systems",
          values: ["5 connectors", "All connectors", "All, plus custom"],
        },
        { name: "Simulation on past tickets", values: [false, true, true] },
        { name: "Bring your own model", values: [false, false, true] },
      ],
    },
    {
      name: "Quality",
      rows: [
        {
          name: "Quality scoring",
          values: ["Weekly sample", "Every conversation", "Every conversation"],
        },
        { name: "Custom scorecards", values: ["1", "5", "Unlimited"] },
        { name: "Suggested improvements", values: [false, true, true] },
        { name: "Conversation history", values: ["30 days", "1 year", "Custom"] },
      ],
    },
    {
      name: "Security and admin",
      rows: [
        { name: "PII redaction", values: [true, true, true] },
        { name: "Single sign-on", hint: "SAML and OIDC", values: [false, true, true] },
        { name: "SCIM provisioning", values: [false, false, true] },
        { name: "Audit log export", values: [false, true, true] },
        { name: "Data residency", values: ["EU or US", "EU, US or UK", "Any region"] },
        { name: "Private deployment", values: [false, false, true] },
      ],
    },
    {
      name: "Support",
      rows: [
        { name: "Support", values: ["Email", "Priority chat", "Named engineer"] },
        { name: "Onboarding", values: ["Self-serve", "Guided launch", "Dedicated team"] },
        { name: "Uptime SLA", values: [false, "99.9%", "99.95%"] },
      ],
    },
  ] as { name: string; rows: FeatureRow[] }[],

  faq: {
    title: "Questions about *pricing*",
    items: [
      {
        q: "What counts as a resolved conversation?",
        a: "One where the customer's issue was closed without a hand-off and they did not come back about the same issue within 72 hours. Hand-offs are never billed.",
      },
      {
        q: "What happens if we go over our plan?",
        a: "Nothing breaks. Extra resolutions are billed at your plan's rate at the end of the month, and we will suggest a move to the next plan if it would cost you less.",
      },
      {
        q: "Can we change plans later?",
        a: "Yes, at any time. Upgrades apply straight away and are prorated; downgrades take effect at the next billing date.",
      },
      {
        q: "How does annual billing work?",
        a: "You pay for twelve months up front at a 20% discount, with the same monthly resolution allowance. Unused resolutions do not roll over.",
      },
      {
        q: "Is there a free trial?",
        a: "Every plan starts with a 14-day trial on your own tickets, with simulation included, so you can see the resolution rate before you pay anything.",
      },
    ],
  },
};
