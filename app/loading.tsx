import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed z-[201] flex h-[100dvh] w-full items-center justify-center bg-background">
      <Loader2Icon className="size-8 animate-spin" />
    </div>
  );
}
