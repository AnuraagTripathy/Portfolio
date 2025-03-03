import { formatDate, getCurrentDay } from "@/lib/utils";

export function DateAndTimeCard() {
  return (
    <div className="col-span-2 flex h-full gap-6 rounded-2xl bg-white bg-gradient-to-tr from-pink-600/20 via-teal-900/50 to-teal-700 p-4 shadow-xl backdrop-blur-3xl">
      <div className="flex w-fit flex-[2] flex-col justify-center gap-14 rounded-2xl bg-gradient-to-tr from-rose-400/30 via-teal-900 to-teal-700 p-4 text-white">
        <h3 className="text-3xl font-semibold">{formatDate()}</h3>
        <span className="flex-grow flex flex-col ">
          <h6 className="text-sm font-extralight text-muted">
            {getCurrentDay()}
          </h6>
          <h3 className="font-medium">3 Events</h3> 
        </span>
      </div>
      <div className="flex-[3] pt-2 text-white">
        <h2 className="text-sm font-semibold uppercase text-muted">Upcoming</h2>
        <div className="mt-3 flex items-start gap-3">
          <div className="h-10 w-1 rounded-md bg-orange-600"></div>
          <div>
            <h3 className="text-sm font-semibold">Learn Spring Security</h3>
            <p className="text-sm font-light text-muted">12:30 PM - 4:30 PM</p>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-3">
          <div className="h-10 w-1 rounded-md bg-blue-500"></div>
          <div>
            <h3 className="text-sm font-semibold">Scale up Credibot</h3>
            <p className="text-sm font-light text-muted">6:00 PM - 7:00 PM</p>
          </div>
        </div>
        <div className="mt-6 flex items-start gap-3">
          <div className="h-10 w-1 rounded-md bg-teal-600"></div>
          <div>
            <h3 className="text-sm font-semibold">Solve Leetcode</h3>
            <p className="text-sm font-light text-muted">9:00 PM - 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
