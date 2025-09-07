import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCategoriesInputObjectSchema } from './UserUpdateWithoutCategoriesInput.schema';
import { UserUncheckedUpdateWithoutCategoriesInputObjectSchema } from './UserUncheckedUpdateWithoutCategoriesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCategoriesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCategoriesInput>;
export const UserUpdateToOneWithWhereWithoutCategoriesInputObjectZodSchema = makeSchema();
