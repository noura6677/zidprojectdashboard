// كل البيانات هنا وهمية (Mock) — لا يوجد Backend ولا قواعد بيانات ولا ذكاء اصطناعي حقيقي.
// الهدف: تجربة SaaS تبدو واقعية واحترافية بصريًا فقط.

export type SystemMode = "ai" | "merchant" | "hybrid";

export const MODE_LABEL: Record<SystemMode, string> = {
  ai: "ذكاء اصطناعي",
  merchant: "التاجر",
  hybrid: "هجين",
};

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
}

export const storeProducts: StoreProduct[] = [
  { id: "p1", name: "قهوة مختصة — إثيوبيا", price: 65 },
  { id: "p2", name: "قهوة سعودية محمّصة", price: 45 },
  { id: "p3", name: "فلتر V60 سيراميك", price: 80 },
  { id: "p4", name: "إبريق تقطير زجاجي", price: 95 },
  { id: "p5", name: "كوب سيراميك يدوي", price: 35 },
  { id: "p6", name: "كوب ورقي (50 حبة)", price: 25 },
  { id: "p7", name: "ميزان قهوة رقمي", price: 120 },
  { id: "p8", name: "بوكس ضيافة فاخر", price: 210 },
];

export interface SuggestedBundle {
  id: string;
  name: string;
  description: string;
  items: string[];
  aovLift: number; // نسبة رفع متوسط السلة المتوقعة
  active: boolean;
}

export const suggestedBundles: SuggestedBundle[] = [
  {
    id: "b1",
    name: "ركن المختصة الكامل",
    description: "قهوة مختصة + فلتر V60 + كوب سيراميك — تجربة تحضير منزلية متكاملة.",
    items: ["قهوة مختصة — إثيوبيا", "فلتر V60 سيراميك", "كوب سيراميك يدوي"],
    aovLift: 34,
    active: true,
  },
  {
    id: "b2",
    name: "طقم V60 الاحترافي",
    description: "كل أدوات التقطير في حزمة واحدة لعشّاق القهوة الدقيقة.",
    items: ["فلتر V60 سيراميك", "إبريق تقطير زجاجي", "ميزان قهوة رقمي"],
    aovLift: 41,
    active: true,
  },
  {
    id: "b3",
    name: "بوكس الضيافة السعودية",
    description: "قهوة سعودية + بوكس ضيافة + أكواب — مثالي للمناسبات.",
    items: ["قهوة سعودية محمّصة", "بوكس ضيافة فاخر", "كوب ورقي (50 حبة)"],
    aovLift: 28,
    active: false,
  },
];

export interface LevelTier {
  id: string;
  name: string;
  requiredOrders: number;
  reward: string;
  color: string;
}

export const suggestedLevels: LevelTier[] = [
  { id: "l1", name: "مبتدئ", requiredOrders: 1, reward: "خصم ترحيبي 5%", color: "#9d65d2" },
  { id: "l2", name: "هاوي", requiredOrders: 3, reward: "شحن مجاني لطلبين", color: "#7e3fc2" },
  { id: "l3", name: "خبير", requiredOrders: 6, reward: "كوب سيراميك هدية", color: "#6e2eba" },
  { id: "l4", name: "محترف", requiredOrders: 12, reward: "خصم دائم 12% + ضيافة", color: "#451a78" },
];

export interface RoulettePrize {
  id: string;
  label: string;
  weight: number;
  color: string;
}

export const roulettePrizes: RoulettePrize[] = [
  { id: "r1", label: "توصيل مجاني", weight: 25, color: "#6e2eba" },
  { id: "r2", label: "كوب مجاني", weight: 15, color: "#823fc2" },
  { id: "r3", label: "خصم 10%", weight: 30, color: "#9d65d2" },
  { id: "r4", label: "منتج إضافي", weight: 10, color: "#5a219b" },
  { id: "r5", label: "خصم 20%", weight: 8, color: "#bd97e2" },
  { id: "r6", label: "حظ أوفر", weight: 12, color: "#451a78" },
];

