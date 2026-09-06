import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const equipment = [
  {
    name: "Sony M4 Body",
    category: "Camera",
    description: "Sony mirrorless camera body for professional video and photo production.",
    dailyRate: 2000,
    quantity: 1,
  },
  {
    name: "Sony 50mm Lens",
    category: "Lens",
    description: "Fast 50mm prime lens ideal for portraits and interviews.",
    dailyRate: 1000,
    quantity: 3,
  },
  {
    name: "Sigma 85mm Lens",
    category: "Lens",
    description: "85mm portrait lens with smooth bokeh and sharp rendering.",
    dailyRate: 500,
    quantity: 1,
  },
  {
    name: "Sigma 35mm Lens",
    category: "Lens",
    description: "Versatile 35mm lens for events, vlogs, and run-and-gun shoots.",
    dailyRate: 500,
    quantity: 1,
  },
  {
    name: "Hollyland Microphone",
    category: "Audio",
    description: "Wireless microphone system for clear on-location audio.",
    dailyRate: 400,
    quantity: 1,
  },
  {
    name: "Godox AD200 Light",
    category: "Lighting",
    description: "Portable strobe light for studio and outdoor lighting setups.",
    dailyRate: 400,
    quantity: 2,
  },
  {
    name: "DJI Ronin S3 Gimbal",
    category: "Stabilizer",
    description: "3-axis gimbal stabilizer for smooth cinematic camera movement.",
    dailyRate: 500,
    quantity: 1,
  },
];

async function main() {
  for (const item of equipment) {
    await prisma.equipment.upsert({
      where: { name: item.name },
      update: item,
      create: item,
    });
  }

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
