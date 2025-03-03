import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  GithubIcon,
  HomeIcon,
  LinkedinIcon,
  MailIcon,
  RocketIcon,
  SendIcon,
  SquareUserRound,
} from "lucide-react";

interface DockItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const dockItems = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Github",
    href: "https://github.com/AnuraagTripathy",
    icon: <GithubIcon />,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/anuraagtripathy/",
    icon: <LinkedinIcon />,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <RocketIcon />,
  },
  {
    name: "Resume",
    href: "https://drive.google.com/file/d/1razlqVitBY68YNagmaPEbZAE8S0houoq/view?usp=sharing",
    icon: <SquareUserRound />,
  },
  {
    name: "Contact",
    href: "/contact",

    icon: <SendIcon />,
  },
  {
    name: "Email",
    href: "mailto:anuraagstudy@gmail.com",
    icon: <MailIcon />,
  },
];

export function HomeDock() {
  return (
    <div className="fixed bottom-10 left-1/2 z-[101] -translate-x-1/2">
      <Dock
        magnification={60}
        distance={180}
        className="scale-100 border-black/20 bg-white"
      >
        {dockItems.map((item: DockItem) => (
          <DockIcon
            key={item.name}
            href={item.href}
            tooltip={item.name}
            className="cursor-pointer"
          >
            {item.icon}
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
