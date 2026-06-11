import React from 'react';
import Link from 'next/link';
import { Terminal, Cpu } from 'lucide-react';
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
              </Link>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              Next-generation operational intelligence and visual project scoping for modern technical organizations.
            </p>

            {/* Social Links using clean inline SVGs */}
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/company/scopeiqq/" target='_blank' aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">Platform</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link>
              </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
                </li>
            </ul>
          </div>

          {/* Support / System Status */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">Security & Dev</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>All Systems Operational</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Terminal className="h-4 w-4" />
                <span>v1.0.0 (Stable)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ScopeIQ, Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
