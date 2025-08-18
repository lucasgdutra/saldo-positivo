import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithoutUserInputObjectSchema } from './CategoryUpdateWithoutUserInput.schema';
import { CategoryUncheckedUpdateWithoutUserInputObjectSchema } from './CategoryUncheckedUpdateWithoutUserInput.schema'

export const CategoryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput, Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CategoryUpdateWithoutUserInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const CategoryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CategoryUpdateWithoutUserInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
