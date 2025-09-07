import { z } from 'zod';
import { PasswordResetTokenOrderByWithRelationInputObjectSchema } from './objects/PasswordResetTokenOrderByWithRelationInput.schema';
import { PasswordResetTokenWhereInputObjectSchema } from './objects/PasswordResetTokenWhereInput.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './objects/PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenCountAggregateInputObjectSchema } from './objects/PasswordResetTokenCountAggregateInput.schema';
import { PasswordResetTokenMinAggregateInputObjectSchema } from './objects/PasswordResetTokenMinAggregateInput.schema';
import { PasswordResetTokenMaxAggregateInputObjectSchema } from './objects/PasswordResetTokenMaxAggregateInput.schema';

export const PasswordResetTokenAggregateSchema = z.object({ orderBy: z.union([PasswordResetTokenOrderByWithRelationInputObjectSchema, PasswordResetTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: PasswordResetTokenWhereInputObjectSchema.optional(), cursor: PasswordResetTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PasswordResetTokenCountAggregateInputObjectSchema ]).optional(), _min: PasswordResetTokenMinAggregateInputObjectSchema.optional(), _max: PasswordResetTokenMaxAggregateInputObjectSchema.optional() })