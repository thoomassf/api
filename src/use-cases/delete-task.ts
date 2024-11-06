import type { TasksRepository } from "@/repositories/tasks-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteTaskUseCaseRequest {
  id: string;
}

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: DeleteTaskUseCaseRequest): Promise<null> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    await this.tasksRepository.delete(id);

    return null;
  }
}
