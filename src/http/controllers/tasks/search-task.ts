import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeSearchTaskUseCase } from "@/use-cases/factories/make-search-task-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function SearchTask(request: FastifyRequest, reply: FastifyReply) {
  const searchTaskBodySchema = z.object({
    taskId: z.string().uuid(),
  });

  const { taskId } = searchTaskBodySchema.parse(request.params);

  try {
    const searchTaskUseCase = makeSearchTaskUseCase();

    const { task } = await searchTaskUseCase.execute({
      taskId,
    });

    console.log(task);

    return reply.status(200).send(task);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }
  }
}
