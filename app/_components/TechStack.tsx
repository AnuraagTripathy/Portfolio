import React from "react";

const tools = [
  {
    tooltip: "Next.js",
    icon: "nextjs.svg",
  },
  {
    tooltip: "React",
    icon: "react.svg",
  },
  {
    tooltip: "TypeScript",
    icon: "typescript.svg",
  },
  {
    tooltip: "Node.js",
    icon: "nodejs.svg",
  },
  {
    tooltip: "Express",
    icon: "express.svg",
  },
  {
    tooltip: "MongoDB",
    icon: "mongodb.svg",
  },
  {
    tooltip: "Docker",
    icon: "docker.svg",
  },
  {
    tooltip: "GitHub",
    icon: "github.svg",
  },
  {
    tooltip: "C++",
    icon: "cplusplus.svg",
  },
  {
    tooltip: "JavaScript",
    icon: "javascript.svg",
  },
  {
    tooltip: "Drizzle",
    icon: "drizzle.svg",
  },
  {
    tooltip: "Prisma",
    icon: "prisma.svg",
  },
  {
    tooltip: "JWT",
    icon: "jwt.svg",
  },
  {
    tooltip: "Supabase",
    icon: "supabase.svg",
  },
  {
    tooltip: "Tailwind",
    icon: "tailwind.svg",
  },
  {
    tooltip: "Vercel",
    icon: "vercel.svg",
  },
  {
    tooltip: "PostgreSQL",
    icon: "postgresql.svg",
  },
  {
    tooltip: "Postman",
    icon: "postman.svg",
  },
  {
    tooltip: "VS Code",
    icon: "vscode.svg",
  },
  {
    tooltip: "Git",
    icon: "git.svg",
  },
  {
    tooltip: "Redis",
    icon: "redis.svg",
  },
  {
    tooltip: "Kafka",
    icon: "kafka.svg",
  },
  {
    tooltip: "Go",
    icon: "go.svg",
  },
  {
    tooltip: "Spring Boot",
    icon: "spring-boot.svg",
  },
  {
    tooltip: "Java",
    icon: "java.svg",
  },
  {
    tooltip: "hono",
    icon: "hono.svg",
  },
  {
    tooltip: "redux toolkit",
    icon: "redux.svg",
  },
  {
    tooltip: "react query",
    icon: "react-query.svg",
  },
];

import Image from "next/image";
import Marquee from "@/components/ui/marquee";

const firstRow = tools.slice(0, tools.length / 2);
const secondRow = tools.slice(tools.length / 2);

export default function TechStack() {
  return (
    <div>
      <div className="relative flex h-full flex-col items-center justify-center gap-3 py-3">
        <Marquee pauseOnHover className="[--duration:50s]">
          {firstRow.map((review) => (
            <Image
              key={review.tooltip}
              src={`/tech-icons/${review.icon}`}
              alt={review.tooltip}
              width={60}
              height={60}
              className="relative z-[1] size-[55px]"
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:50s]">
          {secondRow.map((review) => (
            <Image
              key={review.tooltip}
              src={`/tech-icons/${review.icon}`}
              alt={review.tooltip}
              width={60}
              height={60}
              className="size-[55px]"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
