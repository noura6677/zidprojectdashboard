import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Placeholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-ink">{title}</h1>
      <p className="mt-1 text-sm text-muted">{description}</p>

      <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Sparkles className="h-7 w-7" />
        </div>
        <p className="mt-4 max-w-md text-sm text-muted">
          هذا القسم ضمن العرض التوضيحي (Demo). الصفحة التفاعلية الكاملة هي{" "}
          <span className="font-semibold text-ink">«مساعد البيع»</span> حيث يتحكم
          التاجر بكل أنظمة رفع متوسط السلة داخل متجره.
        </p>
        <Link
          href="/sales-assistant"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <Sparkles className="h-4 w-4" />
          افتح مساعد البيع
        </Link>
      </div>
    </div>
  );
}
