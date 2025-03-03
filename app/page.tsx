import { AgeCard } from "./_components/AgeCard";
import { DateAndTimeCard } from "./_components/DateAndTimeCard";
import { GitHubCalendarAndCarousel } from "./_components/GitHubCalendarAndCarousel";
import { HireMeCard } from "./_components/HireMeCard";
import { IntroCard } from "./_components/IntroCard";
import { LocationCard } from "./_components/LocationCard";
import { SocialsGrid } from "./_components/SocialsGrid";
import { TechStackCard } from "./_components/TechStackCard";

export default function Home() {
  return (
    <main className="px-4 pb-28 md:px-8">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-6 gap-6 pt-14">
        <IntroCard />
        <div className="col-span-6 flex h-full flex-col gap-6 lg:col-span-2">
          <LocationCard />
          <SocialsGrid />
        </div>
        <GitHubCalendarAndCarousel />
        <TechStackCard />
        <AgeCard />
        <DateAndTimeCard />
      </div>
    </main>
  );
}
