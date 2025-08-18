import { z } from 'zod';
import { PasswordResetTokenSelectObjectSchema } from './objects/PasswordResetTokenSelect.schema';
import { PasswordResetTokenCreateManyInputObjectSchema } from './objects/PasswordResetTokenCreateManyInput.schema'

export const PasswordResetTokenCreateManyAndReturnSchema = z.object({ select: PasswordResetTokenSelectObjectSchema.optional(), data: z.union([ PasswordResetTokenCreateManyInputObjectSchema, z.array(PasswordResetTokenCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()