import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { DeleteTaskUseCase } from "./delete-task";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let tasksRepository: InMemoryTasksRepository;
let sut: DeleteTaskUseCase;

describe("Delete Task Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new DeleteTaskUseCase(tasksRepository);
  });

  it("should be able to delete task", async () => {
    const createdTask = await tasksRepository.create({
      title: "Task example",
      description: "Task description",
      status: "TODO",
      user_id: "user-01",
    });

    const deletedTask = await sut.execute({
      id: createdTask.id,
    });

    expect(deletedTask).toBeNull();
  });

  it("should not be able to delete non-existing task", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
