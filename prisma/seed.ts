import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const equipment = [
  {
    name: "Sony FX6 Cinema Camera",
    category: "Camera",
    description: "Full-frame 4K cinema camera with dual base ISO.",
    dailyRate: 175,
  },
  {
    name: "Canon RF 24-70mm f/2.8",
    category: "Lens",
    description: "Versatile zoom lens for interviews and events.",
    dailyRate: 65,
  },
  {
    name: "Sennheiser MKH 416",
    category: "Audio",
    description: "Industry-standard shotgun microphone.",
    dailyRate: 35,
  },
  {
    name: "Aputure 600d Pro",
    category: "Lighting",
    description: "Daylight LED fixture with Bowens mount.",
    dailyRate: 85,
  },
  {
    name: "DJI Ronin RS3 Pro",
    category: "Stabilizer",
    description: "3-axis gimbal for cinema cameras.",
    dailyRate: 55,
  },
];

async function main() {
  const existing = await prisma.equipment.count();
  if (existing > 0) {
    console.log(`Database already seeded with ${existing} equipment items`);
    return;
  }

  await prisma.equipment.createMany({ data: equipment });
  console.log(`Seeded ${equipment.length} equipment items`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
