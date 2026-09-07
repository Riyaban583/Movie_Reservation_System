const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;

  if (!email) {
    throw new Error("ADMIN_EMAIL environment variable is required");
  }

  const user = await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
  });

  console.log(`✅ Admin role assigned to: ${user.email}`);
}

main()
  .catch((error) => {
    console.error("❌ Admin promotion failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });