import type { Prisma, Task } from "@prisma/client";
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
}
