import { z } from 'zod';
import { PasswordResetTokenSelectObjectSchema } from './objects/PasswordResetTokenSelect.schema';
import { PasswordResetTokenIncludeObjectSchema } from './objects/PasswordResetTokenInclude.schema';
import { PasswordResetTokenUpdateInputObjectSchema } from './objects/PasswordResetTokenUpdateInput.schema';
import { PasswordResetTokenUncheckedUpdateInputObjectSchema } from './objects/PasswordResetTokenUncheckedUpdateInput.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './objects/PasswordResetTokenWhereUniqueInput.schema';

export const PasswordResetTokenUpdateOneSchema = z.object({ select: PasswordResetTokenSelectObjectSchema.optional(), include: PasswordResetTokenIncludeObjectSchema.optional(), data: z.union([PasswordResetTokenUpdateInputObjectSchema, PasswordResetTokenUncheckedUpdateInputObjectSchema]), where: PasswordResetTokenWhereUniqueInputObjectSchema  })