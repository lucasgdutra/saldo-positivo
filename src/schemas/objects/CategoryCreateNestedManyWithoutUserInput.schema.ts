import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateWithoutUserInputObjectSchema } from './CategoryCreateWithoutUserInput.schema';
import { CategoryUncheckedCreateWithoutUserInputObjectSchema } from './CategoryUncheckedCreateWithoutUserInput.schema';
import { CategoryCreateOrConnectWithoutUserInputObjectSchema } from './CategoryCreateOrConnectWithoutUserInput.schema';
import { CategoryCreateManyUserInputEnvelopeObjectSchema } from './CategoryCreateManyUserInputEnvelope.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'

export const CategoryCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryCreateNestedManyWithoutUserInput, Prisma.CategoryCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutUserInputObjectSchema), z.lazy(() => CategoryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CategoryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CategoryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CategoryCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CategoryWhereUniqueInputObjectSchema), z.lazy(() => CategoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CategoryCreateNestedManyWithoutUserInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutUserInputObjectSchema), z.lazy(() => CategoryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CategoryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CategoryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CategoryCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CategoryWhereUniqueInputObjectSchema), z.lazy(() => CategoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
