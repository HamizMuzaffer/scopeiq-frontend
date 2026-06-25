"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/modules/auth/context/AuthContext";
import { USER_ROLES } from "@/modules/auth/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  GitFork,
  FolderKanban,
  History,
  Settings,
  LogOut,
  User,
  Clock,
  FileCheck,
  Bell,
  Search,
  ChevronUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out.");
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  const pmNavItems = [
    {
      title: "Dashboard",
      url: "/pm-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Scoping Pipelines",
      url: "#",
      icon: GitFork,
      disabled: true,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderKanban,
      disabled: true,
    },
    {
      title: "Audit Trail",
      url: "#",
      icon: History,
      disabled: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      disabled: true,
    },
  ];

  const clientNavItems = [
    {
      title: "Dashboard",
      url: "/client-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Pending Approvals",
      url: "#",
      icon: FileCheck,
      disabled: true,
    },
    {
      title: "Timeline Tracker",
      url: "#",
      icon: Clock,
      disabled: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      disabled: true,
    },
  ];

  const navItems = user?.role === USER_ROLES.PROJECT_MANAGER ? pmNavItems : clientNavItems;
  const roleLabel =
    user?.role === USER_ROLES.PROJECT_MANAGER
      ? "Project Manager"
      : user?.role === USER_ROLES.CLIENT
      ? "Client Account"
      : "Administrator";

  const handleDisabledClick = (title: string) => {
    toast.info(`${title} module is currently in staging/design phase.`);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Sidebar Container */}
        <Sidebar className="border-r border-[var(--line)] bg-[var(--surface-container-lowest)]">
          <SidebarHeader className="border-b border-[var(--line)] py-4 px-6 flex flex-row items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 shadow-[0_0_15px_rgba(223,255,0,0.1)]">
                <Image
                  src="/logo.png"
                  alt="ScopeIQ Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-foreground">
                Scope<span className="text-[var(--primary)]">IQ</span>
              </span>
            </Link>
          </SidebarHeader>

          <SidebarContent className="py-4 px-3 space-y-6">
            <SidebarGroup>
              <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-wider text-[var(--on-surface-variant)]/60 px-3 mb-2">
                Core Operations
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        {item.disabled ? (
                          <SidebarMenuButton
                            onClick={() => handleDisabledClick(item.title)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono text-[var(--on-surface-variant)]/60 hover:bg-[var(--surface-container)] hover:text-foreground transition-all duration-200 cursor-pointer"
                          >
                            <item.icon className="h-4.5 w-4.5 text-[var(--on-surface-variant)]/40" />
                            <span>{item.title}</span>
                            <span className="ml-auto font-mono text-[8px] bg-[var(--surface-container-high)] px-1.5 py-0.5 rounded text-[var(--on-surface-variant)]/70 uppercase">
                              Staging
                            </span>
                          </SidebarMenuButton>
                        ) : (
                          <SidebarMenuButton
                            render={
                              <Link
                                href={item.url}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-all duration-200 ${
                                  isActive
                                    ? "bg-[var(--primary)]/10 text-[var(--primary)] border-l-2 border-[var(--primary)] shadow-[0_0_15px_rgba(223,255,0,0.08)]"
                                    : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] hover:text-foreground"
                                }`}
                              />
                            }
                          >
                            <item.icon
                              className={`h-4.5 w-4.5 ${
                                isActive ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)]/70"
                              }`}
                            />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-[var(--line)]">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[var(--surface-container)] border border-transparent hover:border-[var(--line)] transition-all duration-250 cursor-pointer text-left">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-9 w-9 rounded-lg border border-[var(--line)] iq-glow">
                      <AvatarImage
                        src={user?.avatarUrl || ""}
                        alt={user?.fullName || "User profile"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[var(--surface-container-high)] text-foreground font-mono text-sm rounded-lg font-bold">
                        {user?.fullName?.slice(0, 2).toUpperCase() || "IQ"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--primary)] border-2 border-[var(--surface-container-lowest)] animate-pulse" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-xs font-bold text-foreground truncate max-w-[120px]">
                      {user?.fullName || user?.username || "Guest Operator"}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--on-surface-variant)]/70 truncate max-w-[120px]">
                      {roleLabel}
                    </span>
                  </div>
                </div>
                <ChevronUp className="h-4 w-4 text-[var(--on-surface-variant)]/60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-56 bg-[var(--surface-container-low)] border border-[var(--line)] shadow-xl p-1 rounded-xl"
              >
                <div className="px-3 py-2 font-mono text-[10px] text-[var(--on-surface-variant)]/60 border-b border-[var(--line)] mb-1">
                  Active Operator Session
                </div>
                <DropdownMenuItem
                  onClick={() => toast.info("Profile configurations are read-only in staging.")}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono hover:bg-[var(--surface-container-high)] transition-all cursor-pointer"
                >
                  <User className="h-4 w-4 text-[var(--on-surface-variant)]" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.info("Settings are locked under security protocol.")}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono hover:bg-[var(--surface-container-high)] transition-all cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-[var(--on-surface-variant)]" />
                  <span>Security settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[var(--line)] my-1" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono text-destructive hover:bg-destructive/10 hover:text-destructive transition-all cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Sidebar Inset (Main Window) */}
        <SidebarInset className="flex flex-1 flex-col bg-background relative overflow-hidden">
          {/* Header Panel */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--line)] px-6 bg-[var(--surface)]/40 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-[var(--surface-container)] rounded-lg text-[var(--on-surface-variant)]/80 hover:text-foreground cursor-pointer" />
              <div className="h-4 w-[1px] bg-[var(--line)]" />
              <div className="font-mono text-xs text-[var(--on-surface-variant)]/70 hidden sm:block">
                SYS_STATUS: <span className="text-[var(--primary)] font-bold">ONLINE</span> // OPERATOR: {user?.username}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => toast.info("Search node requires active database index.")}
                className="p-2 rounded-lg hover:bg-[var(--surface-container)] hover:text-foreground text-[var(--on-surface-variant)]/80 transition-colors cursor-pointer"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={() => toast.info("No active telemetry alerts.")}
                className="p-2 rounded-lg hover:bg-[var(--surface-container)] hover:text-foreground text-[var(--on-surface-variant)]/80 transition-colors cursor-pointer relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" />
              </button>
              <div className="h-6 w-[1px] bg-[var(--line)]" />
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] text-[var(--on-surface-variant)]/80 px-2.5 py-1 rounded bg-[var(--surface-container)] border border-[var(--line)] uppercase">
                  {user?.role === USER_ROLES.PROJECT_MANAGER ? "Project Manager" : "Client"}
                </span>
              </div>
            </div>
          </header>

          {/* Page Workstation Content */}
          <main className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto z-10 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Glowing Ambient Light Backdrops */}
          <div className="absolute top-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-[var(--primary)]/3 blur-[140px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-[var(--primary)]/3 blur-[140px] rounded-full pointer-events-none z-0" />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
