import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  async checkUserExists(email: string) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return existingUser;
  }

  async register(data: RegisterUserData) {
    const existingUser = await this.checkUserExists(data.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return user;
  }

  // 👇 Ye method yahan add hoga
  async login(email: string, password: string) {
    const user = await this.checkUserExists(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
  password,
  user.password
);

if (!isPasswordValid) {
  throw new Error("Invalid email or password");
}

const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET as string,
  {
    expiresIn: "7d",
  }
);
    const { password: _, ...userWithoutPassword } = user;

return {
  user: userWithoutPassword,
  token,
};
  }
}