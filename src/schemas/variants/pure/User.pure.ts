import { z } from 'zod';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
    name: z.string(),
    salaryRange: z.string().nullable(),
    usageMotivation: z.string().nullable(),
    customMotivation: z.string().nullable(),
    financialGoals: z.string().nullable(),
    hasDebts: z.boolean().nullable(),
    monthlyIncome: z.string().nullable(),
    familySize: z.number().int().nullable(),
    financialExperience: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    categories: z.array(z.unknown()),
    expenses: z.array(z.unknown()),
    revenues: z.array(z.unknown()),
    balance: z.unknown().nullable(),
    passwordResetTokens: z.array(z.unknown())
}).strict();

export type UserModelType = z.infer<typeof UserModelSchema>;
