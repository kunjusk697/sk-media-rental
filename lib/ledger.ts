import { prisma } from "@/lib/prisma";

export async function getClientLedger(clientId: number) {
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: {
      bookings: {
        include: { items: { include: { equipment: true } } },
        orderBy: { createdAt: "desc" },
      },
      payments: { orderBy: { paidAt: "desc" } },
    },
  });

  if (!client) {
    return null;
  }

  const totalBooked = client.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const totalPaid = client.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const balanceDue = totalBooked - totalPaid;

  return {
    client,
    totalBooked,
    totalPaid,
    balanceDue,
  };
}

export async function getFinanceSummary() {
  const bookings = await prisma.booking.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });
  const payments = await prisma.payment.findMany({
    include: { client: true },
    orderBy: { paidAt: "desc" },
  });

  const totalBooked = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const totalCollected = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const outstanding = totalBooked - totalCollected;

  const monthly = new Map<string, number>();
  const yearly = new Map<string, number>();

  for (const payment of payments) {
    const monthKey = payment.paidAt.toISOString().slice(0, 7);
    const yearKey = payment.paidAt.getFullYear().toString();
    monthly.set(monthKey, (monthly.get(monthKey) ?? 0) + payment.amount);
    yearly.set(yearKey, (yearly.get(yearKey) ?? 0) + payment.amount);
  }

  return {
    bookings,
    payments,
    totalBooked,
    totalCollected,
    outstanding,
    monthly: [...monthly.entries()].sort((a, b) => b[0].localeCompare(a[0])),
    yearly: [...yearly.entries()].sort((a, b) => b[0].localeCompare(a[0])),
  };
}
