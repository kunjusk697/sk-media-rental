import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: { equipment: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { equipmentId, customerName, customerEmail, startDate, endDate } = body;

  if (!equipmentId || !customerName || !customerEmail || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required booking fields" },
      { status: 400 },
    );
  }

  const equipment = await prisma.equipment.findUnique({
    where: { id: Number(equipmentId) },
  });

  if (!equipment || !equipment.available) {
    return NextResponse.json(
      { error: "Equipment is not available" },
      { status: 404 },
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const totalAmount = days * equipment.dailyRate;

  const booking = await prisma.booking.create({
    data: {
      equipmentId: equipment.id,
      customerName,
      customerEmail,
      startDate: start,
      endDate: end,
      totalAmount,
      status: "confirmed",
    },
    include: { equipment: true },
  });

  return NextResponse.json(booking, { status: 201 });
}
