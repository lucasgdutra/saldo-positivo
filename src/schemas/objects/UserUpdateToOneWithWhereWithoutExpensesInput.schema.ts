import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutExpensesInputObjectSchema } from './UserUpdateWithoutExpensesInput.schema';
import { UserUncheckedUpdateWithoutExpensesInputObjectSchema } from './UserUncheckedUpdateWithoutExpensesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutExpensesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutExpensesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutExpensesInput>;
export const UserUpdateToOneWithWhereWithoutExpensesInputObjectZodSchema = makeSchema();
