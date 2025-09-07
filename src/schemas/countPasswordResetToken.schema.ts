import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PasswordResetTokenOrderByWithRelationInputObjectSchema } from './objects/PasswordResetTokenOrderByWithRelationInput.schema';
import { PasswordResetTokenWhereInputObjectSchema } from './objects/PasswordResetTokenWhereInput.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './objects/PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenCountAggregateInputObjectSchema } from './objects/PasswordResetTokenCountAggregateInput.schema';

export const PasswordResetTokenCountSchema: z.ZodType<Prisma.PasswordResetTokenCountArgs> = z.object({ orderBy: z.union([PasswordResetTokenOrderByWithRelationInputObjectSchema, PasswordResetTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: PasswordResetTokenWhereInputObjectSchema.optional(), cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PasswordResetTokenCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PasswordResetTokenCountArgs>;

export const PasswordResetTokenCountZodSchema = z.object({ orderBy: z.union([PasswordResetTokenOrderByWithRelationInputObjectSchema, PasswordResetTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: PasswordResetTokenWhereInputObjectSchema.optional(), cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PasswordResetTokenCountAggregateInputObjectSchema ]).optional() }).strict();