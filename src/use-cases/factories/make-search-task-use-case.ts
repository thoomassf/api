import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks.repository";
import { SearchTaskUseCase } from "../search-task";

export function makeSearchTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository();
  const searchTaskUseCase = new SearchTaskUseCase(tasksRepository);

  return searchTaskUseCase;
}
