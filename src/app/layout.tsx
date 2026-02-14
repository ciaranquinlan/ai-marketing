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
  title: "AI Marketing Skills | Frameworks AI Actually Executes",
  description: "Interactive showcase for AI marketing skills. Enter your marketing challenge, and watch AI deliver positioning, content ideas, audits, and more.",
  keywords: ["AI marketing", "agent skills", "positioning", "content strategy", "marketing automation"],
  authors: [{ name: "IntelliAgent" }],
  openGraph: {
    title: "AI Marketing Skills",
    description: "Marketing frameworks that AI actually executes. Try positioning, content ideas, homepage audits, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Skills",
    description: "Marketing frameworks that AI actually executes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