export const bubbleAiSuggestions = [
  "تفضّل قهوة سعودية ولا مختصة؟",
  "تحب الأكواب السيراميك ولا الورقية؟",
  "تدوّر على تجربة منزلية ولا ضيافة؟",
  "ودّك أبدأ معك بطقم تحضير متكامل؟",
];

export const bubbleMerchantSamples = [
  "تبي تكمل مجموعتك بأكواب سيراميك؟",
  "مهتم بأدوات V60 أكثر؟",
  "نضيف لك بوكس ضيافة بسعر مميز؟",
];

export interface ModeInfo {
  id: SystemMode;
  title: string;
  tagline: string;
  description: string;
}

export const operatingModes: ModeInfo[] = [
  {
    id: "ai",
    title: "الطيّار الذكي",
    tagline: "AI Autopilot",
    description:
      "يدير المساعد كل الأنظمة تلقائيًا — يقترح الحزم، يضبط المستويات، ويختار أفضل توقيت لعرض العروض دون تدخل منك.",
  },
  {
    id: "merchant",
    title: "التحكم اليدوي",
    tagline: "Manual Control",
    description:
      "أنت تتحكم بكل شيء — تنشئ الحزم والمستويات والجوائز يدويًا، والمساعد ينفّذ ما تحدده فقط.",
  },
  {
    id: "hybrid",
    title: "الوضع الهجين",
    tagline: "Hybrid Mode",
    description:
      "المساعد يقترح، وأنت تعتمد — تحصل على توصيات ذكية مع صلاحية التعديل والموافقة قبل التفعيل.",
  },
];

export const analyticsStats = [
  { label: "رفع متوسط السلة (AOV)", value: "+31.4%", trend: "up", hint: "آخر 30 يوم" },
  { label: "عملاء أضافوا منتجًا ثانيًا", value: "1,284", trend: "up", hint: "هذا الشهر" },
  { label: "أعلى ميزة رفعت التحويل", value: "الحزم الذكية", trend: "flat", hint: "+18% تحويل" },
  { label: "أفضل وقت تفاعل", value: "8م – 11م", trend: "flat", hint: "ذروة الطلبات" },
];

export const analyticsBars = [
  { label: "ركن المختصة الكامل", value: 92 },
  { label: "طقم V60 الاحترافي", value: 78 },
  { label: "بوكس الضيافة السعودية", value: 54 },
  { label: "حزمة المبتدئين", value: 37 },
];

export const analyticsTopLists = [
  {
    title: "أكثر مكافأة تم تفعيلها",
    items: [
      { name: "توصيل مجاني (عجلة الحظ)", pct: 38 },
      { name: "كوب سيراميك هدية (المستويات)", pct: 27 },
      { name: "خصم 10%", pct: 21 },
    ],
  },
  {
    title: "أكثر رسالة ببل تفاعل معها العملاء",
    items: [
      { name: "تبي تكمل مجموعتك بأكواب سيراميك؟", pct: 44 },
      { name: "مهتم بأدوات V60 أكثر؟", pct: 31 },
      { name: "تدوّر على تجربة ضيافة؟", pct: 19 },
    ],
  },
];

export const aiInsights = [
  "الحزم التي تحتوي على أكواب رفعت متوسط السلة بنسبة أعلى بـ 19% مقارنة بغيرها.",
  "عجلة الحظ تحقق نتائج أفضل عند عرضها بعد إضافة أول منتج للسلة، لا عند الدخول.",
  "رسائل الضيافة حققت أعلى تفاعل خلال المساء — جرّب تركيزها بين 8م و11م.",
  "ترقية العميل لمستوى «خبير» ترفع احتمال تكرار الشراء بنسبة 2.3 ضعف.",
];
