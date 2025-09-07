import { z } from 'zod';

export const RevenueScalarFieldEnumSchema = z.enum(['id', 'amount', 'description', 'date', 'createdAt', 'updatedAt', 'userId'])

export type RevenueScalarFieldEnum = z.infer<typeof RevenueScalarFieldEnumSchema>;