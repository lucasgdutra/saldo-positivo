import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PasswordResetTokenIncludeObjectSchema } from './objects/PasswordResetTokenInclude.schema';
import { PasswordResetTokenOrderByWithRelationInputObjectSchema } from './objects/PasswordResetTokenOrderByWithRelationInput.schema';
import { PasswordResetTokenWhereInputObjectSchema } from './objects/PasswordResetTokenWhereInput.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './objects/PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenScalarFieldEnumSchema } from './enums/PasswordResetTokenScalarFieldEnum.schema';
import { UserArgsObjectSchema } from './objects/UserArgs.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PasswordResetTokenFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PasswordResetTokenSelect, Prisma.PasswordResetTokenSelect> = z.object({
    id: z.boolean().optional(),
    token: z.boolean().optional(),
    userId: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    used: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const PasswordResetTokenFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    token: z.boolean().optional(),
    userId: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    used: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const PasswordResetTokenFindFirstOrThrowSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstOrThrowArgs, Prisma.PasswordResetTokenFindFirstOrThrowArgs> = z.object({ select: PasswordResetTokenFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PasswordResetTokenIncludeObjectSchema.optional()), orderBy: z.union([PasswordResetTokenOrderByWithRelationInputObjectSchema, PasswordResetTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: PasswordResetTokenWhereInputObjectSchema.optional(), cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array()]).optional() }).strict();

export const PasswordResetTokenFindFirstOrThrowZodSchema = z.object({ select: PasswordResetTokenFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PasswordResetTokenIncludeObjectSchema.optional()), orderBy: z.union([PasswordResetTokenOrderByWithRelationInputObjectSchema, PasswordResetTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: PasswordResetTokenWhereInputObjectSchema.optional(), cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array()]).optional() }).strict();