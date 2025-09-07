import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCategoriesInputObjectSchema } from './UserCreateWithoutCategoriesInput.schema';
import { UserUncheckedCreateWithoutCategoriesInputObjectSchema } from './UserUncheckedCreateWithoutCategoriesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCategoriesInput>;
export const UserCreateOrConnectWithoutCategoriesInputObjectZodSchema = makeSchema();
