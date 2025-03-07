import { ShinyButton } from "@/components/ui/shinnybutton";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function IntroCard() {
  return (
    <div className="relative col-span-6 flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-xl lg:col-span-4 xl:flex-row">
      <div className="relative h-full min-h-[300px] w-full flex-[2]">
        <Image
          src="/me.jpeg"
          alt="Anuraag Tripathy"
          priority
          fill
          className="aspect-square rounded-xl object-cover object-[center_50%] xl:object-[center_80%]"
        />
      </div>

      <div className="order-2 col-span-1 lg:order-1 lg:col-span-3">
        <h2 className="text-lg font-medium text-muted-foreground">
          Hey There! My name is
        </h2>
        <h1 className="bg-gradient-to-b from-rose-400 to-red-600 bg-clip-text pb-1 text-4xl font-black text-transparent lg:text-5xl">
          Anuraag Tripathy
        </h1>
        <p className="mt-2 max-w-lg text-muted-foreground">
          I&apos;m a software engineer, with a passion for building impactful products using the latest technologies. 
          Mainly a fullstack developer, I have been lately exploring ML and Data Science both inside and outside my University.
          I&apos;m most proficient at Python, React.js and Next.js. 
        </p>
        <Link href="/projects">
          <ShinyButton className="mt-4 flex items-center">
            View Projects <ArrowRightIcon className="size-4" />
          </ShinyButton>
        </Link>
      </div>
    </div>
  );
}
