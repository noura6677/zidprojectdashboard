import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Deal Maker AI — صانع الصفقات",
  description:
    "محرّك مبيعات ذكي يعمل داخل متجرك لرفع متوسط قيمة السلة وتحويل العميل إلى تجربة شراء متكاملة.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
