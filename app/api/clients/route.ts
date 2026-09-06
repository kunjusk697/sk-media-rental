import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone } = body;

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 400 },
    );
  }

  const client = await prisma.client.create({
    data: { name, phone },
  });

  return NextResponse.json(client, { status: 201 });
}
