import { z } from 'zod';
import { PasswordResetTokenUpdateManyMutationInputObjectSchema } from './objects/PasswordResetTokenUpdateManyMutationInput.schema';
import { PasswordResetTokenWhereInputObjectSchema } from './objects/PasswordResetTokenWhereInput.schema'

export const PasswordResetTokenUpdateManySchema = z.object({ data: PasswordResetTokenUpdateManyMutationInputObjectSchema, where: PasswordResetTokenWhereInputObjectSchema.optional()  })