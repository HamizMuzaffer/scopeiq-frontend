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
  title: "ScopeIQ | AI Based Project Visualization and Scoping Tool",
  description: "Operational intelligence, smart scoping, and real-time visualization built in the high-fidelity Obsidian Cyber design system.",
  icons: {
    icon: "/logo.png",
  }, 
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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
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
