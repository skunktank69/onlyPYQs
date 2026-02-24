"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Nunito } from "next/font/google";
import Image from "next/image";
import { ThemeProvider } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";
const nunito_sans = Nunito({
  variable: "--font-nunito-mono",
  subsets: ["latin"],
});

const navItems = [{ title: "About", href: "#" }];

function useScrollThreshold(threshold = 120) {
  const [past, setPast] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPast(window.scrollY >= threshold);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return past;
}

export default function NavBar() {
  const isExpanded = useScrollThreshold(140);

  return (
    <>
      <nav className="pointer-events-none fixed left-0 top-4 z-50 w-full">
        <div
          className={[
            "pointer-events-auto mx-auto flex items-center gap-3",
            "h-16 px-4 sm:px-3",
            "backdrop-blur supports-[backdrop-filter]:bg-background/70",
            "border border-border shadow-sm",
            "transition-all duration-300 ease-out",
            isExpanded
              ? "max-w-7xl w-[min(100%-1.5rem,80rem)] rounded-2xl"
              : "max-w-xl w-[min(100%-1.5rem,44rem)] rounded-full",
          ].join(" ")}
        >
          <a
            href="/"
            className="inline-flex items-center gap-0 text-xl font-bold tracking-tight"
          >
            <Image src={`/lock.svg`} width={30} height={30} alt={"lock"} />
            <div className="flex items-center gap-0">
              <p className={`text-foreground ${nunito_sans.variable}`}>Only</p>
              <p className="text-sky-500">PYQs</p>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
            {navItems.map((item) => (
              <Button key={item.title} asChild variant="ghost">
                <a href={item.href}>{item.title}</a>
              </Button>
            ))}
            <ThemeToggle />
            <div className="mx-1 h-6 w-px bg-border" />
            <Button asChild variant="ghost">
              <a href="#">Log in</a>
            </Button>
            <Button asChild>
              <a href="#">Sign up</a>
            </Button>
          </div>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild className="ml-auto lg:hidden">
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[90%] max-w-sm flex-col px-6 py-6"
            >
              <SheetTitle>
                <a
                  href="#"
                  className="inline-flex items-center gap-0 text-xl font-bold tracking-tight"
                >
                  <Image
                    src={`/lock.svg`}
                    width={30}
                    height={30}
                    alt={"lock"}
                  />
                  <div className="flex items-center gap-0">
                    <p className={`text-foreground ${nunito_sans.variable}`}>
                      Only
                    </p>
                    <p className="text-sky-500">PYQs</p>
                  </div>
                </a>
              </SheetTitle>

              <nav className="-mx-4 my-6 flex flex-1 flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.title}
                    asChild
                    className="justify-start text-base"
                    variant="ghost"
                  >
                    <a href={item.href}>{item.title}</a>
                  </Button>
                ))}
                <ThemeToggle />
              </nav>

              <div className="mt-auto grid gap-3">
                <Button variant="outline" asChild>
                  <a href="#">Log in</a>
                </Button>
                <Button asChild>
                  <a href="#">Get Started</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
