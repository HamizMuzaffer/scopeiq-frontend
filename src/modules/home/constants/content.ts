export const LANDING_FEATURES = [
  {
    icon: "description",
    title: "Intelligent Proposals",
    body: "Auto-generate precise scope documents based on historical project data and team capacity.",
    span: 1,
  },
  {
    icon: "analytics",
    title: "Deep Scope Analysis",
    body: "AI scans PRs, Jira tickets, and Slack channels to detect scope expansion in real-time before it impacts the budget.",
    span: 2,
    visual: "warning" as const,
  },
  {
    icon: "security",
    title: "AI Risk Forecasting",
    body: "Probability modeling for timeline delays and resource shortages, updated with every code commit.",
    span: 2,
    visual: "ring" as const,
  },
  {
    icon: "visibility",
    title: "Client Transparency",
    body: "External dashboards that show clients exactly why timelines shift, reducing friction and difficult conversations.",
    span: 1,
  },
  {
    icon: "monitoring",
    title: "Health Monitoring",
    body: "Continuous vital signs for your projects, from team burnout to documentation coverage.",
    span: 1,
  },
  {
    icon: "architecture",
    title: "Milestone Intelligence",
    body: "Automatically validate milestone completion with AI code reviews and automated test verification.",
    span: 2,
  },
] as const;

export const GOVERNANCE_STEPS = [
  { n: "01", title: "Connect Your Stack", body: "Plug ScopeIQ into GitHub, Jira, Slack, and Figma. Our AI begins mapping the DNA of your project ecosystem instantly." },
  { n: "02", title: "Baseline Prediction", body: "ScopeIQ analyzes past velocity and requirements to create a high-fidelity 'Golden Path' for your delivery." },
  { n: "03", title: "Autonomous Vigilance", body: "Our risk engine runs in the background, flagging deviations the moment they occur and suggesting corrective actions." },
] as const;

export const LANDING_TESTIMONIALS = [
  {
    quote: "ScopeIQ has fundamentally changed how we manage complex builds. We caught a major architectural drift in week 3 that would have cost us months if it had gone unnoticed.",
    name: "Sarah Jenkins",
    role: "CTO, Nebula Systems",
    border: "primary" as const,
  },
  {
    quote: "The transparency it provides to our clients is invaluable. They no longer ask 'why' a date moved; they can see the data-backed reality in their own dashboard.",
    name: "Marcus Chen",
    role: "VP Engineering, Quantum",
    border: "secondary" as const,
  },
] as const;

export const LANDING_FAQS = [
  { q: "How does it integrate with Jira?", a: "ScopeIQ uses a bidirectional sync. It reads ticket metadata and comment sentiment to build its risk models, and can automatically flag 'At Risk' statuses in Jira when drift thresholds are crossed." },
  { q: "Is our code metadata secure?", a: "Absolutely. We use enterprise-grade encryption (AES-256) and never store your actual code. We only analyze semantic metadata and structural patterns to power our intelligence engine." },
  { q: "Can we invite our clients?", a: "Yes. ScopeIQ allows you to create read-only 'Transparency Portals' where clients can track high-level progress and risk scores without seeing internal developer conversations." },
] as const;

export const LANDING_BRANDS = ["Nebula", "Quantum", "Apex", "Flux", "Zenith"] as const;
