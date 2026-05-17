"use client";

import { useState } from "react";
import { Save, Store, CreditCard, Bell, Globe, Shield } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SECTIONS = [
  { id: "profile", label: "Merchant Profile", icon: Store },
  { id: "billing", label: "Billing & Plan", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "security", label: "Security", icon: Shield },
];

function ProfileSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>Public-facing details for your merchant profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-100 text-2xl font-bold text-indigo-600">
              MM
            </div>
            <div>
              <Button variant="outline" size="sm">Upload logo</Button>
              <p className="mt-1.5 text-xs text-gray-400">PNG or JPG. Max 2MB.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Store Name</label>
              <Input defaultValue="My Merchant" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Input defaultValue="Food & Beverage" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Contact Email</label>
              <Input type="email" defaultValue="merchant@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <Input type="tel" defaultValue="+966 50 123 4567" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <Input defaultValue="King Fahd Road, Riyadh, Saudi Arabia" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4" />
              Save changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>Legal and tax information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Commercial Register No.</label>
              <Input defaultValue="1010XXXXXX" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">VAT Number</label>
              <Input defaultValue="300XXXXXXXXX003" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4" />
              Save changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BillingSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-indigo-900">Pro Plan</p>
                <Badge>Active</Badge>
              </div>
              <p className="mt-1 text-sm text-indigo-700">
                SAR 299 / month — Up to 20 active deals, unlimited orders
              </p>
              <p className="mt-2 text-xs text-indigo-500">Next billing: June 1, 2026</p>
            </div>
            <Button variant="outline" size="sm">Change plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Card on file for billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded border border-gray-200 bg-gray-50 text-xs font-bold text-gray-600">
                VISA
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-xs text-gray-400">Expires 08 / 2027</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="pb-3 font-medium text-gray-500">Date</th>
                <th className="pb-3 font-medium text-gray-500">Plan</th>
                <th className="pb-3 font-medium text-gray-500">Amount</th>
                <th className="pb-3 font-medium text-gray-500">Status</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { date: "May 1, 2026", plan: "Pro Plan", amount: "SAR 299", status: "paid" },
                { date: "Apr 1, 2026", plan: "Pro Plan", amount: "SAR 299", status: "paid" },
                { date: "Mar 1, 2026", plan: "Pro Plan", amount: "SAR 299", status: "paid" },
              ].map((inv) => (
                <tr key={inv.date}>
                  <td className="py-3 text-gray-700">{inv.date}</td>
                  <td className="py-3 text-gray-700">{inv.plan}</td>
                  <td className="py-3 font-medium text-gray-900">{inv.amount}</td>
                  <td className="py-3">
                    <Badge variant="success">{inv.status}</Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm">Download</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked((c) => !c)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        checked ? "bg-indigo-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function NotificationsSection() {
  const notifs = [
    { label: "New order placed", description: "Email when a customer purchases one of your deals", defaultOn: true },
    { label: "Deal about to expire", description: "Reminder 3 days before a deal expires", defaultOn: true },
    { label: "Deal sold out", description: "Alert when a deal reaches its redemption limit", defaultOn: true },
    { label: "Weekly summary", description: "A weekly digest of your performance metrics", defaultOn: false },
    { label: "Refund processed", description: "Notification when a refund is issued", defaultOn: true },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
        <CardDescription>Choose what you get notified about</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-100">
          {notifs.map((n) => (
            <li key={n.label} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{n.label}</p>
                <p className="text-xs text-gray-400">{n.description}</p>
              </div>
              <Toggle defaultChecked={n.defaultOn} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function IntegrationsSection() {
  const integrations = [
    { name: "Zid Store", description: "Connect your Zid storefront to sync products", connected: true },
    { name: "WhatsApp Business", description: "Send order confirmations via WhatsApp", connected: false },
    { name: "Google Analytics", description: "Track deal performance with GA4", connected: false },
    { name: "Moyasar Payments", description: "Accept MADA, Visa & Apple Pay", connected: true },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect third-party services</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-100">
          {integrations.map((i) => (
            <li key={i.name} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{i.name}</p>
                <p className="text-xs text-gray-400">{i.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {i.connected && <Badge variant="success">Connected</Badge>}
                <Button variant={i.connected ? "outline" : "default"} size="sm">
                  {i.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Current password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">New password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Confirm new password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="flex justify-end">
            <Button>Update password</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Authenticator app</p>
            <p className="text-xs text-gray-400">Not enabled</p>
          </div>
          <Button variant="outline" size="sm">Enable 2FA</Button>
        </CardContent>
      </Card>
    </div>
  );
}

const SECTION_CONTENT: Record<string, React.ReactNode> = {
  profile: <ProfileSection />,
  billing: <BillingSection />,
  notifications: <NotificationsSection />,
  integrations: <IntegrationsSection />,
  security: <SecuritySection />,
};

export default function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <>
      <Header title="Settings" description="Manage your merchant account" />
      <div className="flex gap-0 p-6">
        {/* Side nav */}
        <nav className="mr-8 w-52 shrink-0">
          <ul className="space-y-0.5">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => setActive(id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active === id
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="min-w-0 flex-1">{SECTION_CONTENT[active]}</div>
      </div>
    </>
  );
}
