"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  Megaphone,
  Sparkles,
  MessageCircle,
  Store,
  BarChart3,
  Boxes,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const topNav = [
  { label: "لوحة التحكم", href: "/", icon: Home },
  { label: "الطلبات", href: "/orders", icon: ShoppingCart },
  { label: "المنتجات", href: "/products", icon: Package },
  { label: "العملاء", href: "/customers", icon: Users },
];

const bottomNav = [
  { label: "الواتساب", icon: MessageCircle, badge: "جديد" },
  { label: "المتجر الإلكتروني", icon: Store },
  { label: "التحليلات", href: "/analytics", icon: BarChart3 },
  { label: "اللوجستيات", icon: Boxes },
  { label: "المدفوعات", icon: CreditCard },
];

function NavLink({
  label,
  href,
  icon: Icon,
  active,
  badge,
  soon,
}: {
  label: string;
  href?: string;
  icon: React.ElementType;
  active?: boolean;
  badge?: string;
  soon?: boolean;
}) {
  const content = (
    <span
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-brand-50 text-brand-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      <Icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-brand-600")} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
          {badge}
        </span>
      )}
      {soon && (
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-400">
          قريبًا
        </span>
      )}
    </span>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return (
    <button type="button" className="w-full text-right" title="قريبًا">
      {content}
    </button>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [marketingOpen, setMarketingOpen] = useState(true);
  const salesActive = pathname.startsWith("/sales-assistant");

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto border-l border-gray-200 bg-white px-3 py-4 lg:flex">
      <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
        الرئيسية
      </p>
      <nav className="space-y-1">
        {topNav.map((item) => (
          <NavLink
            key={item.label}
            {...item}
            active={
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            }
          />
        ))}

        {/* مجموعة التسويق + مساعد البيع */}
        <div>
          <button
            type="button"
            onClick={() => setMarketingOpen((o) => !o)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <Megaphone className="h-[18px] w-[18px] shrink-0" />
            <span className="flex-1 text-right">التسويق</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform",
                marketingOpen && "rotate-180"
              )}
            />
          </button>
          {marketingOpen && (
            <div className="dm-fade mt-1 space-y-1 pr-3">
              <Link href="/sales-assistant">
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    salesActive
                      ? "bg-brand-600 text-white shadow-sm shadow-brand-600/30"
                      : "text-gray-600 hover:bg-brand-50 hover:text-brand-700"
                  )}
                >
                  <Sparkles className="h-[18px] w-[18px] shrink-0" />
                  <span className="flex-1">مساعد البيع</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      salesActive
                        ? "bg-white/20 text-white"
                        : "bg-brand-100 text-brand-700"
                    )}
                  >
                    AI
                  </span>
                </span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <p className="mb-2 mt-5 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
        القنوات والإدارة
      </p>
      <nav className="space-y-1">
        {bottomNav.map((item) => (
          <NavLink
            key={item.label}
            {...item}
            active={item.href ? pathname.startsWith(item.href) : false}
            soon={!item.href && !item.badge}
          />
        ))}
      </nav>

      <div className="mt-auto rounded-2xl bg-brand-50 p-4">
        <p className="text-sm font-bold text-brand-800">باقة Pro</p>
        <p className="mt-1 text-xs text-brand-600">
          كل أنظمة رفع السلة مفعّلة لمتجرك.
        </p>
      </div>
    </aside>
  );
}
