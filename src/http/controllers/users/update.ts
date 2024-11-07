import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-user-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = updateBodySchema.parse(request.body);
  const { id } = updateBodySchema.parse(request.params);

  try {
    const updateUseCase = makeUpdateUserUseCase();

    const { user } = await updateUseCase.execute({
      userId: id,
      name,
      email,
      password_hash: password,
    });

    return reply.status(200).send({ user });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
