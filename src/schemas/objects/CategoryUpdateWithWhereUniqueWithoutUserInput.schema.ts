import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithoutUserInputObjectSchema } from './CategoryUpdateWithoutUserInput.schema';
import { CategoryUncheckedUpdateWithoutUserInputObjectSchema } from './CategoryUncheckedUpdateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CategoryUpdateWithoutUserInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const CategoryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput>;
export const CategoryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
