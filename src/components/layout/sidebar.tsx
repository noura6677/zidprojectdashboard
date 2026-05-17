"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tag,
  ShoppingBag,
  Settings,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Deals", href: "/deals", icon: Tag },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-700/60 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">Deal Maker AI</p>
          <p className="text-[11px] text-slate-400">Merchant Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Main
        </p>
        <ul className="space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{label}</span>
                  {active && (
                    <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Merchant info */}
      <div className="border-t border-slate-700/60 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
            MM
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">My Merchant</p>
            <p className="truncate text-xs text-slate-400">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
