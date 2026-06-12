"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { FAQS } from "./constants";



export function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    return (
        <div className="iq-container max-w-7xl! mx-auto! py-24 grid grid-cols-1 lg:grid-cols-10 gap-12">
            <div className="lg:col-span-6">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4 leading-tight">
                    Connect with Intelligence.
                </motion.h1>
                <p className="text-body-lg text-[var(--on-surface-variant)] max-w-xl mb-12">
                    Have questions about AI-driven governance? Our team of experts is ready to help you scale your compliance infrastructure.
                </p>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex lg:flex-rowflex-col gap-4">
                        <Field label="Full Name" placeholder="John Doe" />
                        <Field label="Business Email" placeholder="john@enterprise.ai" type="email" />
                    </div>
                    <Field label="Organization" placeholder="Acme Corp" />

                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-[13px] text-[var(--on-surface-variant)] ml-1">Project Scope</label>
                        <textarea rows={5}
                            className="w-full bg-[var(--surface-container-lowest)] border border-[var(--line)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                            placeholder="Tell us about your governance challenges..." />
                    </div>
                    <button type="submit" className="hover:cursor-pointer bg-[var(--primary)] text-[var(--on-primary)] px-12 py-4 rounded-xl text-headline-md font-semibold hover:brightness-110 transition-all active:scale-95 iq-glow">
                        Send Message
                    </button>
                </form>
            </div>
            <aside className="lg:col-span-4 space-y-8">
                <div className="iq-glass rounded-2xl p-6 iq-glow">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                            <MaterialIcon name="smart_toy" className="text-[var(--primary)]" />
                        </div>
                        <div>
                            <p className="font-mono text-[13px]">Scope Assistant</p>
                            <p className="text-[10px] text-[var(--primary)] flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-1 animate-pulse" /> Active Now
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4 mb-4">
                        <div className="bg-[var(--surface-container)] border-l-2 border-[var(--primary)] p-4 rounded-xl rounded-tl-none max-w-[85%] text-[13px]">
                            Hello! I'm the ScopeIQ AI. How can I assist with your project intelligence needs today?
                        </div>
                        <div className="bg-[var(--surface-container-high)] p-4 rounded-xl rounded-tr-none ml-auto max-w-[80%] text-[13px] text-[var(--on-surface-variant)]">
                            I'd like to learn more about automated audit trails.
                        </div>
                    </div>
                    <div className="relative">
                        <input className="w-full bg-[var(--surface-container-lowest)] border border-[var(--line)] rounded-lg px-4 py-2 text-sm focus:outline-none" placeholder="Type a message..." />
                        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--primary)]">
                            <MaterialIcon name="send" />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-headline-md font-semibold mb-6">Common Questions</h3>
                    {FAQS.map((f, i) => (
                        <div key={f.q} className="border-b border-[var(--line)] pb-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                            <div className="flex justify-between items-center mb-2">
                                <p className={openFaq === i ? "text-[var(--primary)]" : ""}>{f.q}</p>
                                <MaterialIcon name="add" className={`text-[var(--primary)] transition-transform ${openFaq === i ? "rotate-45" : ""}`} />
                            </div>
                            {openFaq === i && <p className="text-[13px] text-[var(--on-surface-variant)]">{f.a}</p>}
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
    return (
        <div className="space-y-2">
            <label className="font-mono text-[13px] text-[var(--on-surface-variant)] ml-1">{label}</label>
            <input type={type} placeholder={placeholder}
                className="w-full bg-[var(--surface-container-lowest)] border border-[var(--line)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all" />
        </div>
    );
}
