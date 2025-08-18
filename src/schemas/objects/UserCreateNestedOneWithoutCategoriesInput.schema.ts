import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCategoriesInputObjectSchema } from './UserCreateWithoutCategoriesInput.schema';
import { UserUncheckedCreateWithoutCategoriesInputObjectSchema } from './UserUncheckedCreateWithoutCategoriesInput.schema';
import { UserCreateOrConnectWithoutCategoriesInputObjectSchema } from './UserCreateOrConnectWithoutCategoriesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

export const UserCreateNestedOneWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCategoriesInput, Prisma.UserCreateNestedOneWithoutCategoriesInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCategoriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutCategoriesInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCategoriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
