import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryFindManySchema } from "../findManyCategory.schema";
import { ExpenseFindManySchema } from "../findManyExpense.schema";
import { PasswordResetTokenFindManySchema } from "../findManyPasswordResetToken.schema";
import { RevenueFindManySchema } from "../findManyRevenue.schema";
import { BalanceArgsObjectSchema } from "./BalanceArgs.schema";
import { UserCountOutputTypeArgsObjectSchema } from "./UserCountOutputTypeArgs.schema";

export const UserSelectObjectSchema: z.ZodType<
	Prisma.UserSelect,
	Prisma.UserSelect
> = z
	.object({
		id: z.boolean().optional(),
		email: z.boolean().optional(),
		password: z.boolean().optional(),
		name: z.boolean().optional(),
		salaryRange: z.boolean().optional(),
		usageMotivation: z.boolean().optional(),
		customMotivation: z.boolean().optional(),
		financialGoals: z.boolean().optional(),
		hasDebts: z.boolean().optional(),
		familySize: z.boolean().optional(),
		financialExperience: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		categories: z
			.union([z.boolean(), z.lazy(() => CategoryFindManySchema)])
			.optional(),
		expenses: z
			.union([z.boolean(), z.lazy(() => ExpenseFindManySchema)])
			.optional(),
		revenues: z
			.union([z.boolean(), z.lazy(() => RevenueFindManySchema)])
			.optional(),
		balance: z
			.union([z.boolean(), z.lazy(() => BalanceArgsObjectSchema)])
			.optional(),
		passwordResetTokens: z
			.union([z.boolean(), z.lazy(() => PasswordResetTokenFindManySchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
			.optional(),
	})
	.strict();
export const UserSelectObjectZodSchema = z
	.object({
		id: z.boolean().optional(),
		email: z.boolean().optional(),
		password: z.boolean().optional(),
		name: z.boolean().optional(),
		salaryRange: z.boolean().optional(),
		usageMotivation: z.boolean().optional(),
		customMotivation: z.boolean().optional(),
		financialGoals: z.boolean().optional(),
		hasDebts: z.boolean().optional(),
		familySize: z.boolean().optional(),
		financialExperience: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		categories: z
			.union([z.boolean(), z.lazy(() => CategoryFindManySchema)])
			.optional(),
		expenses: z
			.union([z.boolean(), z.lazy(() => ExpenseFindManySchema)])
			.optional(),
		revenues: z
			.union([z.boolean(), z.lazy(() => RevenueFindManySchema)])
			.optional(),
		balance: z
			.union([z.boolean(), z.lazy(() => BalanceArgsObjectSchema)])
			.optional(),
		passwordResetTokens: z
			.union([z.boolean(), z.lazy(() => PasswordResetTokenFindManySchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
			.optional(),
	})
	.strict();
