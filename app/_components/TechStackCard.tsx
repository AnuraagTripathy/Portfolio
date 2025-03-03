import TechStack from "./TechStack";

export function TechStackCard() {
  return (
    <div className="relative col-span-6 overflow-hidden rounded-2xl bg-white p-4 shadow-xl lg:col-span-3">
      <div className="techstack absolute inset-0 z-[51] flex h-full w-full flex-col items-start justify-end p-8">
        <h2 className="text-lg font-bold text-white">Tech Stack</h2>
        <p className="text-sm text-zinc-100">Tools that I just love to use</p>
      </div>
      <TechStack />
    </div>
  );
}
