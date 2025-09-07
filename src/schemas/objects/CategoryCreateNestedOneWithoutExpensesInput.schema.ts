import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateWithoutExpensesInputObjectSchema } from './CategoryCreateWithoutExpensesInput.schema';
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from './CategoryUncheckedCreateWithoutExpensesInput.schema';
import { CategoryCreateOrConnectWithoutExpensesInputObjectSchema } from './CategoryCreateOrConnectWithoutExpensesInput.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutExpensesInputObjectSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional()
}).strict();
export const CategoryCreateNestedOneWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutExpensesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateNestedOneWithoutExpensesInput>;
export const CategoryCreateNestedOneWithoutExpensesInputObjectZodSchema = makeSchema();
