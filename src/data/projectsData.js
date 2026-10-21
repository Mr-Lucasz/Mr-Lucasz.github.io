const projectsMeta = [
  {
    id: "rca-agent-lab",
    badge: "opensource",
    rarity: "uncommon",
    tags: ["Python", "Node.js", "AI Agent Orchestration", "Plotly"],
    codeUrl: "https://github.com/Mr-Lucasz/rca-agent-lab",
  },
  {
    id: "mcp-zephyr",
    badge: "internal",
    rarity: "common",
    tags: ["Node.js", "Model Context Protocol", "Zephyr Scale", "Jira", "Confluence"],
  },
  {
    id: "holyhub",
    badge: "own",
    rarity: "legendary",
    tags: ["TypeScript", "Module Federation", "Docker", "Microservices"],
  },
  {
    id: "calcmed-qa",
    badge: "nda",
    rarity: "rare",
    tags: ["BDD", "Gherkin", "Test Strategy", "Traceability Matrix"],
  },
  {
    id: "lead-automation",
    badge: "nda",
    rarity: "rare",
    tags: ["Next.js", "Supabase", "Z-API", "Meta Graph API"],
  },
  {
    id: "vistorias",
    badge: "nda",
    rarity: "rare",
    tags: ["Next.js", "Radix UI", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "e2e-workshop",
    badge: "opensource",
    rarity: "uncommon",
    tags: ["Cypress", "Cucumber", "CI/CD", "Mentoring"],
    codeUrl: "https://github.com/Mr-Lucasz/e2e-workshop",
  },
];

export function getProjectsData(t) {
  const list = t("projects_list", { returnObjects: true });
  return projectsMeta.map((meta, idx) => ({
    ...meta,
    ...list[idx],
    badgeLabel: t(`projects_badge_${meta.badge}`),
  }));
}
