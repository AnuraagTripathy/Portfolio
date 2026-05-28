export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  period: string;
  subtitle?: string;
  description: string;
  image: string;
  tech: string[];
  links: ProjectLink[];
};

export const featuredProject: Project = {
  name: "Faultline",
  period: "2025 – 2026 · MOST RECENT",
  subtitle: "ML training continuity & crash-to-resume",
  description:
    "Faultline is a full-stack platform for ML engineers who lose GPU time to crashes and preemptions. I built the hosted product: Python SDK on PyPI (faultline-sdk), FastAPI cloud API, Next.js dashboard, Postgres + object storage, deployed on Vercel + Render + Neon + Cloudflare R2—with OAuth, API keys, recovery UI, and landing-page demo videos. The same repo includes a Rust persistence runtime (async checkpoint queue, gRPC, storage abstractions) wired to the Python SDK for local training and benchmarks. Users on Colab/GPU VMs use the cloud path; Rust powers the systems layer underneath.",
  image: "/projects/Faultline.png",
  tech: [
    "Rust",
    "Python",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "gRPC",
    "SQLAlchemy",
    "Alembic",
    "Cloudflare R2",
    "Docker",
    "PyTorch",
    "OAuth",
    "REST",
    "Vercel",
    "Render",
    "PyPI",
  ],
  links: [
    { label: "Live", href: "https://faultline-eight.vercel.app" },
    { label: "GitHub", href: "https://github.com/AnuraagTripathy/faultline" },
    { label: "PyPI", href: "https://pypi.org/project/faultline-sdk/" },
  ],
};

export const projects: Project[] = [
  {
    name: "Ecosphere",
    period: "July 2024",
    description:
      "Inventory tooling with image recognition, carbon insights, and a marketplace for trading products for cash or carbon credits.",
    image: "/projects/Ecosphere.png",
    tech: [
      "LLaVA",
      "RAG2SQL",
      "Projection Layer",
      "Gemini",
      "React",
      "Tailwind",
      "Selenium",
    ],
    links: [
      {
        label: "Deck",
        href: "https://docs.google.com/presentation/d/1uR-xF0Jn6-zkjm3K6VvMd-AtJ-c82KWW4c8c1l04I6Q/edit#slide=id.p1",
      },
      {
        label: "GitHub",
        href: "https://github.com/Abhyuday-Goyal/Terrapins-Planet-FWD",
      },
    ],
  },
  {
    name: "DocReach",
    period: "September 2024 · Hophacks winner",
    description:
      "Mobile web app improving rural healthcare access with multimodal doctor communication and an outbreak-aware disease map.",
    image: "/projects/DocReach.png",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "PyTorch",
      "Gemini",
      "MongoDB",
      "DigitalOcean",
      "Sinch",
    ],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/easydoctor" },
      { label: "GitHub", href: "https://github.com/Loldude0/hophacksfall24" },
    ],
  },
  {
    name: "ResQVision",
    period: "April 2024 · Bitcamp winner",
    description:
      "AI video analysis for disaster response: survivor cues, debris quantification, and heatmaps from aerial footage.",
    image: "/projects/ResQVision.jpg",
    tech: ["React", "Tailwind", "Flask", "Gemini", "MongoDB", "Node", "Python"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/resqvision" },
      { label: "GitHub", href: "https://github.com/NSP909/cmdfmydebris" },
    ],
  },
  {
    name: "CtrlFMyVideo",
    period: "January 2024 · Hoyahacks winner",
    description:
      "Audio-driven search across large video libraries to surface incidents like collisions and gunshots for faster review.",
    image: "/projects/CtrlFMyVideo.png",
    tech: ["React", "Tailwind", "Flask", "PyTorch", "Kaggle", "MongoDB", "Node"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/ctrl-f-my-audio" },
      { label: "GitHub", href: "https://github.com/dappon4/ctrl-F-my-audio" },
    ],
  },
];
