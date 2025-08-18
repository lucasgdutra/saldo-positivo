import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutExpensesInputObjectSchema } from './UserUpdateWithoutExpensesInput.schema';
import { UserUncheckedUpdateWithoutExpensesInputObjectSchema } from './UserUncheckedUpdateWithoutExpensesInput.schema'

export const UserUpdateToOneWithWhereWithoutExpensesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutExpensesInput, Prisma.UserUpdateToOneWithWhereWithoutExpensesInput> = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutExpensesInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema)])
}).strict();
