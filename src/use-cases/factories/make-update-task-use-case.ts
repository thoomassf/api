import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks.repository";
import { UpdateTaskUseCase } from "../update-task";

export function makeUpdateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository();
  const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository);

  return updateTaskUseCase;
}
