"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AuthShell } from "@/components/shared/layout/AuthShell";
import { MaterialIcon } from "@/components/shared/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const fieldLabelClassName =
  "font-mono text-[13px] text-[var(--on-surface-variant)] block ml-1 uppercase tracking-widest opacity-70";

const fieldInputClassName =
  "h-auto w-full rounded border border-[var(--line)] bg-[var(--surface-container-lowest)] px-5 py-4 text-body-md shadow-none focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)]/60";

export function SignInModule() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!showPassword) {
      setShowPassword(true);
      return;
    }
  };

  return (
    <AuthShell>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-sans font-semibold">Welcome to ScopeIQ</h2>
          <p className="text-lg text-[var(--on-surface-variant)]">Enter your email to continue</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FieldGroup className="gap-6">
            <Field className="gap-2">
              <FieldLabel htmlFor="email" className={fieldLabelClassName}>
                Work Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={fieldInputClassName}
              />
            </Field>
            {showPassword && (
              <Field className="gap-2">
                <FieldLabel htmlFor="password" className={fieldLabelClassName}>
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={fieldInputClassName}
                />
              </Field>
            )}
          </FieldGroup>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="hover:cursor-pointer group h-auto w-full rounded bg-[var(--primary)] py-4 font-mono text-[13px] text-[var(--on-primary)] hover:bg-[var(--primary)] hover:brightness-110 iq-glow"
            >
              CONTINUE{" "}
              <MaterialIcon
                name="arrow_forward"
                className="text-[18px] transition-transform group-hover:translate-x-1"
              />
            </Button>
          </motion.div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--line)]" /></div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
            <span className="bg-[var(--surface)] px-4 text-[var(--on-surface-variant)]/60">or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button type="button" className="hover:cursor-pointer flex items-center justify-center gap-3 bg-[var(--surface-container-lowest)] border border-[var(--line)] py-3 rounded hover:bg-[var(--surface-container-low)] transition-colors">
            <MaterialIcon name="g_translate" className="text-[18px]" /> <span className="font-mono text-[12px] uppercase">Google</span>
          </button>

        </div>
      </motion.div>
    </AuthShell>
  );
}
