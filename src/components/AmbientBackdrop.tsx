export function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas transition-colors duration-300"
    >
      <div className="absolute -left-[20%] -top-[30%] h-[70vmin] w-[70vmin] animate-float rounded-full bg-pastel-lilac/70 blur-[100px] dark:bg-pastel-lilac/25" />
      <div className="absolute -right-[15%] top-[10%] h-[55vmin] w-[55vmin] animate-float-delayed rounded-full bg-pastel-sky/60 blur-[90px] dark:bg-pastel-sky/20" />
      <div className="absolute bottom-[-20%] left-[20%] h-[50vmin] w-[50vmin] rounded-full bg-pastel-mint/50 blur-[100px] dark:bg-pastel-mint/15" />
      <div className="absolute bottom-[5%] right-[5%] h-[35vmin] w-[35vmin] rounded-full bg-pastel-peach/45 blur-[80px] dark:bg-pastel-peach/15" />
      <div
        className="absolute inset-0 opacity-[0.5] dark:opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(45,42,51,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 0%, black 15%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 0%, black 15%, transparent 72%)",
        }}
      />
    </div>
  );
}
