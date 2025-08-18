import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueWhereUniqueInputObjectSchema } from './RevenueWhereUniqueInput.schema';
import { RevenueUpdateWithoutUserInputObjectSchema } from './RevenueUpdateWithoutUserInput.schema';
import { RevenueUncheckedUpdateWithoutUserInputObjectSchema } from './RevenueUncheckedUpdateWithoutUserInput.schema'

export const RevenueUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUpdateWithWhereUniqueWithoutUserInput, Prisma.RevenueUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RevenueWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RevenueUpdateWithoutUserInputObjectSchema), z.lazy(() => RevenueUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const RevenueUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => RevenueWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RevenueUpdateWithoutUserInputObjectSchema), z.lazy(() => RevenueUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
