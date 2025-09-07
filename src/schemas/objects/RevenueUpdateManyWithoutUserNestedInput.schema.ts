import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueCreateWithoutUserInputObjectSchema } from './RevenueCreateWithoutUserInput.schema';
import { RevenueUncheckedCreateWithoutUserInputObjectSchema } from './RevenueUncheckedCreateWithoutUserInput.schema';
import { RevenueCreateOrConnectWithoutUserInputObjectSchema } from './RevenueCreateOrConnectWithoutUserInput.schema';
import { RevenueUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './RevenueUpsertWithWhereUniqueWithoutUserInput.schema';
import { RevenueCreateManyUserInputEnvelopeObjectSchema } from './RevenueCreateManyUserInputEnvelope.schema';
import { RevenueWhereUniqueInputObjectSchema } from './RevenueWhereUniqueInput.schema';
import { RevenueUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './RevenueUpdateWithWhereUniqueWithoutUserInput.schema';
import { RevenueUpdateManyWithWhereWithoutUserInputObjectSchema } from './RevenueUpdateManyWithWhereWithoutUserInput.schema';
import { RevenueScalarWhereInputObjectSchema } from './RevenueScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => RevenueCreateWithoutUserInputObjectSchema), z.lazy(() => RevenueCreateWithoutUserInputObjectSchema).array(), z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RevenueCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => RevenueCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RevenueUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => RevenueUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RevenueCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => RevenueWhereUniqueInputObjectSchema), z.lazy(() => RevenueWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RevenueWhereUniqueInputObjectSchema), z.lazy(() => RevenueWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RevenueWhereUniqueInputObjectSchema), z.lazy(() => RevenueWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RevenueWhereUniqueInputObjectSchema), z.lazy(() => RevenueWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RevenueUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => RevenueUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RevenueUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => RevenueUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RevenueScalarWhereInputObjectSchema), z.lazy(() => RevenueScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RevenueUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.RevenueUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RevenueUpdateManyWithoutUserNestedInput>;
export const RevenueUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
