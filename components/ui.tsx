import Link from "next/link";
import {
  WHATSAPP_NUMBER,
  bookingWhatsAppMessage,
  formatInr,
  whatsappUrl,
} from "@/lib/format";

export function ContactButtons({
  phone,
  whatsappMessage,
}: {
  phone: string;
  whatsappMessage?: string;
}) {
  return (
    <div className="contact-actions">
      <a
        className="btn btn-whatsapp"
        href={whatsappUrl(phone, whatsappMessage)}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <a className="btn btn-call" href={`tel:+${phone.replace(/\D/g, "")}`}>
        Call
      </a>
    </div>
  );
}

export function MainBookingWhatsApp() {
  const message = bookingWhatsAppMessage("equipment");
  return (
    <a
      className="btn btn-whatsapp"
      href={whatsappUrl(WHATSAPP_NUMBER, message)}
      target="_blank"
      rel="noreferrer"
    >
      Book via WhatsApp
    </a>
  );
}

export function PriceTag({ amount }: { amount: number }) {
  return <div className="price">{formatInr(amount)}/day</div>;
}

export function AdminNav({ active }: { active?: string }) {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/clients", label: "Clients" },
    { href: "/admin/finance", label: "Finance" },
  ];

  return (
    <nav>
      <Link href="/">Catalog</Link>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={active === link.href ? "active" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
