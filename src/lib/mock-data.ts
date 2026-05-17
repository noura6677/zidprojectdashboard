export type DealStatus = "active" | "paused" | "expired" | "draft";
export type OrderStatus = "completed" | "pending" | "refunded" | "cancelled";

export interface Deal {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  originalPrice: number;
  dealPrice: number;
  status: DealStatus;
  redemptions: number;
  maxRedemptions: number | null;
  startDate: string;
  endDate: string | null;
  category: string;
  revenue: number;
}

export interface Order {
  id: string;
  dealId: string;
  dealTitle: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: OrderStatus;
  date: string;
  redemptionCode: string;
}

export interface KpiData {
  totalRevenue: number;
  revenueChange: number;
  activeDeals: number;
  activeDealsChange: number;
  totalOrders: number;
  ordersChange: number;
  conversionRate: number;
  conversionChange: number;
}

export const kpiData: KpiData = {
  totalRevenue: 48250,
  revenueChange: 12.5,
  activeDeals: 8,
  activeDealsChange: 2,
  totalOrders: 312,
  ordersChange: 8.3,
  conversionRate: 3.8,
  conversionChange: 0.4,
};

export const revenueByMonth = [
  { month: "Nov", revenue: 28000 },
  { month: "Dec", revenue: 35000 },
  { month: "Jan", revenue: 31000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 42000 },
  { month: "Apr", revenue: 48250 },
];

export const deals: Deal[] = [
  {
    id: "deal-001",
    title: "50% Off Premium Coffee Bundle",
    description: "Get our best-selling arabica blend at half price.",
    discountType: "percentage",
    discountValue: 50,
    originalPrice: 200,
    dealPrice: 100,
    status: "active",
    redemptions: 87,
    maxRedemptions: 200,
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    category: "Food & Beverage",
    revenue: 8700,
  },
  {
    id: "deal-002",
    title: "SAR 150 Off Spa Day Package",
    description: "Luxury relaxation session for two.",
    discountType: "fixed",
    discountValue: 150,
    originalPrice: 500,
    dealPrice: 350,
    status: "active",
    redemptions: 34,
    maxRedemptions: 50,
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    category: "Wellness",
    revenue: 11900,
  },
  {
    id: "deal-003",
    title: "Kids Summer Camp — Early Bird",
    description: "Full-week camp with activities and meals.",
    discountType: "percentage",
    discountValue: 25,
    originalPrice: 800,
    dealPrice: 600,
    status: "active",
    redemptions: 22,
    maxRedemptions: 100,
    startDate: "2026-05-10",
    endDate: "2026-07-15",
    category: "Education",
    revenue: 13200,
  },
  {
    id: "deal-004",
    title: "Restaurant Dine-In Voucher SAR 100",
    description: "Valid on all a-la-carte orders above SAR 250.",
    discountType: "fixed",
    discountValue: 100,
    originalPrice: 100,
    dealPrice: 60,
    status: "paused",
    redemptions: 115,
    maxRedemptions: 300,
    startDate: "2026-03-15",
    endDate: "2026-06-15",
    category: "Food & Beverage",
    revenue: 6900,
  },
  {
    id: "deal-005",
    title: "Gym Monthly Membership — 30% Off",
    description: "Access to all facilities and group classes.",
    discountType: "percentage",
    discountValue: 30,
    originalPrice: 300,
    dealPrice: 210,
    status: "active",
    redemptions: 54,
    maxRedemptions: null,
    startDate: "2026-04-15",
    endDate: null,
    category: "Fitness",
    revenue: 11340,
  },
  {
    id: "deal-006",
    title: "Hotel Weekend Getaway Package",
    description: "2-night stay with breakfast included.",
    discountType: "percentage",
    discountValue: 40,
    originalPrice: 1200,
    dealPrice: 720,
    status: "expired",
    redemptions: 0,
    maxRedemptions: 20,
    startDate: "2026-02-01",
    endDate: "2026-03-31",
    category: "Travel",
    revenue: 0,
  },
  {
    id: "deal-007",
    title: "Photography Session Package",
    description: "1-hour professional shoot with 20 edited photos.",
    discountType: "fixed",
    discountValue: 200,
    originalPrice: 700,
    dealPrice: 500,
    status: "draft",
    redemptions: 0,
    maxRedemptions: 30,
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    category: "Services",
    revenue: 0,
  },
];

