"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Pause,
  Play,
  Pencil,
  Trash2,
  Filter,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deals as initialDeals, type Deal, type DealStatus } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const STATUS_COLORS: Record<DealStatus, "success" | "warning" | "secondary" | "destructive"> = {
  active: "success",
  paused: "warning",
  expired: "secondary",
  draft: "secondary",
};

function DealRow({
  deal,
  onToggle,
  onDelete,
}: {
  deal: Deal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const redemptionPct =
    deal.maxRedemptions
      ? Math.round((deal.redemptions / deal.maxRedemptions) * 100)
      : null;

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">{deal.title}</p>
        <p className="mt-0.5 text-xs text-gray-400">{deal.category}</p>
      </td>
      <td className="px-6 py-4">
        <Badge variant={STATUS_COLORS[deal.status]}>{deal.status}</Badge>
      </td>
      <td className="px-6 py-4 text-gray-700">
        {deal.discountType === "percentage"
          ? `${deal.discountValue}% off`
          : `${formatCurrency(deal.discountValue)} off`}
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-semibold text-gray-900">
          {formatCurrency(deal.dealPrice)}
        </p>
        <p className="text-xs text-gray-400 line-through">
          {formatCurrency(deal.originalPrice)}
        </p>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{deal.redemptions}</span>
            {deal.maxRedemptions && <span>{deal.maxRedemptions}</span>}
          </div>
          {deal.maxRedemptions ? (
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${redemptionPct}%` }}
              />
            </div>
          ) : (
            <span className="text-xs text-gray-400">Unlimited</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {deal.endDate ? formatDate(deal.endDate) : "No expiry"}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900">
        {formatCurrency(deal.revenue)}
      </td>
      <td className="px-6 py-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          {menuOpen && (
            <div
              className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => { setMenuOpen(false); }}
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit deal
              </button>
              {deal.status === "active" && (
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:bg-gray-50"
                  onClick={() => { onToggle(deal.id); setMenuOpen(false); }}
                >
                  <Pause className="h-3.5 w-3.5" />
                  Pause deal
                </button>
              )}
              {deal.status === "paused" && (
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-gray-50"
                  onClick={() => { onToggle(deal.id); setMenuOpen(false); }}
                >
                  <Play className="h-3.5 w-3.5" />
                  Resume deal
                </button>
              )}
              <button
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
                onClick={() => { onDelete(deal.id); setMenuOpen(false); }}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function DealsPage() {
  const [dealsData, setDealsData] = useState<Deal[]>(initialDeals);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = dealsData.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: dealsData.length,
    active: dealsData.filter((d) => d.status === "active").length,
    paused: dealsData.filter((d) => d.status === "paused").length,
    draft: dealsData.filter((d) => d.status === "draft").length,
    expired: dealsData.filter((d) => d.status === "expired").length,
  };

  function toggleDeal(id: string) {
    setDealsData((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "active" ? "paused" : "active" }
          : d
      )
    );
  }

  function deleteDeal(id: string) {
    setDealsData((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <>
      <Header
        title="Deals"
        description="Manage your promotional offers"
      />
      <div className="p-6 space-y-5">
        {/* Status tabs */}
        <div className="flex gap-1 border-b border-gray-200">
          {(["all", "active", "paused", "draft", "expired"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                statusFilter === s
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="capitalize">{s}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${
                  statusFilter === s
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search deals…"
              className="w-64 pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-36"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired</option>
            </Select>
            <Button>
              <Plus className="h-4 w-4" />
              New Deal
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-6 py-3 font-medium text-gray-500">Deal</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Discount</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Price</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Redemptions</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Expires</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Revenue</th>
                    <th className="px-6 py-3 font-medium text-gray-500" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.length > 0 ? (
                    filtered.map((deal) => (
                      <DealRow
                        key={deal.id}
                        deal={deal}
                        onToggle={toggleDeal}
                        onDelete={deleteDeal}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                        No deals found.
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
