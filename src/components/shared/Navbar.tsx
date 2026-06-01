'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, Terminal, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            {/* Logo / Branding */}
            <div className="flex items-center gap-2 hover:cursor-pointer">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-medium tracking-wide transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBorder"
                        className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Actions / Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-secondary/40 hover:text-primary transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="h-5 w-5 transition-transform hover:-rotate-12" />
              )}
            </button>

            <Button variant="ghost" size="lg">
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>

            <Link
              href="/how-it-works"
              className="relative inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 neon-glow transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle & Theme */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border/40 mt-4 px-3 space-y-2">
                <Button variant="ghost" size="lg" className="w-full">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </Button>
                <Link
                  href="/how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground neon-glow"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
