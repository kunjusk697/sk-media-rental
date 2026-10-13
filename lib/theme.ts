/** Curated card backdrop tints (reference: green / mustard panels). */
export const CURATED_TINTS = [
  "bg-forest",
  "bg-gold",
  "bg-forest-dark",
  "bg-gold-muted",
] as const;

export function curatedTint(index: number) {
  return CURATED_TINTS[index % CURATED_TINTS.length];
}
