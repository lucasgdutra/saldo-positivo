import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'email', 'password', 'name', 'salaryRange', 'usageMotivation', 'customMotivation', 'financialGoals', 'hasDebts', 'familySize', 'financialExperience', 'createdAt', 'updatedAt'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;