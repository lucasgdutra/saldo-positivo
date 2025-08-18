import { z } from 'zod';
import { PasswordResetTokenSelectObjectSchema } from './objects/PasswordResetTokenSelect.schema';
import { PasswordResetTokenIncludeObjectSchema } from './objects/PasswordResetTokenInclude.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './objects/PasswordResetTokenWhereUniqueInput.schema'

export const PasswordResetTokenFindUniqueOrThrowSchema = z.object({ select: PasswordResetTokenSelectObjectSchema.optional(), include: PasswordResetTokenIncludeObjectSchema.optional(), where: PasswordResetTokenWhereUniqueInputObjectSchema })