import type { Prisma, Status, Task } from "@prisma/client";
import type { TasksRepository } from "../tasks-repository";
import { randomUUID } from "node:crypto";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      status: data.status ?? "TODO",
      created_at: new Date(),
      updated_at: new Date(),
      user_id: data.user_id,
    };

    this.items.push(task);

    return task;
  }

  async update(data: Prisma.TaskUncheckedUpdateInput) {
    const taskIndex = this.items.findIndex((task) => task.id === data.id);

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const task = {
      ...this.items[taskIndex],
      ...(data.title && { title: data.title as string }),
      ...(data.description && { description: data.description as string }),
      ...(data.status && { status: data.status as Status }),
      ...(data.user_id && { user_id: data.user_id as string }),
      updated_at: new Date(),
    };

    this.items[taskIndex] = task;

    return task;
  }

  async delete(id: string) {
    const taskIndex = this.items.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    this.items.splice(taskIndex, 1);

    return null;
  }
}
