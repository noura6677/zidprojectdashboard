"use client";

import { useState } from "react";
import {
  Layers,
  Trophy,
  Disc3,
  MessageSquareText,
  SlidersHorizontal,
  BarChart3,
  Sparkles,
  ArrowUpLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SidePanel } from "@/components/ui/side-panel";
import {
  type SystemMode,
  MODE_LABEL,
  operatingModes,
} from "@/lib/sales-assistant-data";
import {
  BundlesPanel,
  LevelsPanel,
  RoulettePanel,
  BubblePanel,
  ModesPanel,
  AnalyticsPanel,
} from "@/components/sales-assistant/panels";

type SystemId =
  | "bundles"
  | "levels"
  | "roulette"
  | "bubble"
  | "modes"
  | "analytics";

const FEATURES: {
  id: SystemId;
  title: string;
  desc: string;
  icon: React.ElementType;
  status: string;
  accent: string;
}[] = [
  {
    id: "bundles",
    title: "الحزم الذكية",
    desc: "حزم منتجات تُقترح تلقائيًا لرفع متوسط السلة.",
    icon: Layers,
    status: "نشط · 2 حزم مفعّلة",
    accent: "from-brand-600 to-brand-400",
  },
  {
    id: "levels",
    title: "نظام المستويات",
    desc: "كافئ العملاء على تكرار الشراء عبر مستويات.",
    icon: Trophy,
    status: "نشط · 4 مستويات",
    accent: "from-violet-600 to-fuchsia-400",
  },
  {
    id: "roulette",
    title: "عجلة الحظ",
    desc: "جوائز، مكافأة معلّقة، ومؤقت داخل السلة.",
    icon: Disc3,
    status: "نشط · 6 جوائز",
    accent: "from-indigo-600 to-brand-400",
  },
  {
    id: "bubble",
    title: "الببل الذكية",
    desc: "مساعد بيع تفاعلي يكتشف اهتمام العميل.",
    icon: MessageSquareText,
    status: "نشط · يعمل في المتجر",
    accent: "from-brand-500 to-purple-400",
  },
  {
    id: "modes",
    title: "أوضاع التشغيل",
    desc: "ذكاء اصطناعي / يدوي / هجين للنظام كله.",
    icon: SlidersHorizontal,
    status: "الوضع العام",
    accent: "from-brand-700 to-brand-500",
  },
  {
    id: "analytics",
    title: "التحليلات والتقارير",
    desc: "رؤى ذكية عن أداء أدوات رفع السلة.",
    icon: BarChart3,
    status: "محدّث الآن",
    accent: "from-fuchsia-600 to-brand-400",
  },
];

export default function SalesAssistantPage() {
  const [open, setOpen] = useState<SystemId | null>(null);
  const [globalMode, setGlobalMode] = useState<SystemMode>("hybrid");
  const [modes, setModes] = useState<Record<string, SystemMode>>({
    bundles: "ai",
    levels: "ai",
    roulette: "ai",
    bubble: "ai",
  });

  const setMode = (id: string) => (m: SystemMode) =>
    setModes((p) => ({ ...p, [id]: m }));

  const active = FEATURES.find((f) => f.id === open);

  return (
    <div className="p-6">
      {/* رأس الصفحة */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-brand-800 via-brand-700 to-brand-500 px-7 py-7 text-white">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> مساعد البيع · AI Sales Engine
          </div>
          <h1 className="mt-3 text-2xl font-bold">
            تحكّم كامل في سلوكيات رفع متوسط السلة
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            ستة أنظمة ذكية تعمل داخل متجر «نجدية» — كل نظام يدعم وضع الذكاء
            الاصطناعي، اليدوي، والهجين.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-white/70">الوضع العام:</span>
            <Badge variant="solid" className="bg-white/20">
              {operatingModes.find((m) => m.id === globalMode)?.title} ·{" "}
              {MODE_LABEL[globalMode]}
            </Badge>
          </div>
        </div>
        <Sparkles className="absolute -left-8 -top-8 h-48 w-48 text-white/10" />
      </div>

      {/* بطاقات الأنظمة */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              onClick={() => setOpen(f.id)}
              className="dm-card-hover group rounded-3xl border border-gray-100 bg-white p-6 text-right"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.accent} text-white`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {f.desc}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {f.status}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-transform group-hover:-translate-x-1">
                  إدارة
                  <ArrowUpLeft className="h-4 w-4" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* اللوحات الجانبية */}
      <SidePanel
        open={!!active}
        onClose={() => setOpen(null)}
        title={active?.title ?? ""}
        subtitle={active?.desc}
        icon={active ? <active.icon className="h-5 w-5" /> : null}
      >
        {open === "bundles" && (
          <BundlesPanel mode={modes.bundles} setMode={setMode("bundles")} />
        )}
        {open === "levels" && (
          <LevelsPanel mode={modes.levels} setMode={setMode("levels")} />
        )}
        {open === "roulette" && (
          <RoulettePanel mode={modes.roulette} setMode={setMode("roulette")} />
        )}
        {open === "bubble" && (
          <BubblePanel mode={modes.bubble} setMode={setMode("bubble")} />
        )}
        {open === "modes" && (
          <ModesPanel globalMode={globalMode} setGlobalMode={setGlobalMode} />
        )}
        {open === "analytics" && <AnalyticsPanel />}
      </SidePanel>
    </div>
  );
}
