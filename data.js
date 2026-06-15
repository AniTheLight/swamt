// Data sourced from the "Fashion-Tech Lab" WhatsApp chat export.
// Each entry represents a founder / company that introduced themselves in the chat.
// "links" are clickable on the back of each card. Empty arrays mean no link was shared.

const COMPANIES = [
  {
    name: "Mismatch",
    founder: "Lola",
    description: "Virtual clothing studio using digital garments to push sustainability in fashion. Founded in 2024. Lola is keen to connect and collaborate with others in the space.",
    tags: ["sustainability", "virtualfashion", "fashiontech"],
    links: [
      { label: "Instagram", url: "https://www.instagram.com/mismatchstudios?igsh=aDZ5djJicWNucTY5" }
    ]
  },
  {
    name: "Cheb",
    founder: "Salman & Farah",
    description: "London based fashion and lifestyle brand creating premium, destination inspired clothing rooted in culture, travel and storytelling. Each drop begins with a place — Bodrum, Marbella, Lebanon — and translates its colours, archives and atmosphere into wearable pieces.",
    tags: ["fashionbrand", "london", "travel"],
    links: [
      { label: "Instagram — @cheb.london", url: "https://www.instagram.com/cheb.london" },
      { label: "chebclothing.com", url: "https://chebclothing.com" }
    ]
  },
  {
    name: "ProMatchus",
    founder: "Salman",
    description: "Learning and development platform grown from a large professional LinkedIn network, with a strong interest in community led brands and the future of how people discover and buy products.",
    tags: ["learninganddevelopment", "community", "networking"],
    links: []
  },
  {
    name: "OPEN.MODE",
    founder: "Neliana Fuenmayor",
    description: "Web3 platform bringing trust, traceability and transparency to fashion — helping brands make product data traceable across the supply chain and beyond the first sale.",
    tags: ["web3", "traceability", "sustainability"],
    links: [
      { label: "openmode.io", url: "https://www.openmode.io" }
    ]
  },
  {
    name: "Name not shared yet",
    founder: "Yinnie",
    description: "Building a tool for automated condition grading of retail returns, with promising early accuracy results. Looking to talk to anyone who deals with returns at a brand, or who is building in the secondhand / resale space.",
    tags: ["resale", "returns", "ai"],
    links: []
  }
  {
    name: "WaSun",
    founder: "Samiul Hussain",
    description: "smart electrochromic glasses with touch tint adjustment",
    tags: ["fashiontech", "middleeast"],
    links: [{ label: "website", url: "https://www.wasuneyewear.co.uk" }]
  }
];
