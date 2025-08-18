import { z } from 'zod';
import { PasswordResetTokenSelectObjectSchema } from './objects/PasswordResetTokenSelect.schema';
import { PasswordResetTokenIncludeObjectSchema } from './objects/PasswordResetTokenInclude.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './objects/PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenCreateInputObjectSchema } from './objects/PasswordResetTokenCreateInput.schema';
import { PasswordResetTokenUncheckedCreateInputObjectSchema } from './objects/PasswordResetTokenUncheckedCreateInput.schema';
import { PasswordResetTokenUpdateInputObjectSchema } from './objects/PasswordResetTokenUpdateInput.schema';
import { PasswordResetTokenUncheckedUpdateInputObjectSchema } from './objects/PasswordResetTokenUncheckedUpdateInput.schema'

export const PasswordResetTokenUpsertSchema = z.object({ select: PasswordResetTokenSelectObjectSchema.optional(), include: PasswordResetTokenIncludeObjectSchema.optional(), where: PasswordResetTokenWhereUniqueInputObjectSchema, create: z.union([ PasswordResetTokenCreateInputObjectSchema, PasswordResetTokenUncheckedCreateInputObjectSchema ]), update: z.union([ PasswordResetTokenUpdateInputObjectSchema, PasswordResetTokenUncheckedUpdateInputObjectSchema ])  })