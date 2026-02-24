import SelectSubject from "@/components/main-page";

export default function Home() {
  return (
    <div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_25%,rgba(56,189,248,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_70%,rgba(255,255,255,0.05),transparent_65%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-4 pt-24 sm:px-6 sm:pt-28">
        <h1 className="mt-6 text-center font-bold tracking-tight text-foreground">
          <span className="block text-7xl leading-[1.05] sm:inline sm:text-6xl lg:text-7xl mt-25 md:mt-50">
            Welcome to Only
          </span>
          <span className="block text-7xl leading-[1.05] text-sky-500 sm:ml-3 sm:inline sm:text-6xl lg:text-7xl">
            Pyqs
          </span>
        </h1>

        {/* Subtitle */}
        <h2 className="mt-5 max-w-3xl text-center font-bold tracking-tight text-sky-300 text-5xl leading-snug sm:text-3xl lg:text-6xl mb-10">
          The One Stop Solution For All Your PYQ needs.
        </h2>

        <div className="mt-8 w-full sm:mt-10">
          <SelectSubject />
        </div>
      </div>
    </div>
  );
}
