"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Database, PlusCircle, History } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: FileText },
  { href: "/source-of-truth", label: "Source of Truth", icon: Database },
  { href: "/applications/new", label: "New Application", icon: PlusCircle },
  { href: "/applications", label: "History", icon: History },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Resume<span className="text-primary">Tailor</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
