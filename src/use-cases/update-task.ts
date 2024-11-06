import type { TasksRepository } from "@/repositories/tasks-repository";
import type { Status, Task } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateTaskUseCaseRequest {
  taskId: string;
  title?: string;
  description?: string;
  status?: Status;
}

interface UpdateTaskUseCaseResponse {
  task: Task;
}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    title,
    description,
    status,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    const updatedTask = await this.tasksRepository.update({
      id: taskId,
      title,
      description,
      status,
    });

    return {
      task: updatedTask,
    };
  }
}
