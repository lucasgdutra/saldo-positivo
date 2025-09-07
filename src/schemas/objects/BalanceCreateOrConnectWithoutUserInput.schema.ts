import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceWhereUniqueInputObjectSchema } from './BalanceWhereUniqueInput.schema';
import { BalanceCreateWithoutUserInputObjectSchema } from './BalanceCreateWithoutUserInput.schema';
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from './BalanceUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => BalanceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BalanceCreateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const BalanceCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BalanceCreateOrConnectWithoutUserInput>;
export const BalanceCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
