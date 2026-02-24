import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import { Footer } from "@/components/footer";

const NunitoBase = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const nunito_sans = Nunito_Sans({
  variable: "--font-nunito-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnlyPyqs",
  description:
    "a place for you to study for jee using ~15000 previous year questions for JEE MAIN and JEE ADVANCE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"
        ></script>
      </head>
      <body
        className={`${nunito_sans.variable} ${nunito_sans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="relative min-h-screen w-full overflow-hidden mt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
