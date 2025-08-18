import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRevenuesInputObjectSchema } from './UserCreateWithoutRevenuesInput.schema';
import { UserUncheckedCreateWithoutRevenuesInputObjectSchema } from './UserUncheckedCreateWithoutRevenuesInput.schema';
import { UserCreateOrConnectWithoutRevenuesInputObjectSchema } from './UserCreateOrConnectWithoutRevenuesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

export const UserCreateNestedOneWithoutRevenuesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRevenuesInput, Prisma.UserCreateNestedOneWithoutRevenuesInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRevenuesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRevenuesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutRevenuesInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRevenuesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRevenuesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
