"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { orders, type Order, type OrderStatus } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const STATUS_COLORS: Record<OrderStatus, "success" | "warning" | "secondary" | "destructive"> = {
  completed: "success",
  pending: "warning",
  refunded: "secondary",
  cancelled: "destructive",
};

function OrderRow({ order }: { order: Order }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 font-mono text-xs text-gray-600">#{order.id}</td>
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">{order.customerName}</p>
        <p className="text-xs text-gray-400">{order.customerEmail}</p>
      </td>
      <td className="max-w-[220px] truncate px-6 py-4 text-gray-700">
        {order.dealTitle}
      </td>
      <td className="px-6 py-4">
        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-600">
          {order.redemptionCode}
        </code>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900">
        {formatCurrency(order.amount)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(order.date)}</td>
      <td className="px-6 py-4">
        <Badge variant={STATUS_COLORS[order.status]}>{order.status}</Badge>
      </td>
    </tr>
  );
}

const totals = {
  all: orders.length,
  completed: orders.filter((o) => o.status === "completed").length,
  pending: orders.filter((o) => o.status === "pending").length,
  refunded: orders.filter((o) => o.status === "refunded").length,
  cancelled: orders.filter((o) => o.status === "cancelled").length,
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.includes(search) ||
      o.dealTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filtered
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <>
      <Header
        title="Orders"
        description="All transactions across your deals"
      />
      <div className="p-6 space-y-5">
        {/* Summary strip */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(["completed", "pending", "refunded", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                statusFilter === s
                  ? "border-indigo-300 bg-indigo-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <p className="text-xs font-medium capitalize text-gray-500">{s}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{totals[s]}</p>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search orders, customers…"
              className="w-72 pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-36"
            >
              <option value="all">All statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
              <option value="cancelled">Cancelled</option>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Revenue summary */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-3">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> orders
          </p>
          <p className="text-sm text-gray-500">
            Completed revenue:{" "}
            <span className="font-semibold text-gray-900">{formatCurrency(totalRevenue)}</span>
          </p>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-6 py-3 font-medium text-gray-500">Order ID</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Customer</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Deal</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Code</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Amount</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.length > 0 ? (
                    filtered.map((order) => (
                      <OrderRow key={order.id} order={order} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
