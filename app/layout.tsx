import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/navigationbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The tab icon comes from app/icon.png (Next.js picks it up automatically).
export const metadata: Metadata = {
  title: "Liliana Erasmus",
  description: "Children's book author Liliana Erasmus",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased `}
    >
      <body id="top" suppressHydrationWarning className="flex min-h-screen flex-col">
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}