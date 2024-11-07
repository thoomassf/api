import { FastifyInstance } from "fastify";

import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { register } from "./controllers/users/register";
import { update } from "./controllers/users/update";
import { createTask } from "./controllers/tasks/create-task";
import { SearchTask } from "./controllers/tasks/search-task";

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

  app.withTypeProvider<ZodTypeProvider>().put(
    "/users/:userId",
    {
      schema: {
        params: z.object({
          userId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string().email(),
              password: z.string().min(6),
            }),
          }),
        },
      },
    },
    update
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/tasks/:taskId",
    {
      schema: {
        params: z.object({
          taskId: z.string().uuid(),
        }),
        // response: {
        //   200: z.object({
        //     id: z.string(),
        //     title: z.string(),
        //     description: z.string(),
        //     status: z.string(),
        //     created_at: z.string(),
        //     updated_at: z.string(),
        //     user_id: z.string(),
        //   }),
        // },
      },
    },
    SearchTask
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/tasks",
    {
      schema: {
        body: z.object({
          title: z.string().min(3),
          description: z.string().min(3),
          status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
          userId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            taskId: z.string().uuid(),
          }),
        },
      },
    },
    createTask
  );
}
