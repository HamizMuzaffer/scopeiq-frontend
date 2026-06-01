import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { StoreProvider } from "@/store/StoreProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
