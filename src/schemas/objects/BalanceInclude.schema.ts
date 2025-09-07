import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const BalanceIncludeObjectSchema: z.ZodType<Prisma.BalanceInclude> = makeSchema() as unknown as z.ZodType<Prisma.BalanceInclude>;
export const BalanceIncludeObjectZodSchema = makeSchema();
