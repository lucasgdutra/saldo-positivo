import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueScalarWhereInputObjectSchema } from './RevenueScalarWhereInput.schema';
import { RevenueUpdateManyMutationInputObjectSchema } from './RevenueUpdateManyMutationInput.schema';
import { RevenueUncheckedUpdateManyWithoutUserInputObjectSchema } from './RevenueUncheckedUpdateManyWithoutUserInput.schema'

export const RevenueUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUpdateManyWithWhereWithoutUserInput, Prisma.RevenueUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RevenueScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RevenueUpdateManyMutationInputObjectSchema), z.lazy(() => RevenueUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const RevenueUpdateManyWithWhereWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => RevenueScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RevenueUpdateManyMutationInputObjectSchema), z.lazy(() => RevenueUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
