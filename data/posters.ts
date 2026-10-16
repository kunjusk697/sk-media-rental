export type PosterSlide =
  | {
      kind: "promo";
      id: string;
      title: string;
      highlight: string;
      subtitle: string;
      ctaLabel: string;
      ctaHref: string;
      image: string;
      variant: "forest" | "gold";
    }
  | {
      kind: "image";
      id: string;
      src: string;
      alt: string;
      href?: string;
    };

/** Home hero posters — add files under `public/posters/` and extend this list. */
export const POSTER_SLIDES: PosterSlide[] = [
  {
    kind: "promo",
    id: "new-collections",
    highlight: "30% OFF",
    title: "New collections",
    subtitle: "Signature frames for every face",
    ctaLabel: "Order Now",
    ctaHref: "/catalog",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    variant: "forest",
  },
  {
    kind: "promo",
    id: "virtual-tryon",
    highlight: "AI TRY-ON",
    title: "See before you buy",
    subtitle: "Switch models and frames in seconds",
    ctaLabel: "Start Try-On",
    ctaHref: "/try-on",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    variant: "gold",
  },
  {
    kind: "image",
    id: "brand-poster",
    src: "/posters/royol-brand-poster.png",
    alt: "Royol Opticals brand poster",
    href: "/catalog",
  },
];
