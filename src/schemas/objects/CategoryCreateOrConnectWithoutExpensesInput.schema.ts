import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryCreateWithoutExpensesInputObjectSchema } from './CategoryCreateWithoutExpensesInput.schema';
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from './CategoryUncheckedCreateWithoutExpensesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema)])
}).strict();
export const CategoryCreateOrConnectWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutExpensesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateOrConnectWithoutExpensesInput>;
export const CategoryCreateOrConnectWithoutExpensesInputObjectZodSchema = makeSchema();
