"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function SidePanel({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
}: SidePanelProps) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="dm-fade absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside
        className={cn(
          "dm-drawer relative ml-0 mr-auto flex h-full w-full max-w-[560px] flex-col bg-canvas shadow-2xl"
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-gray-200 bg-white px-6 py-5">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                {icon}
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-ink">{title}</h2>
              {subtitle && (
                <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

        {footer && (
          <footer className="border-t border-gray-200 bg-white px-6 py-4">
            {footer}
          </footer>
        )}
      </aside>
    </div>
  );
}
