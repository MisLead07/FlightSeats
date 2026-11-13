import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlightSeats | Flight Seat Selection",
  description:
    "An interactive flight seat selection and passenger management application built with Next.js and TypeScript.",
  openGraph: {
    title: "FlightSeats | Flight Seat Selection",
    description:
      "Explore interactive aircraft seating layouts, assign passenger seats, and calculate seat selection charges.",
    type: "website",
    url: "https://flightseats.ilahym.com",
    siteName: "FlightSeats",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
