import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HireMeCard() {
  return (
    <Link
      href={"contact"}
      className="hireme group relative col-span-6 flex min-h-56 items-center justify-center rounded-2xl bg-white shadow-xl sm:col-span-4 md:min-h-full lg:col-span-2"
    >
      <h2 className="text-6xl font-extrabold text-white">Contact</h2>
      <ArrowRight className="absolute bottom-4 right-6 text-white transition-transform duration-500 group-hover:-rotate-45" />
    </Link>
  );
}
