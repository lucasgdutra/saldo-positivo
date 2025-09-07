import { z } from 'zod';
import { PasswordResetTokenSelectObjectSchema } from './objects/PasswordResetTokenSelect.schema';
import { PasswordResetTokenUpdateManyMutationInputObjectSchema } from './objects/PasswordResetTokenUpdateManyMutationInput.schema';
import { PasswordResetTokenWhereInputObjectSchema } from './objects/PasswordResetTokenWhereInput.schema';

export const PasswordResetTokenUpdateManyAndReturnSchema = z.object({ select: PasswordResetTokenSelectObjectSchema.optional(), data: PasswordResetTokenUpdateManyMutationInputObjectSchema, where: PasswordResetTokenWhereInputObjectSchema.optional()  }).strict()