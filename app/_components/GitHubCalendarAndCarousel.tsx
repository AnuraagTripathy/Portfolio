import { HireMeCard } from "./HireMeCard";
import GithubActivityCalendar from "./GithubActivityCalendar";

export function GitHubCalendarAndCarousel() {
  return (
    <div className="col-span-6 grid grid-cols-1 lg:grid-cols-7 gap-6 h-full">
      <div className="lg:col-span-2 h-full">
        <HireMeCard/>
      </div>
      <div className="lg:col-span-5 bg-white rounded-2xl shadow-xl h-full">
        <GithubActivityCalendar />
      </div>
    </div>
  );
} 