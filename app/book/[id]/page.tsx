import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BookForm from "./BookForm";

export const dynamic = "force-dynamic";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const equipment = await prisma.equipment.findUnique({
    where: { id: Number(id) },
  });

  if (!equipment) {
    notFound();
  }

  return <BookForm params={{ id }} equipment={equipment} />;
}
