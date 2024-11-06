import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { UpdateTaskUseCase } from "./update-task";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let tasksRepository: InMemoryTasksRepository;
let sut: UpdateTaskUseCase;

describe("Update Task Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new UpdateTaskUseCase(tasksRepository);
  });

  it("should be able to update task", async () => {
    const createdTask = await tasksRepository.create({
      title: "Task example",
      description: "Task description",
      status: "TODO",
      user_id: "user-01",
    });

    const { task } = await sut.execute({
      taskId: createdTask.id,
      title: "Task Updated",
      description: "Task Updated",
      status: "IN_PROGRESS",
    });

    expect(task.title).toEqual("Task Updated");
    expect(task.description).toEqual("Task Updated");
  });

  it("should not be able to update non-existing task", async () => {
    await expect(() =>
      sut.execute({
        taskId: "non-existing-id",
        title: "Task Updated",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
