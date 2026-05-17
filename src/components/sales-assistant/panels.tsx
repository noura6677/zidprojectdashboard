"use client";

import { useState } from "react";
import {
  Plus,
  Check,
  Sparkles,
  Trophy,
  Clock,
  Lock,
  TrendingUp,
  Bot,
  Hand,
  Blend,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeSwitch, Toggle } from "@/components/ui/mode-switch";
import {
  type SystemMode,
  storeProducts,
  suggestedBundles,
  suggestedLevels,
  roulettePrizes,
  bubbleAiSuggestions,
  bubbleMerchantSamples,
  operatingModes,
  analyticsStats,
  analyticsBars,
  analyticsTopLists,
  aiInsights,
} from "@/lib/sales-assistant-data";
import {
  WheelPreview,
  CartTimerPreview,
  LevelLadder,
  BubblePreview,
} from "./previews";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      {children}
    </section>
  );
}

function ModeHint({ mode }: { mode: SystemMode }) {
  const map: Record<SystemMode, string> = {
    ai: "المساعد يقترح وينفّذ تلقائيًا بناءً على سلوك متجرك.",
    merchant: "أنت تتحكم بالكامل — أنشئ وعدّل كل شيء يدويًا.",
    hybrid: "المساعد يقترح وأنت تعتمد قبل التفعيل.",
  };
  const Icon = mode === "ai" ? Bot : mode === "merchant" ? Hand : Blend;
  return (
    <div className="flex items-center gap-2 rounded-xl bg-brand-50 px-3.5 py-2.5 text-xs font-medium text-brand-700">
      <Icon className="h-4 w-4 shrink-0" />
      {map[mode]}
    </div>
  );
}

type PanelProps = { mode: SystemMode; setMode: (m: SystemMode) => void };

