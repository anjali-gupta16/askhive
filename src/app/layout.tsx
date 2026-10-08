import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StarfieldBackground from "@/components/shared/starfield-background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AskHive — Developer Q&A Platform & AI Assistant",
  description:
    "AskHive is a high-performance community Q&A platform for developers featuring nested discussion threads, reputation engine, and AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background text-on-surface font-sans antialiased`}
      >
        {/* Animated galaxy/starfield background */}
        <StarfieldBackground />
        {children}
      </body>
    </html>
  );
}
