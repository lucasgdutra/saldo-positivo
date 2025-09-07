import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from './PasswordResetTokenCreateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedCreateWithoutUserInput.schema';
import { PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema } from './PasswordResetTokenCreateOrConnectWithoutUserInput.schema';
import { PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput.schema';
import { PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema } from './PasswordResetTokenCreateManyUserInputEnvelope.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput.schema';
import { PasswordResetTokenUpdateManyWithWhereWithoutUserInputObjectSchema } from './PasswordResetTokenUpdateManyWithWhereWithoutUserInput.schema';
import { PasswordResetTokenScalarWhereInputObjectSchema } from './PasswordResetTokenScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema), z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PasswordResetTokenUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput>;
export const PasswordResetTokenUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
