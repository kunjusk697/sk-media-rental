export const WHATSAPP_NUMBER = "919946732958";
export const WHATSAPP_DISPLAY = "+91 9946732958";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productInquiryMessage(
  productName: string,
  price: number,
  color?: string,
  lens?: string,
) {
  const parts = [
    `Hi Royal Specs, I am interested in the ${productName} (₹${price.toLocaleString("en-IN")}).`,
  ];
  if (color) parts.push(`Frame color: ${color}.`);
  if (lens) parts.push(`Lens option: ${lens}.`);
  parts.push("Please share availability and delivery options.");
  return parts.join(" ");
}
