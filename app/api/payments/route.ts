import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { clientId, amount, note, paidAt } = body;

  if (!clientId || !amount || !paidAt) {
    return NextResponse.json(
      { error: "Client, amount, and payment date are required" },
      { status: 400 },
    );
  }

  const client = await prisma.client.findUnique({
    where: { id: Number(clientId) },
  });

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const payment = await prisma.payment.create({
    data: {
      clientId: client.id,
      amount: Number(amount),
      note: note || null,
      paidAt: new Date(paidAt),
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
