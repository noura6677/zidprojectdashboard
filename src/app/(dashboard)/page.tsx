import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Tag,
  ShoppingBag,
  MousePointerClick,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  kpiData,
  revenueByMonth,
  deals,
  orders,
} from "@/lib/mock-data";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";

function KpiCard({
  title,
  value,
  change,
  icon: Icon,
  prefix = "",
  suffix = "",
}: {
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
}) {
  const positive = change >= 0;
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
            <Icon className="h-4 w-4 text-indigo-600" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-bold text-gray-900">
          {prefix}
          {typeof value === "number" && title.toLowerCase().includes("revenue")
            ? formatCurrency(value)
            : `${value}${suffix}`}
        </p>
        <div className="mt-1 flex items-center gap-1">
          {positive ? (
            <TrendingUp className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          )}
          <span
            className={`text-xs font-medium ${positive ? "text-green-600" : "text-red-600"}`}
          >
            {formatPercent(change)}
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className="h-full rounded-full bg-indigo-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const maxRevenue = Math.max(...revenueByMonth.map((m) => m.revenue));

function dealStatusBadge(status: string) {
  const map: Record<string, "success" | "warning" | "secondary" | "destructive"> = {
    active: "success",
    paused: "warning",
    expired: "secondary",
    draft: "outline" as "secondary",
  };
  return map[status] ?? "secondary";
}

function orderStatusBadge(status: string) {
  const map: Record<string, "success" | "warning" | "secondary" | "destructive"> = {
    completed: "success",
    pending: "warning",
    refunded: "secondary",
    cancelled: "destructive",
  };
  return map[status] ?? "secondary";
}

export default function OverviewPage() {
  const topDeals = [...deals]
    .filter((d) => d.status === "active")
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 4);

  const recentOrders = orders.slice(0, 5);

  return (
    <>
      <Header
        title="Overview"
        description="Your merchant performance at a glance"
      />
      <div className="p-6 space-y-6">
        {/* KPI grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Revenue"
            value={kpiData.totalRevenue}
            change={kpiData.revenueChange}
            icon={DollarSign}
          />
          <KpiCard
            title="Active Deals"
            value={kpiData.activeDeals}
            change={((kpiData.activeDealsChange / (kpiData.activeDeals - kpiData.activeDealsChange)) * 100)}
            icon={Tag}
            suffix=" deals"
          />
          <KpiCard
            title="Total Orders"
            value={kpiData.totalOrders}
            change={kpiData.ordersChange}
            icon={ShoppingBag}
            suffix=" orders"
          />
          <KpiCard
            title="Conversion Rate"
            value={kpiData.conversionRate}
            change={kpiData.conversionChange}
            icon={MousePointerClick}
            suffix="%"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Revenue chart (bar) */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-end gap-3">
                {revenueByMonth.map((m) => {
                  const pct = Math.round((m.revenue / maxRevenue) * 100);
                  const isLatest = m.month === revenueByMonth[revenueByMonth.length - 1].month;
                  return (
                    <div key={m.month} className="group flex flex-1 flex-col items-center gap-1">
                      <span className="invisible text-[10px] text-gray-500 group-hover:visible">
                        {formatCurrency(m.revenue)}
                      </span>
                      <div
                        className={`w-full rounded-t transition-all ${isLatest ? "bg-indigo-500" : "bg-indigo-200 group-hover:bg-indigo-300"}`}
                        style={{ height: `${pct}%` }}
                      />
                      <span className="text-[11px] text-gray-400">{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top active deals */}
          <Card>
            <CardHeader>
              <CardTitle>Top Active Deals</CardTitle>
              <CardDescription>By revenue generated</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {topDeals.map((deal) => (
                  <li key={deal.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="max-w-[160px] truncate text-sm font-medium text-gray-800">
                        {deal.title}
                      </p>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(deal.revenue)}
                      </span>
                    </div>
                    <MiniBar value={deal.revenue} max={topDeals[0].revenue} />
                    <p className="text-xs text-gray-400">
                      {deal.redemptions} redemptions
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest transactions across all deals</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-6 py-3 font-medium text-gray-500">Order</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Customer</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Deal</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Amount</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-mono text-xs text-gray-600">
                        #{order.id}
                      </td>
                      <td className="px-6 py-3">
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-xs text-gray-400">{order.customerEmail}</p>
                      </td>
                      <td className="max-w-[200px] truncate px-6 py-3 text-gray-700">
                        {order.dealTitle}
                      </td>
                      <td className="px-6 py-3 font-semibold text-gray-900">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-6 py-3 text-gray-500">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant={orderStatusBadge(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
