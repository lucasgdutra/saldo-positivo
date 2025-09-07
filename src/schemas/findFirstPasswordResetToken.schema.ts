import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PasswordResetTokenIncludeObjectSchema } from './objects/PasswordResetTokenInclude.schema';
import { PasswordResetTokenOrderByWithRelationInputObjectSchema } from './objects/PasswordResetTokenOrderByWithRelationInput.schema';
import { PasswordResetTokenWhereInputObjectSchema } from './objects/PasswordResetTokenWhereInput.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './objects/PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenScalarFieldEnumSchema } from './enums/PasswordResetTokenScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PasswordResetTokenFindFirstSelectSchema: z.ZodType<Prisma.PasswordResetTokenSelect> = z.object({
    id: z.boolean().optional(),
    token: z.boolean().optional(),
    userId: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    used: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PasswordResetTokenSelect>;

export const PasswordResetTokenFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    token: z.boolean().optional(),
    userId: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    used: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const PasswordResetTokenFindFirstSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstArgs> = z.object({ select: PasswordResetTokenFindFirstSelectSchema.optional(), include: z.lazy(() => PasswordResetTokenIncludeObjectSchema.optional()), orderBy: z.union([PasswordResetTokenOrderByWithRelationInputObjectSchema, PasswordResetTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: PasswordResetTokenWhereInputObjectSchema.optional(), cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PasswordResetTokenFindFirstArgs>;

export const PasswordResetTokenFindFirstZodSchema = z.object({ select: PasswordResetTokenFindFirstSelectSchema.optional(), include: z.lazy(() => PasswordResetTokenIncludeObjectSchema.optional()), orderBy: z.union([PasswordResetTokenOrderByWithRelationInputObjectSchema, PasswordResetTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: PasswordResetTokenWhereInputObjectSchema.optional(), cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array()]).optional() }).strict();