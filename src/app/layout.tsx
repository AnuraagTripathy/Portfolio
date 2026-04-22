import type { Metadata } from "next";
import { Caveat, DM_Sans, Syne } from "next/font/google";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-quirk",
  display: "swap",
});

const site = "https://anuraag.site";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Anuraag Tripathy",
    template: "%s · Anuraag Tripathy",
  },
  description: "Anuraag Tripathy. CS and Math at UMD. Projects, work, and contact.",
  openGraph: {
    title: "Anuraag Tripathy",
    description: "Anuraag Tripathy. CS and Math at UMD. Projects, work, and contact.",
    url: site,
    siteName: "Anuraag Tripathy",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dm.variable} ${syne.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <AmbientBackdrop />
          <div className="grain" />
          <div className="wash" />
          <Nav />
          <div className="pt-14">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
