import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { HomeDock } from "./_components/HomeDock";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const url = "https://anuraag.site";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Anuraag Tripathy",
  description: "A portfolio of Anuraag Tripathy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#ebebec]`} id="style-4">
        <Toaster />
        <HomeDock />
        {children}
      </body>
    </html>
  );
}