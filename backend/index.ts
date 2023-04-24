import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { db } from './db';
import { publicProcedure, router } from './trpc';
import cors from 'cors';

const getUserList = publicProcedure.query(async () => {
  return await db.user.findMany();
});

const userInput = z.object({
  //
  name: z.string(),
  age: z.number(),
  // gender: z.literal('female').or(z.literal('male')),
});
const createUser = publicProcedure.input(userInput).mutation(async (opts) => {
  const { input } = opts;
  const user = await db.user.create(input);
  return user;
});

const getUserById = publicProcedure.input(z.number()).query(async (opts) => {
  const { input } = opts;
  const user = await db.user.findById(input.toString());
  return user;
});

const appRouter = router({
  createUser,
  getUserList,
  getUserById,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors({ origin: '*' }),
  router: appRouter,
});

console.log('server started');

server.listen(3000);
