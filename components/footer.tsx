import { cn } from "@/lib/utils";
import Image from "next/image";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}
let footerYear = "";
fetch("https://getfullyear.com/api/year")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.sponsored_by);
    footerYear = data.year;
  });

const Footer = ({
  className,
  copyright = `©${footerYear} Skunktank69. All rights reserved.`,
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: FooterProps) => {
  return (
    <section className={cn("px-0 w-full", className)}>
      <div className="container">
        <footer>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center  min-w-screen px-20">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
