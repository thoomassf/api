import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import type { Task } from "@prisma/client";
import type { TasksRepository } from "@/repositories/tasks-repository";

interface SearchTaskUseCaseRequest {
  taskId: string;
}

interface SearchTaskUseCaseResponse {
  task: Task;
}

export class SearchTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: SearchTaskUseCaseRequest): Promise<SearchTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    return {
      task,
    };
  }
}
