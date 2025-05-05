import { createTRPCReact } from '@trpc/react-query';
import { inferRouterOutputs, inferRouterInputs } from '@trpc/server';
import { type AppRouter } from '@/server/routers/_app';

export const trpc = createTRPCReact<AppRouter>();

// Tipos inferidos do roteador
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // URL relativa no browser
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpcClientConfig = {
  links: [
    {
      url: `${getBaseUrl()}/api/trpc`,
    },
  ],
};