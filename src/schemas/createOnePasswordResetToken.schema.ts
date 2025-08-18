import { z } from 'zod';
import { PasswordResetTokenSelectObjectSchema } from './objects/PasswordResetTokenSelect.schema';
import { PasswordResetTokenIncludeObjectSchema } from './objects/PasswordResetTokenInclude.schema';
import { PasswordResetTokenCreateInputObjectSchema } from './objects/PasswordResetTokenCreateInput.schema';
import { PasswordResetTokenUncheckedCreateInputObjectSchema } from './objects/PasswordResetTokenUncheckedCreateInput.schema'

export const PasswordResetTokenCreateOneSchema = z.object({ select: PasswordResetTokenSelectObjectSchema.optional(), include: PasswordResetTokenIncludeObjectSchema.optional(), data: z.union([PasswordResetTokenCreateInputObjectSchema, PasswordResetTokenUncheckedCreateInputObjectSchema])  })