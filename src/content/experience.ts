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
    title: "ML / Fullstack Engineer",
    company: "Gencise AI",
    location: "Part-time, remote (Plano, TX)",
    start: "Sep 2025",
    end: "Jan 2026",
    summary:
      "Worked on the document parsing and underwriting stack for an insurtech platform.",
    logoSrc: "/images/experience/gencise.png",
    highlights: [
      "Built a document parsing pipeline that mixes LLM extraction with template-based augmentation, which pushed production F1 up on the messier document types.",
      "Wrote an async email processor on top of the Microsoft Graph API with batching and caching, and landed the parsed output in S3 (boto3) and Postgres.",
      "Put together a set of microservices in LangGraph and Flask for entity extraction, validation, and writing to the database.",
      "Shipped the whole thing with Docker, Kubernetes, and GitHub Actions, and watched it in k9s when things went sideways.",
      "Also shipped full-stack features in TypeScript and Python for the underwriting workflow, and wrote tests and reviewed PRs in a normal Agile cadence.",
    ],
  },
  {
    id: "stealth-music",
    title: "ML & Automation Engineer",
    company: "Stealth Startup",
    location: "Part-time, remote (New York, NY)",
    start: "Aug 2025",
    end: "Sep 2025",
    summary: "Music industry tooling. Finding artists before the labels do.",
    logoSrc: "/images/experience/stealth.png",
    highlights: [
      'Built a TikTok discovery pipeline that processes around 10k videos a month and scores them for "who is this person and are they about to blow up."',
      "Tuned the recommendation loop by preloading metadata and allocating watch time dynamically, which cut noise and bumped relevant videos per hour by roughly 40%.",
      "Mixed ML scoring with genre and style constraints so the shortlist handed to labels was actually actionable, three to six months earlier than traditional scouting usually catches.",
      "Kept the scrapers alive with proxy rotation and anti-bot handling at 95%+ uptime, which matters a lot more than it sounds.",
    ],
  },
  {
    id: "claryfy",
    title: "Full Stack Engineer",
    company: "Claryfy",
    location: "Part-time, remote (College Park, MD)",
    start: "Jul 2025",
    end: "Aug 2025",
    summary: "A Canvas LMS assistant for students and teachers. We got real users.",
    logoSrc: "/images/experience/claryfy.png",
    highlights: [
      "Built and shipped the MVP to 20+ active users using Python, Express, Next.js, Supabase, and OpenAI. Migrated off Firebase early because the query patterns weren't going to scale.",
      "Added semantic search and RAG with WeaviateDB for course-specific Q&A, so answers were grounded in the actual syllabus and readings instead of generic model output.",
      "Pulled Canvas LMS data with a few concurrent workers so the assistant stayed fresh without hammering the API.",
      "Cut API costs by about 40% with token caching and response shaping.",
      "Kept releasing against feedback from 50+ students and teachers until the thing felt useful.",
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
