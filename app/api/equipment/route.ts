import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const equipment = await prisma.equipment.findMany({
    orderBy: { category: "asc" },
  });

  return NextResponse.json(equipment);
}
