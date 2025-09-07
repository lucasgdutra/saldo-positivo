import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRevenuesInputObjectSchema } from './UserCreateWithoutRevenuesInput.schema';
import { UserUncheckedCreateWithoutRevenuesInputObjectSchema } from './UserUncheckedCreateWithoutRevenuesInput.schema';
import { UserCreateOrConnectWithoutRevenuesInputObjectSchema } from './UserCreateOrConnectWithoutRevenuesInput.schema';
import { UserUpsertWithoutRevenuesInputObjectSchema } from './UserUpsertWithoutRevenuesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutRevenuesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutRevenuesInput.schema';
import { UserUpdateWithoutRevenuesInputObjectSchema } from './UserUpdateWithoutRevenuesInput.schema';
import { UserUncheckedUpdateWithoutRevenuesInputObjectSchema } from './UserUncheckedUpdateWithoutRevenuesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRevenuesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRevenuesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRevenuesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutRevenuesInputObjectSchema), z.lazy(() => UserUpdateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRevenuesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutRevenuesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRevenuesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutRevenuesNestedInput>;
export const UserUpdateOneRequiredWithoutRevenuesNestedInputObjectZodSchema = makeSchema();
