import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { getServerSession } from 'next-auth';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

import { authOptions } from "@/lib/auth";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;
  const nextRequest = new NextRequest(req.url, req);
  const session = await getServerSession(authOptions);
  // Garante que o contexto sempre retorna session: { user: User | null }
  return {
    session: session && session.user
      ? { user: session.user }
      : { user: null }
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  // Refina o contexto: session.user é garantido como não-nulo nas procedures protegidas
  return next({
    ctx: {
      ...ctx,
      session: { user: ctx.session.user },
    },
  });
});