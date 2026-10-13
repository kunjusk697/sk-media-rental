import { FACE_MODELS, PRODUCTS, type Product } from "@/data/products";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "lens-fitting"
  | "dispatched"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "upi" | "cod" | "bank";

export type ExpenseCategory =
  | "stock"
  | "packaging"
  | "shipping"
  | "marketing"
  | "other";

export interface CategoryRecord {
  id: string;
  label: string;
  shortLabel: string;
  subtitle: string;
  image: string;
  tags: string[];
}

export interface ProductRecord extends Product {
  stock: number;
  stockAlertAt: number;
  gender: "unisex" | "men" | "women";
  tags: string[];
  blueCut: boolean;
  reviewsCount: number;
}

export interface FaceModelRecord {
  id: string;
  name: string;
  tone: string;
  gender: string;
  image: string;
  overlay: Product["tryOnOverlay"];
}

export interface OrderRecord {
  id: string;
  customerName: string;
  phone: string;
  productId: string;
  productName: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  powerRequirement?: string;
  notes?: string;
  source: "whatsapp";
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseRecord {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  paymentMethod: PaymentMethod;
  date: string;
  notes?: string;
}

export interface RoyalMockDb {
  categories: CategoryRecord[];
  products: ProductRecord[];
  faceModels: FaceModelRecord[];
  orders: OrderRecord[];
  expenses: ExpenseRecord[];
}

const defaultCategories: CategoryRecord[] = [
  {
    id: "classic",
    label: "Classic Eyeglasses",
    shortLabel: "Classic",
    subtitle: "Everyday elegance",
    image:
      "https://images.unsplash.com/photo-1591076482161-42ce6a69a711?auto=format&fit=crop&w=200&q=80",
    tags: ["everyday", "optical"],
  },
  {
    id: "sunglasses",
    label: "Sunglasses",
    shortLabel: "Sun",
    subtitle: "UV-ready styles",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=200&q=80",
    tags: ["uv", "outdoor"],
  },
  {
    id: "blue-cut",
    label: "Blue-Cut / Computer",
    shortLabel: "Blue-Cut",
    subtitle: "Screen comfort",
    image:
      "https://images.unsplash.com/photo-1622519407650-3df1afb5e4f0?auto=format&fit=crop&w=200&q=80",
    tags: ["blue-cut", "office"],
  },
  {
    id: "titanium",
    label: "Premium Titanium",
    shortLabel: "Titanium",
    subtitle: "Featherlight",
    image:
      "https://images.unsplash.com/photo-1577806933647-7e740a185bf0?auto=format&fit=crop&w=200&q=80",
    tags: ["premium", "lightweight"],
  },
  {
    id: "unisex",
    label: "Unisex Frames",
    shortLabel: "Unisex",
    subtitle: "Balanced fits",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    tags: ["unisex"],
  },
];

function toProductRecord(p: Product): ProductRecord {
  return {
    ...p,
    stock: p.badge === "Bestseller" ? 8 : 14,
    stockAlertAt: 5,
    gender:
      p.category === "unisex" ? "unisex" : p.shape === "cat-eye" ? "women" : "unisex",
    tags: [p.shape, p.material],
    blueCut: p.category === "blue-cut" || p.lensOptions.includes("zero-blue"),
    reviewsCount: 18 + (p.id.length % 25),
  };
}

const seedOrders: OrderRecord[] = [
  {
    id: "ord-1001",
    customerName: "Ananya Nair",
    phone: "919876543210",
    productId: "royal-obsidian-round",
    productName: "Obsidian Round",
    amount: 3490,
    status: "new",
    paymentMethod: "upi",
    powerRequirement: "-1.25 both eyes",
    source: "whatsapp",
    createdAt: "2026-10-12T10:30:00.000Z",
    updatedAt: "2026-10-12T10:30:00.000Z",
  },
  {
    id: "ord-1002",
    customerName: "Rahul Menon",
    phone: "919944556677",
    productId: "royal-titanium-line",
    productName: "Titan Edge",
    amount: 5890,
    status: "confirmed",
    paymentMethod: "bank",
    source: "whatsapp",
    createdAt: "2026-10-11T14:00:00.000Z",
    updatedAt: "2026-10-11T16:20:00.000Z",
  },
  {
    id: "ord-1003",
    customerName: "Sneha Paul",
    phone: "919933221100",
    productId: "royal-cateye-rose",
    productName: "Velvet Cat-Eye",
    amount: 3790,
    status: "dispatched",
    paymentMethod: "cod",
    source: "whatsapp",
    createdAt: "2026-10-08T09:15:00.000Z",
    updatedAt: "2026-10-10T11:00:00.000Z",
  },
];

const seedExpenses: ExpenseRecord[] = [
  {
    id: "exp-1",
    title: "Acetate frame stock — Q4",
    category: "stock",
    amount: 45000,
    paymentMethod: "bank",
    date: "2026-10-01",
  },
  {
    id: "exp-2",
    title: "Instagram ads",
    category: "marketing",
    amount: 8500,
    paymentMethod: "upi",
    date: "2026-10-05",
  },
  {
    id: "exp-3",
    title: "Courier packaging",
    category: "packaging",
    amount: 3200,
    paymentMethod: "upi",
    date: "2026-10-09",
  },
];

export const initialMockDb: RoyalMockDb = {
  categories: defaultCategories,
  products: PRODUCTS.map(toProductRecord),
  faceModels: FACE_MODELS.map((f) => ({
    ...f,
    overlay: {
      front: { scale: 0.6, offsetY: 36, offsetX: 0 },
      angled: { scale: 0.56, offsetY: 38, offsetX: 4, rotate: -8 },
    },
  })),
  orders: seedOrders,
  expenses: seedExpenses,
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "New Inquiries",
  confirmed: "Confirmed",
  "lens-fitting": "Lens Fitting",
  dispatched: "Dispatched",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  upi: "UPI / GPay",
  cod: "Cash on Delivery",
  bank: "Bank Transfer",
};
