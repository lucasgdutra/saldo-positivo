import { z } from 'zod';

export const RevenueScalarFieldEnumSchema = z.enum(['id', 'amount', 'description', 'date', 'createdAt', 'updatedAt', 'userId'])