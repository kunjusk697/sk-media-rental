import { ProductDetail } from "@/components/product/ProductDetail";
import { MobileShell } from "@/components/layout/MobileShell";
import { getProductById } from "@/data/products";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <MobileShell>
      <ProductDetail product={product} />
    </MobileShell>
  );
}
