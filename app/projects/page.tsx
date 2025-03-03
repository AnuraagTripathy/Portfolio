import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    name: "Ecosphere",
    duration: "July 2024",
    description:
      "Created an advanced inventory management tool that helps businesses track inventory with high accuracy using image recognition. The tool provides detailed insights into carbon emissions, highlighting top contributors to a company's carbon footprint. It also features a marketplace where businesses can trade products for cash or carbon credits, all through a simple and user-friendly interface.",
    techStack: [
      "LLaVA",
      "RAG2SQL",
      "Projection Layer",
      "Gemini",
      "React.js",
      "Tailwind CSS",
      "Selenium",
    ],
    links: [
      {
        name: "Website",
        href: "https://docs.google.com/presentation/d/1uR-xF0Jn6-zkjm3K6VvMd-AtJ-c82KWW4c8c1l04I6Q/edit#slide=id.p1",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/Abhyuday-Goyal/Terrapins-Planet-FWD",
        icon: <Github className="size-3" />,
      },
    ],
    image: "Ecosphere.png",
  },
  {
    name: "DocReach (Winner, Hophacks 2024)",
    duration: "September 2024",
    description:
      "Built a mobile web app to make healthcare more accessible in rural areas of lower middle-income countries. The app allows easy communication with doctors through text, audio, and images and includes an interactive disease map to help track and manage outbreaks. It also features a disease prediction tool to support doctors in making better clinical decisions.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "PyTorch",
      "Gemini",
      "MongoDB",
      "DigitalOCean",
      "Sinch",
      "Linux",
    ],
    links: [
      {
        name: "Website",
        href: "https://devpost.com/software/easydoctor",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/Loldude0/hophacksfall24",
        icon: <Github className="size-3" />,
      },
    ],
    image: "DocReach.png",
  },
  {
    name: "ResQVision (Winner, Bitcamp 2024)",
    duration: "April 2024",
    description:
      "ResQVision uses AI-driven video analysis to enhance disaster response. It helps locate survivors in real-time and quantifies debris from aerial footage, providing heatmaps for efficient rescue and recovery efforts.",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Flask",
      "Gemini",
      "MongoDB",
      "Node.js",
      "Python",
    ],
    links: [
      {
        name: "Website",
        href: "https://devpost.com/software/resqvision",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/NSP909/cmdfmydebris",
        icon: <Github className="size-3" />,
      },
    ],
    image: "ResQVision.jpg",
  },
  {
    name: "CtrlFMyVideo (Winner, Hoyahacks 2024)",
    duration: "January 2024",
    description:
      "CtrlF My Video leverages AI-powered audio recognition to quickly identify key events like gunshots and crashes in large video collections. It streamlines video analysis, making crime detection faster, easier, and more efficient.",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Flask",
      "PyTorch",
      "Kaggle",
      "MongoDB",
      "Node.js",
      "Python",
    ],
    links: [
      {
        name: "Website",
        href: "https://devpost.com/software/ctrl-f-my-audio",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/dappon4/ctrl-F-my-audio",
        icon: <Github className="size-3" />,
      },
    ],
    image: "CtrlFMyVideo.png",
  },
  
  
];

export default function Projects() {
  return (
    <main className="relative px-8 pb-32">
      <div className="pt-10">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl/none">
            My Projects
          </h1>
          <p className="mt-2 text-lg tracking-tight text-muted-foreground">
            I&apos;ve always tried to solve problems that I have seen society face.<br />
            Here are some of them.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-screen-md grid-cols-1 gap-6 sm:grid-cols-2 md:max-w-screen-lg">
          {PROJECTS.map((project: any, index: number) => (
            <DetailedProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </main>
  );
}

interface ProjectCardProps {
  name: string;
  duration: string;
  description: string;
  image: string;
  techStack: string[];
  links: { name: string; href: string; icon: any }[];
}

function DetailedProjectCard(props: ProjectCardProps) {
  return (
    <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl bg-white">
      <div className="relative h-[300px]"> 
        <Image
        src={"/projects/" + props.image}
        alt={props.name}
        fill
        className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2 className="font-bold">{props.name}</h2>
          <h4 className="py-1 text-sm">{props.duration}</h4>
          <p className="text-xs text-muted-foreground">{props.description}</p>
        </div>

        <div>
          <div className="mt-3 flex flex-wrap items-center gap-1">
            {props.techStack.map((tech: any, index: number) => (
              <Badge
                key={index}
                className="rounded-sm text-[10px]"
                variant={"secondary"}
              >
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {props.links.map((link: any, index: number) => (
              <Link href={link.href} key={index} target="_blank">
                <Badge className="flex items-center gap-2 rounded-sm py-1 text-[11px]">
                  {link.icon} {link.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
