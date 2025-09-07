import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutRevenuesInputObjectSchema } from './UserCreateWithoutRevenuesInput.schema';
import { UserUncheckedCreateWithoutRevenuesInputObjectSchema } from './UserUncheckedCreateWithoutRevenuesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRevenuesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutRevenuesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRevenuesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutRevenuesInput>;
export const UserCreateOrConnectWithoutRevenuesInputObjectZodSchema = makeSchema();
