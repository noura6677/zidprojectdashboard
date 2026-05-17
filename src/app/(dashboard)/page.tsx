import Link from "next/link";
import {
  Sparkles,
  ArrowUpLeft,
  TrendingUp,
  ShoppingBag,
  Users,
  Wallet,
  CheckCircle2,
  Layers,
  Trophy,
  Disc3,
} from "lucide-react";

const stats = [
  { label: "متوسط قيمة السلة", value: "184 ﷼", change: "+31%", icon: TrendingUp },
  { label: "طلبات اليوم", value: "47", change: "+12%", icon: ShoppingBag },
  { label: "عملاء نشطون", value: "1,284", change: "+8%", icon: Users },
  { label: "إيراد إضافي من الأدوات", value: "9,420 ﷼", change: "+24%", icon: Wallet },
];

const onboarding = [
  { title: "متجر «نجدية» متصل", desc: "واجهة العرض جاهزة وتعمل.", done: true },
  { title: "فعّل الحزم الذكية", desc: "ارفع متوسط السلة تلقائيًا.", done: true },
  { title: "اضبط أوضاع التشغيل", desc: "ذكاء اصطناعي / يدوي / هجين.", done: false },
];

const quick = [
  { label: "الحزم الذكية", icon: Layers },
  { label: "نظام المستويات", icon: Trophy },
  { label: "عجلة الحظ", icon: Disc3 },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6 p-6">
      {/* بانر ترويجي */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-brand-700 to-brand-500 px-7 py-7 text-white">
        <div className="relative z-10 max-w-xl">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Deal Maker AI — محرّك المبيعات الذكي
          </div>
          <h1 className="text-2xl font-bold leading-snug">
            حوّل كل عميل من شراء منتج واحد إلى تجربة شراء متكاملة
          </h1>
          <p className="mt-2 text-sm text-white/80">
            أنظمة ذكية ترفع متوسط قيمة السلة داخل متجرك — حزم، مستويات، عجلة حظ،
            وببل بيع تفاعلية.
          </p>
          <Link
            href="/sales-assistant"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition-transform hover:scale-[1.02]"
          >
            افتح مساعد البيع
            <ArrowUpLeft className="h-4 w-4" />
          </Link>
        </div>
        <Sparkles className="absolute -left-6 -top-6 h-44 w-44 text-white/10" />
      </div>

      {/* إحصائيات */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">
                {change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-ink">{value}</p>
            <p className="mt-0.5 text-sm text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* خطوات التجهيز */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 lg:col-span-2">
          <h2 className="text-base font-bold text-ink">خطوات تجهيز متجرك</h2>
          <p className="mt-1 text-sm text-muted">
            أكمل الإعداد لتفعيل كامل قدرات رفع متوسط السلة.
          </p>
          <div className="mt-5 space-y-3">
            {onboarding.map((step) => (
              <div
                key={step.title}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-canvas px-4 py-3.5"
              >
                <CheckCircle2
                  className={
                    step.done
                      ? "h-6 w-6 text-emerald-500"
                      : "h-6 w-6 text-gray-300"
                  }
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{step.title}</p>
                  <p className="text-xs text-muted">{step.desc}</p>
                </div>
                {step.done ? (
                  <span className="text-xs font-semibold text-emerald-600">
                    مكتمل
                  </span>
                ) : (
                  <Link
                    href="/sales-assistant"
                    className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                  >
                    ابدأ
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* وصول سريع */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-bold text-ink">وصول سريع</h2>
          <p className="mt-1 text-sm text-muted">أنظمة مساعد البيع</p>
          <div className="mt-5 space-y-2.5">
            {quick.map(({ label, icon: Icon }) => (
              <Link
                key={label}
                href="/sales-assistant"
                className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1 text-sm font-medium text-ink">
                  {label}
                </span>
                <ArrowUpLeft className="h-4 w-4 text-gray-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
