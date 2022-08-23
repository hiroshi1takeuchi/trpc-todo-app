import * as trpc from "@trpc/server";
import { z } from "zod";
import { todoService } from "./service";

export const appRouter = trpc
  .router()
  .query("hello", {
    async resolve() {
      return { message: "hello from tRPC" };
    },
  })
  .query("getList", {
    async resolve() {
      return todoService.getList();
    },
  })
  .query("getById", {
    input: (id: unknown) => {
      if (typeof id === "string") {
        return { id };
      }
      throw new Error(`Invalid input ${id}`);
    },
    async resolve(req) {
      return todoService.getById(req.input.id);
    },
  })
  .mutation("add", {
    input: z.object({
      text: z.string(),
    }),
    async resolve(req) {
      const { text } = req.input;
      const todo = todoService.add(text);
      return todo;
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      text: z.string(),
      done: z.boolean(),
    }),
    async resolve(req) {
      const { id, text, done } = req.input;
      const todo = todoService.upsert(id, { id, text, done });
      return todo;
    },
  })
  .mutation("delete", {
    input: z.object({ id: z.string() }),
    async resolve({ input: { id } }) {
      const count = todoService.delete(id);
      return count;
    },
  });
// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;
