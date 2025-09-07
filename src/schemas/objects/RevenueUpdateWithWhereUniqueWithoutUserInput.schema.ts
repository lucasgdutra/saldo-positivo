import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueWhereUniqueInputObjectSchema } from './RevenueWhereUniqueInput.schema';
import { RevenueUpdateWithoutUserInputObjectSchema } from './RevenueUpdateWithoutUserInput.schema';
import { RevenueUncheckedUpdateWithoutUserInputObjectSchema } from './RevenueUncheckedUpdateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => RevenueWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RevenueUpdateWithoutUserInputObjectSchema), z.lazy(() => RevenueUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const RevenueUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RevenueUpdateWithWhereUniqueWithoutUserInput>;
export const RevenueUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
