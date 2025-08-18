import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutRevenuesInputObjectSchema } from './UserCreateWithoutRevenuesInput.schema';
import { UserUncheckedCreateWithoutRevenuesInputObjectSchema } from './UserUncheckedCreateWithoutRevenuesInput.schema'

export const UserCreateOrConnectWithoutRevenuesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRevenuesInput, Prisma.UserCreateOrConnectWithoutRevenuesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRevenuesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutRevenuesInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRevenuesInputObjectSchema)])
}).strict();
