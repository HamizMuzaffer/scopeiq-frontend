import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { StoreProvider } from "@/store/StoreProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScopeIQ | Enterprise Project Visualizer",
  description: "Operational intelligence, smart scoping, and real-time visualization built in the high-fidelity Obsidian Cyber design system.",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground cyber-dot-grid">
        <StoreProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex flex-col flex-1 relative z-10">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" theme="dark" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