/* ============ 1. الحزم الذكية ============ */
export function BundlesPanel({ mode, setMode }: PanelProps) {
  const [bundles, setBundles] = useState(suggestedBundles);
  const [name, setName] = useState("");
  const [reward, setReward] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  function toggleProduct(id: string) {
    setPicked((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );
  }
  function saveBundle() {
    if (!name || picked.length === 0) return;
    setBundles((b) => [
      {
        id: `m-${Date.now()}`,
        name,
        description: reward || "حزمة من إنشاء التاجر",
        items: storeProducts
          .filter((p) => picked.includes(p.id))
          .map((p) => p.name),
        aovLift: 20 + Math.floor(Math.random() * 20),
        active: true,
      },
      ...b,
    ]);
    setName("");
    setReward("");
    setPicked([]);
  }

  return (
    <div className="space-y-6">
      <ModeSwitch value={mode} onChange={setMode} />
      <ModeHint mode={mode} />

      {(mode === "ai" || mode === "hybrid") && (
        <Section
          title={
            mode === "ai" ? "حزم مقترحة تلقائيًا" : "اقتراحات بانتظار اعتمادك"
          }
        >
          <div className="space-y-3">
            {bundles.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">{b.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{b.description}</p>
                  </div>
                  <Badge variant="success">
                    <TrendingUp className="h-3 w-3" /> +{b.aovLift}% سلة
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {b.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-lg bg-canvas px-2 py-1 text-[11px] text-gray-600"
                    >
                      {it}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted">
                    {b.active ? "مفعّلة في المتجر" : "غير مفعّلة"}
                  </span>
                  <div className="flex items-center gap-2">
                    {mode === "hybrid" && (
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={b.active ? "soft" : "default"}
                      onClick={() =>
                        setBundles((arr) =>
                          arr.map((x) =>
                            x.id === b.id ? { ...x, active: !x.active } : x
                          )
                        )
                      }
                    >
                      {b.active
                        ? "إيقاف"
                        : mode === "hybrid"
                        ? "اعتماد وتفعيل"
                        : "تفعيل"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(mode === "merchant" || mode === "hybrid") && (
        <Section title="إنشاء حزمة يدويًا">
          <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسم الحزمة"
              className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-brand-300"
            />
            <input
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              placeholder="الخصم أو المكافأة (مثال: خصم 15%)"
              className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-brand-300"
            />
            <div>
              <p className="mb-2 text-xs font-semibold text-muted">
                اختر منتجات من المتجر
              </p>
              <div className="grid grid-cols-2 gap-2">
                {storeProducts.map((p) => {
                  const on = picked.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProduct(p.id)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-right text-xs transition-colors ${
                        on
                          ? "border-brand-300 bg-brand-50 text-brand-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-md border ${
                          on
                            ? "border-brand-500 bg-brand-500 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {on && <Check className="h-3 w-3" />}
                      </span>
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <Button onClick={saveBundle} className="w-full">
              <Plus className="h-4 w-4" /> حفظ الحزمة
            </Button>
          </div>
        </Section>
      )}
    </div>
  );
}

/* ============ 2. نظام المستويات ============ */
export function LevelsPanel({ mode, setMode }: PanelProps) {
  const [levels, setLevels] = useState(suggestedLevels);

  return (
    <div className="space-y-6">
      <ModeSwitch value={mode} onChange={setMode} />
      <ModeHint mode={mode} />

      <Section
        title={
          mode === "merchant" ? "مستوياتك" : "مستويات مقترحة جاهزة"
        }
      >
        <div className="space-y-2.5">
          {levels.map((l, i) => (
            <div
              key={l.id}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3.5"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{ background: l.color }}
              >
                <Trophy className="h-4 w-4" />
              </span>
              <div className="flex-1">
                {mode === "merchant" ? (
                  <input
                    defaultValue={l.name}
                    className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-sm font-semibold outline-none focus:border-brand-300"
                  />
                ) : (
                  <p className="text-sm font-bold text-ink">{l.name}</p>
                )}
                <p className="mt-0.5 text-xs text-muted">
                  بعد {l.requiredOrders} طلب · {l.reward}
                </p>
              </div>
              {mode !== "ai" && (
                <Button variant="outline" size="sm">
                  تعديل الشروط
                </Button>
              )}
            </div>
          ))}
        </div>
        {mode !== "ai" && (
          <Button
            variant="soft"
            className="w-full"
            onClick={() =>
              setLevels((ls) => [
                ...ls,
                {
                  id: `lv-${Date.now()}`,
                  name: "مستوى جديد",
                  requiredOrders: ls.length * 3 + 3,
                  reward: "حدّد المكافأة",
                  color: "#823fc2",
                },
              ])
            }
          >
            <Plus className="h-4 w-4" /> إضافة مستوى
          </Button>
        )}
      </Section>

      <LevelLadder />
    </div>
  );
}

/* ============ 3. عجلة الحظ ============ */
export function RoulettePanel({ mode, setMode }: PanelProps) {
  const tabs = ["العجلة", "المكافأة المعلّقة", "المؤقت", "التفعيل"];
  const [tab, setTab] = useState(0);
  const [lockedReward, setLockedReward] = useState(true);

  return (
    <div className="space-y-6">
      <ModeSwitch value={mode} onChange={setMode} />
      <ModeHint mode={mode} />

      <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
              tab === i
                ? "bg-white text-brand-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="space-y-5">
          <WheelPreview />
          {mode === "ai" ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-bold text-ink">عجلة مقترحة جاهزة</p>
              <p className="mt-1 text-xs text-muted">
                مبنية على متجر القهوة — جوائز: توصيل مجاني، كوب مجاني، خصم، منتج
                إضافي.
              </p>
              <Button size="sm" className="mt-3">
                تفعيل العجلة المقترحة
              </Button>
            </div>
          ) : (
            <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">
                  عدد أقسام العجلة
                </span>
                <span className="rounded-lg bg-canvas px-3 py-1 text-sm font-bold text-brand-700">
                  {roulettePrizes.length}
                </span>
              </div>
              {roulettePrizes.map((p) => (
                <input
                  key={p.id}
                  defaultValue={p.label}
                  className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-brand-300"
                />
              ))}
              <Button size="sm" variant="soft" className="w-full">
                <Plus className="h-4 w-4" /> إضافة قسم
              </Button>
            </div>
          )}
        </div>
      )}

      {tab === 1 && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-semibold text-ink">
                  تصبح مكافأة معلّقة داخل السلة
                </span>
              </div>
              <Toggle checked={lockedReward} onChange={setLockedReward} />
            </div>
            <p className="mt-2 text-xs text-muted">
              {lockedReward
                ? "الجائزة تُحجز في السلة ولا تُفعّل إلا بعد إتمام الطلب — تحفّز العميل على الشراء."
                : "الجائزة تُفعّل فورًا بمجرد الفوز بها."}
            </p>
          </div>
          <CartTimerPreview />
        </div>
      )}

      {tab === 2 && (
        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <label className="block text-xs font-semibold text-muted">
            مدة المؤقت (دقائق)
          </label>
          <input
            defaultValue={10}
            type="number"
            className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-brand-300"
          />
          <label className="block text-xs font-semibold text-muted">
            الرسالة الظاهرة
          </label>
          <input
            defaultValue="جائزتك محجوزة! أكمل طلبك قبل انتهاء الوقت"
            className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-brand-300"
          />
          <label className="block text-xs font-semibold text-muted">
            وقت بدء المؤقت
          </label>
          <select className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-brand-300">
            <option>عند الفوز بالجائزة</option>
            <option>عند إضافة أول منتج للسلة</option>
            <option>عند فتح صفحة السلة</option>
          </select>
          <div className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-xs text-brand-700">
            <Clock className="h-4 w-4" /> يظهر المؤقت داخل سلة العميل بشكل مرئي.
          </div>
        </div>
      )}

      {tab === 3 && (
        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm font-semibold text-ink">متى تظهر العجلة؟</p>
          {[
            "بعد إضافة أول منتج للسلة (موصى به)",
            "عند الدخول للمتجر",
            "قبل إتمام الطلب",
          ].map((opt, i) => (
            <label
              key={opt}
              className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700"
            >
              <input
                type="radio"
                name="trigger"
                defaultChecked={i === 0}
                className="accent-brand-600"
              />
              {opt}
            </label>
          ))}
          <Button className="w-full">تفعيل عجلة الحظ</Button>
        </div>
      )}
    </div>
  );
}

/* ============ 4. الببل الذكية ============ */
export function BubblePanel({ mode, setMode }: PanelProps) {
  const [msgs, setMsgs] = useState(
    mode === "merchant" ? bubbleMerchantSamples : bubbleAiSuggestions
  );
  const [draft, setDraft] = useState("");

  return (
    <div className="space-y-6">
      <ModeSwitch
        value={mode}
        onChange={(m) => {
          setMode(m);
          setMsgs(m === "merchant" ? bubbleMerchantSamples : bubbleAiSuggestions);
        }}
      />
      <div className="rounded-xl bg-brand-50 px-3.5 py-2.5 text-xs font-medium text-brand-700">
        مساعد بيع تفاعلي يكتشف اهتمامات العميل بلطف — وليس روبوت دردشة.
      </div>

      <Section
        title={
          mode === "merchant"
            ? "رسائلك واقتراحاتك"
            : "اقتراحات ذكية تلقائية"
        }
      >
        <div className="space-y-2">
          {msgs.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-brand-500" />
              {mode === "ai" ? (
                <span className="flex-1 text-sm text-ink">{m}</span>
              ) : (
                <input
                  defaultValue={m}
                  className="flex-1 bg-transparent text-sm text-ink outline-none"
                />
              )}
            </div>
          ))}
        </div>
        {mode !== "ai" && (
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="اكتب اقتراح/سيناريو جديد…"
              className="h-10 flex-1 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-brand-300"
            />
            <Button
              onClick={() => {
                if (!draft) return;
                setMsgs((x) => [...x, draft]);
                setDraft("");
              }}
            >
              <Plus className="h-4 w-4" /> إضافة
            </Button>
          </div>
        )}
      </Section>

      {mode !== "ai" && (
        <Section title="المنتجات التي يركّز عليها المساعد">
          <div className="flex flex-wrap gap-1.5">
            {storeProducts.slice(0, 5).map((p) => (
              <span
                key={p.id}
                className="rounded-full bg-canvas px-3 py-1.5 text-xs text-gray-600"
              >
                {p.name}
              </span>
            ))}
          </div>
        </Section>
      )}

      <BubblePreview messages={msgs} />
    </div>
  );
}

/* ============ 5. أوضاع التشغيل ============ */
export function ModesPanel({
  globalMode,
  setGlobalMode,
}: {
  globalMode: SystemMode;
  setGlobalMode: (m: SystemMode) => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        اختر كيف يدير «Deal Maker AI» أنظمة رفع السلة في متجرك. يمكنك تغيير
        الوضع لكل نظام على حدة أيضًا.
      </p>

      <div className="space-y-3">
        {operatingModes.map((m) => {
          const active = globalMode === m.id;
          const Icon = m.id === "ai" ? Bot : m.id === "merchant" ? Hand : Blend;
          return (
            <button
              key={m.id}
              onClick={() => setGlobalMode(m.id)}
              className={`w-full rounded-2xl border p-4 text-right transition-all ${
                active
                  ? "border-brand-400 bg-brand-50 ring-2 ring-brand-200"
                  : "border-gray-200 bg-white hover:border-brand-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    active
                      ? "bg-brand-600 text-white"
                      : "bg-brand-50 text-brand-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-ink">{m.title}</p>
                    <span className="text-[11px] text-muted">{m.tagline}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {m.description}
                  </p>
                </div>
                {active && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-brand-900 px-5 py-4 text-white">
        <div>
          <p className="text-sm font-bold">الوضع العام الحالي</p>
          <p className="text-xs text-white/70">
            يُطبّق كافتراضي على كل الأنظمة
          </p>
        </div>
        <span className="rounded-xl bg-white/15 px-4 py-2 text-sm font-bold">
          {operatingModes.find((m) => m.id === globalMode)?.title}
        </span>
      </div>
    </div>
  );
}

/* ============ 6. التحليلات والتقارير ============ */
export function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {analyticsStats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1.5 text-lg font-bold text-ink">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-brand-600">{s.hint}</p>
          </div>
        ))}
      </div>

      <Section title="أكثر الحزم شراءً">
        <div className="space-y-2.5 rounded-2xl border border-gray-200 bg-white p-4">
          {analyticsBars.map((b) => (
            <div key={b.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-ink">{b.label}</span>
                <span className="font-semibold text-brand-700">{b.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-brand-600 to-brand-400"
                  style={{ width: `${b.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 gap-4">
        {analyticsTopLists.map((list) => (
          <Section key={list.title} title={list.title}>
            <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4">
              {list.items.map((it, i) => (
                <div
                  key={it.name}
                  className="flex items-center gap-3 text-xs"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 font-bold text-brand-700">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-ink">{it.name}</span>
                  <span className="font-semibold text-muted">{it.pct}%</span>
                </div>
              ))}
            </div>
          </Section>
        ))}
      </div>

      <Section title="اقتراحات ذكية">
        <div className="space-y-2">
          {aiInsights.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-3.5"
            >
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <p className="text-xs leading-relaxed text-brand-900">{tip}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
