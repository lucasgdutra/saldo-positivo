import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCategoriesInputObjectSchema } from './UserCreateWithoutCategoriesInput.schema';
import { UserUncheckedCreateWithoutCategoriesInputObjectSchema } from './UserUncheckedCreateWithoutCategoriesInput.schema'

export const UserCreateOrConnectWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCategoriesInput, Prisma.UserCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCategoriesInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema)])
}).strict();
