import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BalanceIncludeObjectSchema } from './objects/BalanceInclude.schema';
import { BalanceOrderByWithRelationInputObjectSchema } from './objects/BalanceOrderByWithRelationInput.schema';
import { BalanceWhereInputObjectSchema } from './objects/BalanceWhereInput.schema';
import { BalanceWhereUniqueInputObjectSchema } from './objects/BalanceWhereUniqueInput.schema';
import { BalanceScalarFieldEnumSchema } from './enums/BalanceScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BalanceFindFirstOrThrowSelectSchema: z.ZodType<Prisma.BalanceSelect> = z.object({
    id: z.boolean().optional(),
    totalAmount: z.boolean().optional(),
    totalRevenues: z.boolean().optional(),
    totalExpenses: z.boolean().optional(),
    referenceMonth: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.BalanceSelect>;

export const BalanceFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    totalAmount: z.boolean().optional(),
    totalRevenues: z.boolean().optional(),
    totalExpenses: z.boolean().optional(),
    referenceMonth: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const BalanceFindFirstOrThrowSchema: z.ZodType<Prisma.BalanceFindFirstOrThrowArgs> = z.object({ select: BalanceFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => BalanceIncludeObjectSchema.optional()), orderBy: z.union([BalanceOrderByWithRelationInputObjectSchema, BalanceOrderByWithRelationInputObjectSchema.array()]).optional(), where: BalanceWhereInputObjectSchema.optional(), cursor: BalanceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BalanceScalarFieldEnumSchema, BalanceScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.BalanceFindFirstOrThrowArgs>;

export const BalanceFindFirstOrThrowZodSchema = z.object({ select: BalanceFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => BalanceIncludeObjectSchema.optional()), orderBy: z.union([BalanceOrderByWithRelationInputObjectSchema, BalanceOrderByWithRelationInputObjectSchema.array()]).optional(), where: BalanceWhereInputObjectSchema.optional(), cursor: BalanceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BalanceScalarFieldEnumSchema, BalanceScalarFieldEnumSchema.array()]).optional() }).strict();