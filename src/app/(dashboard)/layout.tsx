"use client";

import { ProtectedRoute } from "@/modules/auth/context/AuthContext";
import { DashboardShell } from "@/components/shared/layout/DashboardShell";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardShell>{children}</DashboardShell>
    </ProtectedRoute>
  );
}
