import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { SearchTaskUseCase } from "./search-task";

let tasksRepository: InMemoryTasksRepository;
let sut: SearchTaskUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new SearchTaskUseCase(tasksRepository);
  });

  it("should be able to get an task", async () => {
    const createdTask = await tasksRepository.create({
      title: "Task example",
      description: "Task description",
      status: "TODO",
      user_id: "user-01",
    });

    const { task } = await sut.execute({
      taskId: createdTask.id,
    });

    expect(task.id).toEqual(expect.any(String));
    expect(task.title).toEqual("Task example");
  });

  it("should not be able to search task with wrong id", async () => {
    await expect(() =>
      sut.execute({
        taskId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
