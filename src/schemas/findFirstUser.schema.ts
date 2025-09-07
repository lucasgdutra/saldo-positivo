import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserIncludeObjectSchema } from './objects/UserInclude.schema';
import { UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema';
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema';
import { UserCountOutputTypeArgsObjectSchema } from './objects/UserCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindFirstSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    name: z.boolean().optional(),
    salaryRange: z.boolean().optional(),
    usageMotivation: z.boolean().optional(),
    customMotivation: z.boolean().optional(),
    financialGoals: z.boolean().optional(),
    hasDebts: z.boolean().optional(),
    familySize: z.boolean().optional(),
    financialExperience: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    categories: z.boolean().optional(),
    expenses: z.boolean().optional(),
    revenues: z.boolean().optional(),
    balance: z.boolean().optional(),
    passwordResetTokens: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    name: z.boolean().optional(),
    salaryRange: z.boolean().optional(),
    usageMotivation: z.boolean().optional(),
    customMotivation: z.boolean().optional(),
    financialGoals: z.boolean().optional(),
    hasDebts: z.boolean().optional(),
    familySize: z.boolean().optional(),
    financialExperience: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    categories: z.boolean().optional(),
    expenses: z.boolean().optional(),
    revenues: z.boolean().optional(),
    balance: z.boolean().optional(),
    passwordResetTokens: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const UserFindFirstSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({ select: UserFindFirstSelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstZodSchema = z.object({ select: UserFindFirstSelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict();