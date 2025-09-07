import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueCreateWithoutUserInputObjectSchema } from './RevenueCreateWithoutUserInput.schema';
import { RevenueUncheckedCreateWithoutUserInputObjectSchema } from './RevenueUncheckedCreateWithoutUserInput.schema';
import { RevenueCreateOrConnectWithoutUserInputObjectSchema } from './RevenueCreateOrConnectWithoutUserInput.schema';
import { RevenueCreateManyUserInputEnvelopeObjectSchema } from './RevenueCreateManyUserInputEnvelope.schema';
import { RevenueWhereUniqueInputObjectSchema } from './RevenueWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => RevenueCreateWithoutUserInputObjectSchema), z.lazy(() => RevenueCreateWithoutUserInputObjectSchema).array(), z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RevenueCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => RevenueCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RevenueCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => RevenueWhereUniqueInputObjectSchema), z.lazy(() => RevenueWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RevenueCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RevenueCreateNestedManyWithoutUserInput>;
export const RevenueCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
