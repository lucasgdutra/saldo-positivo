import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceWhereInputObjectSchema } from './BalanceWhereInput.schema';
import { BalanceUpdateWithoutUserInputObjectSchema } from './BalanceUpdateWithoutUserInput.schema';
import { BalanceUncheckedUpdateWithoutUserInputObjectSchema } from './BalanceUncheckedUpdateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => BalanceWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const BalanceUpdateToOneWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceUpdateToOneWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BalanceUpdateToOneWithWhereWithoutUserInput>;
export const BalanceUpdateToOneWithWhereWithoutUserInputObjectZodSchema = makeSchema();