export const orders: Order[] = [
  {
    id: "ord-0091",
    dealId: "deal-001",
    dealTitle: "50% Off Premium Coffee Bundle",
    customerName: "Ahmed Al-Rashid",
    customerEmail: "ahmed@example.com",
    amount: 100,
    status: "completed",
    date: "2026-05-16",
    redemptionCode: "COFFE-A9B2",
  },
  {
    id: "ord-0090",
    dealId: "deal-002",
    dealTitle: "SAR 150 Off Spa Day Package",
    customerName: "Fatima Hassan",
    customerEmail: "fatima@example.com",
    amount: 350,
    status: "completed",
    date: "2026-05-16",
    redemptionCode: "SPA-F3K7",
  },
  {
    id: "ord-0089",
    dealId: "deal-005",
    dealTitle: "Gym Monthly Membership — 30% Off",
    customerName: "Khalid Bin Saleh",
    customerEmail: "khalid@example.com",
    amount: 210,
    status: "pending",
    date: "2026-05-15",
    redemptionCode: "GYM-K1X9",
  },
  {
    id: "ord-0088",
    dealId: "deal-003",
    dealTitle: "Kids Summer Camp — Early Bird",
    customerName: "Nora Al-Qahtani",
    customerEmail: "nora@example.com",
    amount: 600,
    status: "completed",
    date: "2026-05-15",
    redemptionCode: "CAMP-N8W2",
  },
  {
    id: "ord-0087",
    dealId: "deal-001",
    dealTitle: "50% Off Premium Coffee Bundle",
    customerName: "Omar Al-Zahrani",
    customerEmail: "omar@example.com",
    amount: 100,
    status: "refunded",
    date: "2026-05-14",
    redemptionCode: "COFFE-O5M3",
  },
  {
    id: "ord-0086",
    dealId: "deal-002",
    dealTitle: "SAR 150 Off Spa Day Package",
    customerName: "Sara Mohammed",
    customerEmail: "sara@example.com",
    amount: 350,
    status: "completed",
    date: "2026-05-14",
    redemptionCode: "SPA-S2P1",
  },
  {
    id: "ord-0085",
    dealId: "deal-004",
    dealTitle: "Restaurant Dine-In Voucher SAR 100",
    customerName: "Youssef Al-Otaibi",
    customerEmail: "youssef@example.com",
    amount: 60,
    status: "completed",
    date: "2026-05-13",
    redemptionCode: "REST-Y7C4",
  },
  {
    id: "ord-0084",
    dealId: "deal-005",
    dealTitle: "Gym Monthly Membership — 30% Off",
    customerName: "Layla Al-Ghamdi",
    customerEmail: "layla@example.com",
    amount: 210,
    status: "cancelled",
    date: "2026-05-13",
    redemptionCode: "GYM-L4D6",
  },
  {
    id: "ord-0083",
    dealId: "deal-003",
    dealTitle: "Kids Summer Camp — Early Bird",
    customerName: "Rayan Al-Mutairi",
    customerEmail: "rayan@example.com",
    amount: 600,
    status: "completed",
    date: "2026-05-12",
    redemptionCode: "CAMP-R9E1",
  },
  {
    id: "ord-0082",
    dealId: "deal-001",
    dealTitle: "50% Off Premium Coffee Bundle",
    customerName: "Hessa Al-Dossari",
    customerEmail: "hessa@example.com",
    amount: 100,
    status: "completed",
    date: "2026-05-12",
    redemptionCode: "COFFE-H3T8",
  },
];
