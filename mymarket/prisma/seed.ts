import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.deleteMany();
  await prisma.address.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      surname: "",
      email: "admin@o2.pl",
      password: process.env.ADMIN_PASSOWRD!,
      role: "ADMIN",
      address: {
        create: {
          City: "Administrator systemu",
        },
      },
    },
    include: {
      address: true,
    },
  });
  console.log("Created user", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
