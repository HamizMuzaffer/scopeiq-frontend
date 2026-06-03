"use client"
import { motion } from "framer-motion";

export default function Card({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`iq-glass rounded-2xl p-6 md:p-8 relative ${className}`}
    >
      {children}
    </motion.div>
  );
}