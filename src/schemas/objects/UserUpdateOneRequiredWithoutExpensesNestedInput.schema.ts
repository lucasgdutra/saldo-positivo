import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutExpensesInputObjectSchema } from './UserCreateWithoutExpensesInput.schema';
import { UserUncheckedCreateWithoutExpensesInputObjectSchema } from './UserUncheckedCreateWithoutExpensesInput.schema';
import { UserCreateOrConnectWithoutExpensesInputObjectSchema } from './UserCreateOrConnectWithoutExpensesInput.schema';
import { UserUpsertWithoutExpensesInputObjectSchema } from './UserUpsertWithoutExpensesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutExpensesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutExpensesInput.schema';
import { UserUpdateWithoutExpensesInputObjectSchema } from './UserUpdateWithoutExpensesInput.schema';
import { UserUncheckedUpdateWithoutExpensesInputObjectSchema } from './UserUncheckedUpdateWithoutExpensesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExpensesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutExpensesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutExpensesInputObjectSchema), z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutExpensesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutExpensesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutExpensesNestedInput>;
export const UserUpdateOneRequiredWithoutExpensesNestedInputObjectZodSchema = makeSchema();
