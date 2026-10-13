export type FrameShape = "round" | "aviator" | "cat-eye" | "square";
export type FrameMaterial = "acetate" | "metal" | "titanium" | "tr90";
export type ProductCategory =
  | "classic"
  | "sunglasses"
  | "blue-cut"
  | "titanium"
  | "unisex";

export type LensOption = "single-vision" | "zero-blue" | "progressive";

export interface TryOnOverlay {
  front: { scale: number; offsetY: number; offsetX: number };
  angled: { scale: number; offsetY: number; offsetX: number; rotate: number };
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shape: FrameShape;
  material: FrameMaterial;
  price: number;
  badge?: string;
  description: string;
  frameDimensions: string;
  colors: { id: string; name: string; hex: string }[];
  images: string[];
  frameImage: string;
  tryOnOverlay: TryOnOverlay;
  lensOptions: LensOption[];
}

export interface FaceModel {
  id: string;
  name: string;
  tone: string;
  gender: string;
  image: string;
}

export const CATEGORIES: {
  id: ProductCategory;
  label: string;
  subtitle: string;
}[] = [
  { id: "classic", label: "Classic Eyeglasses", subtitle: "Everyday elegance" },
  { id: "sunglasses", label: "Sunglasses", subtitle: "UV-ready styles" },
  { id: "blue-cut", label: "Blue-Cut", subtitle: "Screen comfort" },
  { id: "titanium", label: "Premium Titanium", subtitle: "Featherlight" },
  { id: "unisex", label: "Unisex Frames", subtitle: "Balanced fits" },
];

export const SHAPE_FILTERS: { id: FrameShape | "all"; label: string }[] = [
  { id: "all", label: "All shapes" },
  { id: "round", label: "Round" },
  { id: "aviator", label: "Aviator" },
  { id: "cat-eye", label: "Cat-Eye" },
  { id: "square", label: "Square" },
];

export const MATERIAL_FILTERS: { id: FrameMaterial | "all"; label: string }[] =
  [
    { id: "all", label: "All materials" },
    { id: "acetate", label: "Acetate" },
    { id: "metal", label: "Metal" },
    { id: "titanium", label: "Titanium" },
    { id: "tr90", label: "TR90" },
  ];

export const LENS_LABELS: Record<LensOption, string> = {
  "single-vision": "Single Vision",
  "zero-blue": "Zero Power Blue Block",
  progressive: "Progressive",
};

export const FACE_MODELS: FaceModel[] = [
  {
    id: "maya",
    name: "Maya",
    tone: "Warm medium",
    gender: "Feminine",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "arjun",
    name: "Arjun",
    tone: "Deep neutral",
    gender: "Masculine",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "lena",
    name: "Lena",
    tone: "Fair cool",
    gender: "Feminine",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "noah",
    name: "Noah",
    tone: "Olive warm",
    gender: "Masculine",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  },
];

const frameOverlay = (
  scale = 0.62,
  offsetY = 38,
): TryOnOverlay => ({
  front: { scale, offsetY, offsetX: 0 },
  angled: { scale: scale * 0.94, offsetY: offsetY + 2, offsetX: 4, rotate: -8 },
});

