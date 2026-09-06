import type { Metadata } from "next";
import Link from "next/link";
import { MainBookingWhatsApp } from "@/components/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "SK Media Rental",
  description: "Camera and equipment rental catalog and business ledger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              SK Media Rental
            </Link>
            <nav>
              <Link href="/">Catalog</Link>
              <Link href="/admin">Admin</Link>
              <MainBookingWhatsApp />
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
