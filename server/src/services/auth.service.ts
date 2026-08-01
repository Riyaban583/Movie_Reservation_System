import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

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
}