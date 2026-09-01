import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SK Media Rental",
  description: "Media equipment rental catalog and bookings",
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
            <a href="/" className="brand">
              SK Media Rental
            </a>
            <nav>
              <a href="/">Catalog</a>
              <a href="/admin">Admin</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
