import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCategoriesInputObjectSchema } from './UserCreateWithoutCategoriesInput.schema';
import { UserUncheckedCreateWithoutCategoriesInputObjectSchema } from './UserUncheckedCreateWithoutCategoriesInput.schema';
import { UserCreateOrConnectWithoutCategoriesInputObjectSchema } from './UserCreateOrConnectWithoutCategoriesInput.schema';
import { UserUpsertWithoutCategoriesInputObjectSchema } from './UserUpsertWithoutCategoriesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCategoriesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCategoriesInput.schema';
import { UserUpdateWithoutCategoriesInputObjectSchema } from './UserUpdateWithoutCategoriesInput.schema';
import { UserUncheckedUpdateWithoutCategoriesInputObjectSchema } from './UserUncheckedUpdateWithoutCategoriesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCategoriesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCategoriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCategoriesInputObjectSchema), z.lazy(() => UserUpdateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCategoriesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutCategoriesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCategoriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCategoriesNestedInput>;
export const UserUpdateOneRequiredWithoutCategoriesNestedInputObjectZodSchema = makeSchema();
