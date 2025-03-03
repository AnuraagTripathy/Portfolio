import Image from "next/image";

export function LocationCard() {
  return (
    <div className="relative min-h-72 w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-xl lg:h-full lg:min-h-0">
      <Image
        src={"/location.png"}
        alt="location"
        fill
        priority
        className="size-full object-cover"
      />
    </div>
  );
}
