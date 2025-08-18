import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateWithoutExpensesInputObjectSchema } from './CategoryCreateWithoutExpensesInput.schema';
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from './CategoryUncheckedCreateWithoutExpensesInput.schema';
import { CategoryCreateOrConnectWithoutExpensesInputObjectSchema } from './CategoryCreateOrConnectWithoutExpensesInput.schema';
import { CategoryUpsertWithoutExpensesInputObjectSchema } from './CategoryUpsertWithoutExpensesInput.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateToOneWithWhereWithoutExpensesInputObjectSchema } from './CategoryUpdateToOneWithWhereWithoutExpensesInput.schema';
import { CategoryUpdateWithoutExpensesInputObjectSchema } from './CategoryUpdateWithoutExpensesInput.schema';
import { CategoryUncheckedUpdateWithoutExpensesInputObjectSchema } from './CategoryUncheckedUpdateWithoutExpensesInput.schema'

export const CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutExpensesNestedInput, Prisma.CategoryUpdateOneRequiredWithoutExpensesNestedInput> = z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutExpensesInputObjectSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutExpensesInputObjectSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CategoryUpdateToOneWithWhereWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUpdateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutExpensesInputObjectSchema)]).optional()
}).strict();
export const CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutExpensesInputObjectSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutExpensesInputObjectSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CategoryUpdateToOneWithWhereWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUpdateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutExpensesInputObjectSchema)]).optional()
}).strict();
