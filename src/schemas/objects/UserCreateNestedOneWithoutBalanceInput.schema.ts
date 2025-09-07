import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutBalanceInputObjectSchema } from './UserCreateWithoutBalanceInput.schema';
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from './UserUncheckedCreateWithoutBalanceInput.schema';
import { UserCreateOrConnectWithoutBalanceInputObjectSchema } from './UserCreateOrConnectWithoutBalanceInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBalanceInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutBalanceInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBalanceInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutBalanceInput>;
export const UserCreateNestedOneWithoutBalanceInputObjectZodSchema = makeSchema();
