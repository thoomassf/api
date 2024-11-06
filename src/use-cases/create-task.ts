import type { TasksRepository } from "@/repositories/tasks-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import type { Status, Task } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreateTaskUseCaseRequest {
  userId: string;
  title: string;
  description: string;
  status: Status;
}

interface CreateTaskUseCaseResponse {
  task: Task;
}

export class CreateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    title,
    description,
    status,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const task = await this.tasksRepository.create({
      title,
      description,
      status,
      user_id: user.id,
    });

    return {
      task,
    };
  }
}
