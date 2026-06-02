import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "./components/AnalyticsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Would you go on date",
  description: "A fun interactive date invitation experience with animated surprises, confetti celebrations, date planning, and shareable invite links.",
 keywords: [
    "date invitation",
    "interactive date app",
    "fun date proposal",
    "Next.js app",
    "romantic invitation",
    "cute date website",
    "date planner",
    "viral invitation app",
  ],
  authors: [
    {
      name: "taoufikbnr",
    },
  ],

  creator: "taoufikbnr",
  publisher: "taoufikbnr",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
              <AnalyticsProvider />

      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
