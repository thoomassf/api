import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UpdateUserUseCase } from "./update-user";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe("Update User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it.skip("should be able to update user", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "123456",
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
      name: "John Updated",
      email: "johnupdated@example.com",
    });

    expect(user.name).toEqual("John Updated");
    expect(user.email).toEqual("johnupdated@example.com");
  });

  it("should not be able to update non-existing user", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
        name: "John Updated",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
