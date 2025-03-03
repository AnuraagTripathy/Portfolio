"use client";
import Link from "next/link";
import React from "react";
import GitHubCalendar from "react-github-calendar";

export default function GithubActivityCalendar() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-fit min-h-72 max-w-full overflow-x-auto rounded-2xl lg:h-full lg:min-h-0">
      <div className="flex h-full w-full min-w-0 flex-col gap-4 overflow-hidden rounded-2xl bg-white px-8 py-6 shadow-xl md:px-10">
        <span className="mb-2 flex flex-col md:flex-row md:items-center md:gap-3">
          <h2 className="bg-gradient-to-b from-emerald-400 to-green-900 bg-clip-text pb-1 text-xl font-black text-transparent md:text-3xl lg:text-4xl">
            Github Activity Calendar
          </h2>
          <Link
            href={"https://github.com/AnuraagTripathy"}
            target="_blank"
            className="text-sm font-light text-muted-foreground"
          >
            @AnuraagTripathy
          </Link>
        </span>

        <GitHubCalendar username="AnuraagTripathy" colorScheme="light" />
      </div>
    </div>
  );
}
