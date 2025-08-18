import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ExpenseIncludeObjectSchema } from './objects/ExpenseInclude.schema';
import { ExpenseOrderByWithRelationInputObjectSchema } from './objects/ExpenseOrderByWithRelationInput.schema';
import { ExpenseWhereInputObjectSchema } from './objects/ExpenseWhereInput.schema';
import { ExpenseWhereUniqueInputObjectSchema } from './objects/ExpenseWhereUniqueInput.schema';
import { ExpenseScalarFieldEnumSchema } from './enums/ExpenseScalarFieldEnum.schema';
import { UserArgsObjectSchema } from './objects/UserArgs.schema';
import { CategoryArgsObjectSchema } from './objects/CategoryArgs.schema'

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExpenseFindManySelectSchema: z.ZodType<Prisma.ExpenseSelect, Prisma.ExpenseSelect> = z.object({
    id: z.boolean().optional(),
    amount: z.boolean().optional(),
    description: z.boolean().optional(),
    date: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    user: z.boolean().optional(),
    category: z.boolean().optional()
  }).strict();

export const ExpenseFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    amount: z.boolean().optional(),
    description: z.boolean().optional(),
    date: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    user: z.boolean().optional(),
    category: z.boolean().optional()
  }).strict();

export const ExpenseFindManySchema: z.ZodType<Prisma.ExpenseFindManyArgs, Prisma.ExpenseFindManyArgs> = z.object({ select: ExpenseFindManySelectSchema.optional(), include: z.lazy(() => ExpenseIncludeObjectSchema.optional()), orderBy: z.union([ExpenseOrderByWithRelationInputObjectSchema, ExpenseOrderByWithRelationInputObjectSchema.array()]).optional(), where: ExpenseWhereInputObjectSchema.optional(), cursor: ExpenseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ExpenseScalarFieldEnumSchema, ExpenseScalarFieldEnumSchema.array()]).optional() }).strict();

export const ExpenseFindManyZodSchema = z.object({ select: ExpenseFindManySelectSchema.optional(), include: z.lazy(() => ExpenseIncludeObjectSchema.optional()), orderBy: z.union([ExpenseOrderByWithRelationInputObjectSchema, ExpenseOrderByWithRelationInputObjectSchema.array()]).optional(), where: ExpenseWhereInputObjectSchema.optional(), cursor: ExpenseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ExpenseScalarFieldEnumSchema, ExpenseScalarFieldEnumSchema.array()]).optional() }).strict();