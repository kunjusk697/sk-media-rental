export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function whatsappUrl(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function callUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits}`;
}

export function bookingDays(startDate: Date, endDate: Date): number {
  return Math.max(
    1,
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
  );
}

export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER ?? "919876543210";

export function bookingWhatsAppMessage(equipmentName: string): string {
  return `Hi, I would like to book the ${equipmentName} from SK Media Rental. Please share availability.`;
}
