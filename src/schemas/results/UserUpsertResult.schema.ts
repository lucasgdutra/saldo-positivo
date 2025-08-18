import { z } from 'zod';
export const UserUpsertResultSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  salaryRange: z.string().optional(),
  usageMotivation: z.string().optional(),
  customMotivation: z.string().optional(),
  financialGoals: z.string().optional(),
  hasDebts: z.boolean().optional(),
  monthlyIncome: z.string().optional(),
  familySize: z.number().int().optional(),
  financialExperience: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categories: z.array(z.unknown()),
  expenses: z.array(z.unknown()),
  revenues: z.array(z.unknown()),
  balance: z.unknown().optional(),
  passwordResetTokens: z.array(z.unknown())
});