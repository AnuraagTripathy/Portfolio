export type Role = {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  /** Square company mark under /public (shown like LinkedIn role icons). */
  logoSrc: string;
};

/**
 * Newest first for the timeline UI.
 */
export const roles: Role[] = [
  {
    id: "gencise",
    title: "Fullstack and Applied AI Engineer",
    company: "GenciseAI",
    location: "Part-time, remote (Plano, TX)",
    start: "Sep 2025",
    end: "Jan 2026",
    summary:
      "Worked on the document parsing and underwriting stack for an insurtech platform.",
    logoSrc: "/images/experience/gencise.png",
    highlights: [
      "Built an autonomous LLM agent-based document parsing pipeline with template augmentation, extracting data from 500,000+ documents across 1,000+ document types.",
      "Built agentic microservices using LangGraph and Flask APIs for entity extraction, validation, and database integration.",
      "Engineered an async email processor on the Microsoft Graph API with batching and caching, storing data in AWS S3.",
      "Deployed agent workflows via Docker and Kubernetes with GitHub Actions CI/CD, monitoring performance with k9s.",
      "Built a FastAPI quote engine with external data enrichment, and shipped full-stack features in TypeScript and Python.",
    ],
  },
  {
    id: "stealth-music",
    title: "Applied ML & Automation Engineer",
    company: "Mesh",
    location: "Part-time, remote (New York, NY)",
    start: "Aug 2025",
    end: "Sep 2025",
    summary: "Music industry tooling. Finding artists before the labels do.",
    logoSrc: "/images/experience/stealth.png",
    highlights: [
      "Built autonomous agents to discover and score 10k+ TikTok videos a month, surfacing underground artists.",
      "Orchestrated agentic recommendation loops with metadata preloading and dynamic watch-time allocation, increasing relevant videos per hour by 40%.",
      "Combined multi-agent ML heuristics with domain constraints like genre and style to autonomously deliver artist shortlists 3–6 months earlier than traditional scouting.",
      "Deployed resilient agentic automation with proxy and anti-bot measures, keeping the pipelines scalable at 95%+ uptime.",
    ],
  },
  {
    id: "claryfy",
    title: "Full Stack Developer",
    company: "Claryfy",
    location: "Part-time, remote (College Park, MD)",
    start: "Jun 2025",
    end: "Aug 2025",
    summary: "A Canvas LMS assistant for students and teachers. We got real users.",
    logoSrc: "/images/experience/claryfy.png",
    highlights: [
      "Built and scaled an MVP with 20+ active users using Python, Express.js, Next.js, Supabase, and OpenAI; migrated from Firebase for faster queries and scaling.",
      "Integrated WeaviateDB RAG for course-specific Q&A and automated Canvas LMS data ingestion.",
      "Reduced API costs by 40% through token caching and response optimization.",
      "Released features based on feedback from 50+ students and teachers.",
    ],
  },
  {
    id: "umd-research",
    title: "Research Assistant",
    company: "University of Maryland",
    location: "Part-time, remote (College Park, MD)",
    start: "Apr 2025",
    end: "Jul 2025",
    summary: "Planetary science. Trying to figure out what Europa's surface is made of.",
    logoSrc: "/images/experience/umd.png",
    highlights: [
      "Worked with Professor Ludmilla Kolokolova on Europa's surface composition using reflected light data.",
      "Parallelized the R2T2 radiative transfer model on WSL and brought per-input simulation time down from hours to something workable.",
      "Cleaned and plotted the output with Seaborn and Matplotlib so the results were actually readable.",
      "Wrote a modified gradient descent loop that matches R2T2 output to Hubble observations, which gives us an approximate inverse map from reflectance back to surface composition.",
    ],
  },
  {
    id: "omse",
    title: "Math and Computer Science Tutor",
    company: "University of Maryland, Office of Multi-ethnic Student Education",
    location: "Part-time, on-site (College Park, MD)",
    start: "Sep 2024",
    end: "May 2025",
    summary: "Tutoring CS and math at UMD's OMSE.",
    logoSrc: "/images/experience/omse.png",
    highlights: [
      "Taught computer systems, algorithms, and data structures to around 10 students a week.",
      "Every student I worked with finished the semester with a better grade than they started.",
      "Got reasonably good at explaining recursion to people who had decided they hated recursion.",
    ],
  },
  {
    id: "northstar",
    title: "Full-stack Developer",
    company: "AI Northstar Tech",
    location: "Part-time, remote (College Park, MD)",
    start: "Sep 2024",
    end: "Nov 2024",
    summary: "An offline-first AI chat app that runs the model on-device.",
    logoSrc: "/images/experience/northstar.png",
    highlights: [
      "Built a web and mobile chat app that runs a fine-tuned SLM from Hugging Face locally, so it works without a network.",
      "Wrote the frontend in React Native as a chat interface with multimodal input and output.",
      "Spent a lot of time on making a small model feel responsive instead of cheap, which is a different problem than making a big model feel fast.",
    ],
  },
  {
    id: "nokia",
    title: "Intern",
    company: "Nokia",
    location: "Internship, remote (India)",
    start: "Aug 2022",
    end: "Sep 2022",
    summary: "Broadband infrastructure. My first taste of working at a very large company.",
    logoSrc: "/images/experience/nokia.png",
    highlights: [
      "Studied the broadband network architecture NBNco runs for Australia's national network.",
      "Got into the weeds on GPON, DOCSIS, and DSL, and how broadband penetration ties into national growth and sustainability goals.",
    ],
  },
];
