import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceCreateWithoutUserInputObjectSchema } from './BalanceCreateWithoutUserInput.schema';
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from './BalanceUncheckedCreateWithoutUserInput.schema';
import { BalanceCreateOrConnectWithoutUserInputObjectSchema } from './BalanceCreateOrConnectWithoutUserInput.schema';
import { BalanceUpsertWithoutUserInputObjectSchema } from './BalanceUpsertWithoutUserInput.schema';
import { BalanceWhereInputObjectSchema } from './BalanceWhereInput.schema';
import { BalanceWhereUniqueInputObjectSchema } from './BalanceWhereUniqueInput.schema';
import { BalanceUpdateToOneWithWhereWithoutUserInputObjectSchema } from './BalanceUpdateToOneWithWhereWithoutUserInput.schema';
import { BalanceUpdateWithoutUserInputObjectSchema } from './BalanceUpdateWithoutUserInput.schema';
import { BalanceUncheckedUpdateWithoutUserInputObjectSchema } from './BalanceUncheckedUpdateWithoutUserInput.schema'

export const BalanceUncheckedUpdateOneWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.BalanceUncheckedUpdateOneWithoutUserNestedInput, Prisma.BalanceUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => BalanceCreateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BalanceCreateOrConnectWithoutUserInputObjectSchema).optional(),
  upsert: z.lazy(() => BalanceUpsertWithoutUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => BalanceWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => BalanceWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => BalanceWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => BalanceUpdateToOneWithWhereWithoutUserInputObjectSchema), z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema)]).optional()
}).strict();
export const BalanceUncheckedUpdateOneWithoutUserNestedInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => BalanceCreateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BalanceCreateOrConnectWithoutUserInputObjectSchema).optional(),
  upsert: z.lazy(() => BalanceUpsertWithoutUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => BalanceWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => BalanceWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => BalanceWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => BalanceUpdateToOneWithWhereWithoutUserInputObjectSchema), z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema)]).optional()
}).strict();
