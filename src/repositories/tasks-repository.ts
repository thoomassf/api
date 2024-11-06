import type { Prisma, Task } from "@prisma/client";

export interface TasksRepository {
  findById(id: string): Promise<Task | null>;
  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>;
  update(data: Prisma.TaskUncheckedUpdateInput): Promise<Task>;
  delete(id: string): Promise<null>;
}
