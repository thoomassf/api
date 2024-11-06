import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { CreateTaskUseCase } from "./create-task";

let tasksRepository: InMemoryTasksRepository;
let usersRepository: InMemoryUsersRepository;
let sut: CreateTaskUseCase;

describe("Create Task Use Case", () => {
  beforeEach(async () => {
    tasksRepository = new InMemoryTasksRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateTaskUseCase(tasksRepository, usersRepository);

    await usersRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "123456",
    });
  });

  it.skip("should be able to create a new task", async () => {
    const { task } = await sut.execute({
      title: "Task 01",
      description: "Task 01 description",
      status: "TODO",
      userId: "user-01",
    });

    expect(task.id).toEqual(expect.any(String));
  });
});
