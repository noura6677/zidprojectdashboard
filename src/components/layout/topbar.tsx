"use client";

import { Bell, Moon, Plus, Search, Sparkles, LayoutGrid } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-5">
      {/* الشعار */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-ink">Deal Maker AI</p>
          <p className="text-[11px] text-muted">صانع الصفقات</p>
        </div>
      </div>

      <button className="flex h-9 items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
        <Plus className="h-4 w-4" />
        إضافة
      </button>

      {/* البحث */}
      <div className="relative mx-auto hidden w-full max-w-xl md:block">
        <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="بحث"
          className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pr-9 pl-16 text-sm outline-none transition-colors focus:border-brand-300 focus:bg-white"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] text-gray-400">
          Ctrl + K
        </span>
      </div>

      <div className="mr-auto flex items-center gap-1.5 md:mr-0">
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-brand-50 px-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100">
          <Sparkles className="h-4 w-4" />
          مساعد ذكي
        </button>
        <button className="rounded-xl p-2 text-gray-500 hover:bg-gray-100">
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500" />
        </button>
        <button className="rounded-xl p-2 text-gray-500 hover:bg-gray-100">
          <Moon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
