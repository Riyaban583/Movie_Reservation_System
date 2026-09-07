const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  console.log("Checking admin account...");

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`Found user: ${existingUser.email}`);
    console.log(`Current role: ${existingUser.role}`);

    if (existingUser.role !== "ADMIN") {
      await prisma.user.update({
        where: { email },
        data: { role: "ADMIN" },
      });

      console.log("✅ Existing user promoted to ADMIN");
    } else {
      console.log("✅ User is already ADMIN");
    }

    return;
  }

  console.log("User not found. Creating new ADMIN user...");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✅ New ADMIN user created: ${user.email}`);
}

main()
  .catch((error) => {
    console.error("❌ Admin setup failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });