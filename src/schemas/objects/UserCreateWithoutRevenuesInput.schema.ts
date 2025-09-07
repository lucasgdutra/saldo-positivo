import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceCreateNestedOneWithoutUserInputObjectSchema } from "./BalanceCreateNestedOneWithoutUserInput.schema";
import { CategoryCreateNestedManyWithoutUserInputObjectSchema } from "./CategoryCreateNestedManyWithoutUserInput.schema";
import { ExpenseCreateNestedManyWithoutUserInputObjectSchema } from "./ExpenseCreateNestedManyWithoutUserInput.schema";
import { PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema } from "./PasswordResetTokenCreateNestedManyWithoutUserInput.schema";

export const UserCreateWithoutRevenuesInputObjectSchema: z.ZodType<
	Prisma.UserCreateWithoutRevenuesInput,
	Prisma.UserCreateWithoutRevenuesInput
> = z
	.object({
		id: z.string().optional(),
		email: z.string(),
		password: z.string(),
		name: z.string(),
		salaryRange: z.string().nullish(),
		usageMotivation: z.string().nullish(),
		customMotivation: z.string().nullish(),
		financialGoals: z.string().nullish(),
		hasDebts: z.boolean().nullish(),
		familySize: z.number().int().nullish(),
		financialExperience: z.string().nullish(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		categories: z
			.lazy(() => CategoryCreateNestedManyWithoutUserInputObjectSchema)
			.optional(),
		expenses: z
			.lazy(() => ExpenseCreateNestedManyWithoutUserInputObjectSchema)
			.optional(),
		balance: z
			.lazy(() => BalanceCreateNestedOneWithoutUserInputObjectSchema)
			.optional(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema,
			)
			.optional(),
	})
	.strict();
export const UserCreateWithoutRevenuesInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		email: z.string(),
		password: z.string(),
		name: z.string(),
		salaryRange: z.string().nullish(),
		usageMotivation: z.string().nullish(),
		customMotivation: z.string().nullish(),
		financialGoals: z.string().nullish(),
		hasDebts: z.boolean().nullish(),
		familySize: z.number().int().nullish(),
		financialExperience: z.string().nullish(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		categories: z
			.lazy(() => CategoryCreateNestedManyWithoutUserInputObjectSchema)
			.optional(),
		expenses: z
			.lazy(() => ExpenseCreateNestedManyWithoutUserInputObjectSchema)
			.optional(),
		balance: z
			.lazy(() => BalanceCreateNestedOneWithoutUserInputObjectSchema)
			.optional(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema,
			)
			.optional(),
	})
	.strict();
