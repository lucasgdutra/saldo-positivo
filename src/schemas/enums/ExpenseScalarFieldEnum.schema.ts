import { z } from 'zod';

export const ExpenseScalarFieldEnumSchema = z.enum(['id', 'amount', 'description', 'date', 'createdAt', 'updatedAt', 'userId', 'categoryId'])

export type ExpenseScalarFieldEnum = z.infer<typeof ExpenseScalarFieldEnumSchema>;