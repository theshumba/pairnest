const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.nest.findUnique({ where: { code: "PAIRNEST" } });
  if (existing) {
    console.log("Seed already exists.");
    return;
  }

  const nest = await prisma.nest.create({
    data: {
      code: "PAIRNEST",
      biomeId: "cloud_loft",
      name: "Our Nest",
      settings: JSON.stringify({ promptDepth: "light" }),
    },
  });

  const a = await prisma.user.create({ data: { email: "a@demo.io" } });
  const b = await prisma.user.create({ data: { email: "b@demo.io" } });

  await prisma.nestMember.createMany({
    data: [
      { nestId: nest.id, userId: a.id, role: "member" },
      { nestId: nest.id, userId: b.id, role: "member" },
    ],
  });

  await prisma.nestPlant.create({
    data: { nestId: nest.id, plantKey: "fern", stage: "seed", streakDays: 0 },
  });

  console.log("Seeded:", { nest: nest.code, a: a.email, b: b.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
