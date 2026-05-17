"use client";

import { useState } from "react";
import { Coffee, Clock, Lock } from "lucide-react";
import { roulettePrizes, suggestedLevels } from "@/lib/sales-assistant-data";

export function WheelPreview() {
  const [angle, setAngle] = useState(0);
  const seg = 360 / roulettePrizes.length;
  const gradient = roulettePrizes
    .map((p, i) => `${p.color} ${i * seg}deg ${(i + 1) * seg}deg`)
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-52 w-52">
        <div
          className="absolute right-1/2 top-[-10px] z-20 translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderTop: "16px solid #1a1430",
          }}
        />
        <div
          className="h-52 w-52 rounded-full shadow-lg ring-8 ring-white transition-transform duration-[2500ms] ease-out"
          style={{
            background: `conic-gradient(${gradient})`,
            transform: `rotate(${angle}deg)`,
          }}
        />
        <div className="absolute right-1/2 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white shadow">
          <Coffee className="h-6 w-6 text-brand-600" />
        </div>
      </div>
      <button
        onClick={() => setAngle((a) => a + 360 * 3 + Math.floor(Math.random() * 360))}
        className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        تدوير العجلة
      </button>
      <div className="flex flex-wrap justify-center gap-1.5">
        {roulettePrizes.map((p) => (
          <span
            key={p.id}
            className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: p.color }}
            />
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CartTimerPreview() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="mb-3 text-xs font-semibold text-muted">معاينة داخل السلة</p>
      <div className="rounded-xl bg-canvas p-4">
        <div className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-brand-700">
          <Clock className="h-4 w-4" />
          <span className="text-xs font-semibold">
            جائزتك محجوزة! أكمل خلال 09:58 دقيقة
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-dashed border-brand-200 bg-white px-3 py-2">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-brand-500" />
            <span className="text-xs font-medium text-ink">
              توصيل مجاني (مكافأة معلّقة)
            </span>
          </div>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            بانتظار الإتمام
          </span>
        </div>
      </div>
    </div>
  );
}

export function LevelLadder() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="mb-3 text-xs font-semibold text-muted">
        كيف تظهر المستويات للعميل
      </p>
      <div className="flex items-end gap-2">
        {suggestedLevels.map((l, i) => (
          <div key={l.id} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className="w-full rounded-t-lg"
              style={{
                height: `${36 + i * 22}px`,
                background: l.color,
              }}
            />
            <span className="text-[11px] font-semibold text-ink">{l.name}</span>
            <span className="text-[10px] text-muted">{l.requiredOrders} طلب</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BubblePreview({ messages }: { messages: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="mb-3 text-xs font-semibold text-muted">
        معاينة الببل داخل المتجر
      </p>
      <div className="relative h-44 rounded-xl bg-gradient-to-b from-canvas to-white p-3">
        <div className="space-y-2">
          {messages.slice(0, 2).map((m, i) => (
            <div
              key={i}
              className="dm-pop max-w-[80%] rounded-2xl rounded-tr-sm bg-white px-3 py-2 text-xs text-ink shadow-sm"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/40">
            <Coffee className="h-5 w-5" />
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted">
        مساعد بيع تفاعلي — ليس روبوت دردشة
      </p>
    </div>
  );
}
