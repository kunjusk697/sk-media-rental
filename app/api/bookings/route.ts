import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingDays } from "@/lib/format";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      client: true,
      items: { include: { equipment: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { clientId, equipmentId, quantity, startDate, endDate } = body;

  if (!clientId || !equipmentId || !quantity || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required booking fields" },
      { status: 400 },
    );
  }

  const [client, equipment] = await Promise.all([
    prisma.client.findUnique({ where: { id: Number(clientId) } }),
    prisma.equipment.findUnique({ where: { id: Number(equipmentId) } }),
  ]);

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  if (!equipment || !equipment.available) {
    return NextResponse.json(
      { error: "Equipment is not available" },
      { status: 404 },
    );
  }

  if (Number(quantity) > equipment.quantity) {
    return NextResponse.json(
      { error: `Only ${equipment.quantity} units available` },
      { status: 400 },
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = bookingDays(start, end);
  const subtotal = days * equipment.dailyRate * Number(quantity);

  const booking = await prisma.booking.create({
    data: {
      clientId: client.id,
      startDate: start,
      endDate: end,
      totalAmount: subtotal,
      status: "confirmed",
      items: {
        create: {
          equipmentId: equipment.id,
          quantity: Number(quantity),
          dailyRate: equipment.dailyRate,
          days,
          subtotal,
        },
      },
    },
    include: {
      client: true,
      items: { include: { equipment: true } },
    },
  });

  return NextResponse.json(booking, { status: 201 });
}
