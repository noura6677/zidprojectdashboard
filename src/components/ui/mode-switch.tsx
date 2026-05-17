"use client";

import { Bot, Hand, Blend } from "lucide-react";
import type { SystemMode } from "@/lib/sales-assistant-data";
import { cn } from "@/lib/utils";

const OPTIONS: { id: SystemMode; label: string; icon: React.ElementType }[] = [
  { id: "ai", label: "ذكاء اصطناعي", icon: Bot },
  { id: "merchant", label: "التاجر", icon: Hand },
  { id: "hybrid", label: "هجين", icon: Blend },
];

export function ModeSwitch({
  value,
  onChange,
  size = "default",
}: {
  value: SystemMode;
  onChange: (m: SystemMode) => void;
  size?: "default" | "lg";
}) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-3 gap-1 rounded-2xl bg-gray-100 p-1",
        size === "lg" && "p-1.5"
      )}
    >
      {OPTIONS.map(({ id, label, icon: Icon }) => {
        const active = value === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              "relative z-10 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all",
              size === "lg" && "py-3 text-sm",
              active
                ? "bg-white text-brand-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Icon className={cn("h-3.5 w-3.5", size === "lg" && "h-4 w-4")} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
        checked ? "bg-brand-600" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "-translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
