import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutCategoriesInputObjectSchema } from './UserUpdateWithoutCategoriesInput.schema';
import { UserUncheckedUpdateWithoutCategoriesInputObjectSchema } from './UserUncheckedUpdateWithoutCategoriesInput.schema';
import { UserCreateWithoutCategoriesInputObjectSchema } from './UserCreateWithoutCategoriesInput.schema';
import { UserUncheckedCreateWithoutCategoriesInputObjectSchema } from './UserUncheckedCreateWithoutCategoriesInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCategoriesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCategoriesInput>;
export const UserUpsertWithoutCategoriesInputObjectZodSchema = makeSchema();
