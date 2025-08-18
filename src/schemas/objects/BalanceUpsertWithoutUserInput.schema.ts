import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceUpdateWithoutUserInputObjectSchema } from './BalanceUpdateWithoutUserInput.schema';
import { BalanceUncheckedUpdateWithoutUserInputObjectSchema } from './BalanceUncheckedUpdateWithoutUserInput.schema';
import { BalanceCreateWithoutUserInputObjectSchema } from './BalanceCreateWithoutUserInput.schema';
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from './BalanceUncheckedCreateWithoutUserInput.schema';
import { BalanceWhereInputObjectSchema } from './BalanceWhereInput.schema'

export const BalanceUpsertWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceUpsertWithoutUserInput, Prisma.BalanceUpsertWithoutUserInput> = z.object({
  update: z.union([z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => BalanceCreateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema)]),
  where: z.lazy(() => BalanceWhereInputObjectSchema).optional()
}).strict();
export const BalanceUpsertWithoutUserInputObjectZodSchema = z.object({
  update: z.union([z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => BalanceCreateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema)]),
  where: z.lazy(() => BalanceWhereInputObjectSchema).optional()
}).strict();
