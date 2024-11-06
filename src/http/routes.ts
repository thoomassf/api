import { FastifyInstance } from "fastify";

import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { register } from "./controllers/users/register";

export async function appRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            userId: z.string().uuid(),
          }),
        },
      },
    },
    register
  );
}
