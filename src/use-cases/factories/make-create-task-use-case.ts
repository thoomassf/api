import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks.repository";
import { CreateTaskUseCase } from "../create-task";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeCreateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository();
  const usersRepository = new PrismaUsersRepository();
  const createTaskUseCase = new CreateTaskUseCase(
    tasksRepository,
    usersRepository
  );

  return createTaskUseCase;
}
