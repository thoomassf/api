import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async update(data: Prisma.UserUpdateInput) {
    const userIndex = this.items.findIndex((item) => item.id === data.id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const user = {
      ...this.items[userIndex],
      ...(data.name && { name: data.name as string }),
      ...(data.email && { email: data.email as string }),
      ...(data.password_hash && {
        password_hash: data.password_hash as string,
      }),
      updated_at: new Date(),
    };

    this.items[userIndex] = user;

    return user;
  }
}
