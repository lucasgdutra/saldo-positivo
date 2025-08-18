import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueWhereUniqueInputObjectSchema } from './RevenueWhereUniqueInput.schema';
import { RevenueCreateWithoutUserInputObjectSchema } from './RevenueCreateWithoutUserInput.schema';
import { RevenueUncheckedCreateWithoutUserInputObjectSchema } from './RevenueUncheckedCreateWithoutUserInput.schema'

export const RevenueCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueCreateOrConnectWithoutUserInput, Prisma.RevenueCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RevenueWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RevenueCreateWithoutUserInputObjectSchema), z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const RevenueCreateOrConnectWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => RevenueWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RevenueCreateWithoutUserInputObjectSchema), z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
