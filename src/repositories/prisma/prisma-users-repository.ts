import { prisma } from "@/lib/prisma";
import type { UsersRepository } from "../users-repository";
import type { Prisma } from "@prisma/client";
import type { UserProps } from "@/@types/user";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async update(data: UserProps) {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return user;
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return null;
  }
}
