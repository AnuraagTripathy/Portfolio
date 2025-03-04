import { formatDate, getCurrentDay } from "@/lib/utils";

export function DateAndTimeCard() {
  return (
    <div className="col-span-2 flex flex-col md:flex-row h-full gap-6 rounded-2xl bg-white bg-gradient-to-tr from-pink-600/20 via-teal-900/50 to-teal-700 p-4 shadow-xl backdrop-blur-3xl">
      <div className="flex w-full md:w-fit md:flex-[2] flex-col justify-center gap-6 md:gap-14 rounded-2xl bg-gradient-to-tr from-rose-400/30 via-teal-900 to-teal-700 p-4 text-white">
        <h3 className="text-2xl md:text-3xl font-semibold text-center md:text-left">
          {formatDate()}
        </h3>
        <span className="flex-grow flex flex-col text-center md:text-left">
          <h6 className="text-sm font-extralight text-muted">
            {getCurrentDay()}
          </h6>
          <h3 className="font-medium">3 Events</h3> 
        </span>
      </div>
      <div className="flex-grow pt-2 text-white mt-4 md:mt-0">
        <h2 className="text-sm font-semibold uppercase text-muted">Upcoming</h2>
        <div className="space-y-3">
          {[
            { 
              color: "bg-orange-600", 
              title: "Learn Spring Security", 
              time: "12:30 PM - 4:30 PM" 
            },
            { 
              color: "bg-blue-500", 
              title: "Scale up Credibot", 
              time: "6:00 PM - 7:00 PM" 
            },
            { 
              color: "bg-teal-600", 
              title: "Solve Leetcode", 
              time: "9:00 PM - 11:00 PM" 
            }
          ].map((event, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`h-10 w-1 rounded-md ${event.color}`}></div>
              <div>
                <h3 className="text-sm font-semibold">{event.title}</h3>
                <p className="text-sm font-light text-muted">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DateAndTimeCard;