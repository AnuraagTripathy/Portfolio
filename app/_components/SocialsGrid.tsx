import Image from "next/image";
import Link from "next/link";

const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/AnuraagTripathy",
    icon: "/socials/github.png",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anuraagtripathy/",
    icon: "/socials/linkedin.jpg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/anuraagx181/",
    icon: "/socials/instagram.png",
  },
  {
    name: "X",
    href: "https://x.com/Anuraagx181",
    icon: "/socials/x.jpg",
  },
];

export function SocialsGrid() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {SOCIALS.map((social) => (
        <SocialCard key={social.name} link={social.href} icon={social.icon} />
      ))}
    </div>
  );
}

function SocialCard({ link, icon }: { link: string; icon: string }) {
  return (
    <Link
      href={link}
      target="_blank"
      className="col-span-1 overflow-hidden rounded-2xl shadow-xl"
    >
      <Image
        className="size-full object-cover"
        src={icon}
        alt={icon}
        priority
        width={1080}
        height={1080}
      />
    </Link>
  );
}
