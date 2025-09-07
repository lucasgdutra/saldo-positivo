import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRevenuesInputObjectSchema } from './UserCreateWithoutRevenuesInput.schema';
import { UserUncheckedCreateWithoutRevenuesInputObjectSchema } from './UserUncheckedCreateWithoutRevenuesInput.schema';
import { UserCreateOrConnectWithoutRevenuesInputObjectSchema } from './UserCreateOrConnectWithoutRevenuesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRevenuesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRevenuesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutRevenuesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRevenuesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutRevenuesInput>;
export const UserCreateNestedOneWithoutRevenuesInputObjectZodSchema = makeSchema();
