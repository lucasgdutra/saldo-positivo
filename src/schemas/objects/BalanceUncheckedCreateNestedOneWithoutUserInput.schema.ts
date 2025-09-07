import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceCreateWithoutUserInputObjectSchema } from './BalanceCreateWithoutUserInput.schema';
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from './BalanceUncheckedCreateWithoutUserInput.schema';
import { BalanceCreateOrConnectWithoutUserInputObjectSchema } from './BalanceCreateOrConnectWithoutUserInput.schema';
import { BalanceWhereUniqueInputObjectSchema } from './BalanceWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => BalanceCreateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BalanceCreateOrConnectWithoutUserInputObjectSchema).optional(),
  connect: z.lazy(() => BalanceWhereUniqueInputObjectSchema).optional()
}).strict();
export const BalanceUncheckedCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceUncheckedCreateNestedOneWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BalanceUncheckedCreateNestedOneWithoutUserInput>;
export const BalanceUncheckedCreateNestedOneWithoutUserInputObjectZodSchema = makeSchema();
