import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
  userId: string;
  name?: string;
  email?: string;
  password_hash?: string;
}

interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
    password_hash,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const updatedUser = await this.usersRepository.update({
      id: userId,
      name,
      email,
      password_hash,
    });

    return {
      user: updatedUser,
    };
  }
}
