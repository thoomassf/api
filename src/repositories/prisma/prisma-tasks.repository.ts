import type { Prisma } from "@prisma/client";
import type { TasksRepository } from "../tasks-repository";
import { prisma } from "@/lib/prisma";
import type { TaskProps } from "@/@types/task";

export class PrismaTasksRepository implements TasksRepository {
  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    return task;
  }

  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = await prisma.task.create({
      data,
    });

    return task;
  }

  async update(data: TaskProps) {
    const task = await prisma.task.update({
      where: {
        id: data.id,
      },
      data,
    });

    return task;
  }

  async delete(id: string) {
    await prisma.task.delete({
      where: {
        id,
      },
    });

    return null;
  }
}