export const PRODUCTS: Product[] = [
  {
    id: "royal-obsidian-round",
    name: "Obsidian Round",
    category: "classic",
    shape: "round",
    material: "acetate",
    price: 3490,
    badge: "Bestseller",
    description:
      "Hand-polished acetate rounds with a slim bridge for soft, intellectual silhouettes.",
    frameDimensions: "Lens 49 · Bridge 20 · Temple 145",
    colors: [
      { id: "charcoal", name: "Charcoal", hex: "#2b2b2b" },
      { id: "sand", name: "Sand", hex: "#d8cfc0" },
    ],
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    ],
    frameImage:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    tryOnOverlay: frameOverlay(0.58, 36),
    lensOptions: ["single-vision", "zero-blue", "progressive"],
  },
  {
    id: "royal-aviator-gold",
    name: "Monarch Aviator",
    category: "sunglasses",
    shape: "aviator",
    material: "metal",
    price: 4290,
    badge: "Polarized",
    description:
      "Double-bridge aviators with gradient lenses and brushed gold temples.",
    frameDimensions: "Lens 56 · Bridge 16 · Temple 140",
    colors: [{ id: "gold", name: "Brushed Gold", hex: "#c9a227" }],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1572635196233-1594122230759?auto=format&fit=crop&w=1200&q=80",
    ],
    frameImage:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    tryOnOverlay: frameOverlay(0.64, 34),
    lensOptions: ["single-vision", "zero-blue"],
  },
  {
    id: "royal-bluecut-square",
    name: "Focus Square Blue-Cut",
    category: "blue-cut",
    shape: "square",
    material: "tr90",
    price: 2990,
    description:
      "Featherweight TR90 squares with premium blue-light filtering for long screen days.",
    frameDimensions: "Lens 52 · Bridge 18 · Temple 142",
    colors: [
      { id: "graphite", name: "Graphite", hex: "#3d3d3d" },
      { id: "navy", name: "Midnight Navy", hex: "#1e2a44" },
    ],
    images: [
      "https://images.unsplash.com/photo-1622519407650-3df1afb5e4f0?auto=format&fit=crop&w=1200&q=80",
    ],
    frameImage:
      "https://images.unsplash.com/photo-1622519407650-3df1afb5e4f0?auto=format&fit=crop&w=800&q=80",
    tryOnOverlay: frameOverlay(0.6, 37),
    lensOptions: ["zero-blue", "single-vision"],
  },
  {
    id: "royal-titanium-line",
    name: "Titan Edge",
    category: "titanium",
    shape: "square",
    material: "titanium",
    price: 5890,
    badge: "Premium",
    description:
      "Japanese beta-titanium architecture with flexible hinges and matte charcoal finish.",
    frameDimensions: "Lens 50 · Bridge 19 · Temple 143",
    colors: [{ id: "matte-black", name: "Matte Black", hex: "#1a1a1a" }],
    images: [
      "https://images.unsplash.com/photo-1577806933647-7e740a185bf0?auto=format&fit=crop&w=1200&q=80",
    ],
    frameImage:
      "https://images.unsplash.com/photo-1577806933647-7e740a185bf0?auto=format&fit=crop&w=800&q=80",
    tryOnOverlay: frameOverlay(0.57, 35),
    lensOptions: ["single-vision", "progressive"],
  },
  {
    id: "royal-cateye-rose",
    name: "Velvet Cat-Eye",
    category: "unisex",
    shape: "cat-eye",
    material: "acetate",
    price: 3790,
    description:
      "Sculpted cat-eye with lifted outer corners and translucent rose acetate.",
    frameDimensions: "Lens 51 · Bridge 19 · Temple 145",
    colors: [
      { id: "rose", name: "Rose Quartz", hex: "#e8c4c4" },
      { id: "smoke", name: "Smoke", hex: "#6b6b6b" },
    ],
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6a69a711?auto=format&fit=crop&w=1200&q=80",
    ],
    frameImage:
      "https://images.unsplash.com/photo-1591076482161-42ce6a69a711?auto=format&fit=crop&w=800&q=80",
    tryOnOverlay: frameOverlay(0.59, 35),
    lensOptions: ["single-vision", "zero-blue", "progressive"],
  },
  {
    id: "royal-unisex-aviator",
    name: "Harbor Aviator",
    category: "unisex",
    shape: "aviator",
    material: "metal",
    price: 3190,
    description:
      "Lightweight unisex aviator with adjustable nose pads and soft matte gunmetal.",
    frameDimensions: "Lens 54 · Bridge 17 · Temple 141",
    colors: [{ id: "gunmetal", name: "Gunmetal", hex: "#5c5f66" }],
    images: [
      "https://images.unsplash.com/photo-1572635196233-1594122230759?auto=format&fit=crop&w=1200&q=80",
    ],
    frameImage:
      "https://images.unsplash.com/photo-1572635196233-1594122230759?auto=format&fit=crop&w=800&q=80",
    tryOnOverlay: frameOverlay(0.63, 33),
    lensOptions: ["single-vision", "zero-blue"],
  },
];

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
