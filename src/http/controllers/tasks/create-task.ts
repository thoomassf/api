import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeCreateTaskUseCase } from "@/use-cases/factories/make-create-task-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
    userId: z.string().uuid(),
  });

  const { title, description, status, userId } = createTaskBodySchema.parse(
    request.body
  );

  try {
    const createTaskUseCase = makeCreateTaskUseCase();

    const { task } = await createTaskUseCase.execute({
      title,
      description,
      status,
      userId,
    });

    return reply.status(201).send({ taskId: task.id });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
  }
}
