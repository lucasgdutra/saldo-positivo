import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceCreateNestedOneWithoutUserInputObjectSchema } from "./BalanceCreateNestedOneWithoutUserInput.schema";
import { ExpenseCreateNestedManyWithoutUserInputObjectSchema } from "./ExpenseCreateNestedManyWithoutUserInput.schema";
import { PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema } from "./PasswordResetTokenCreateNestedManyWithoutUserInput.schema";
import { RevenueCreateNestedManyWithoutUserInputObjectSchema } from "./RevenueCreateNestedManyWithoutUserInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
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
			expenses: z
				.lazy(() => ExpenseCreateNestedManyWithoutUserInputObjectSchema)
				.optional(),
			revenues: z
				.lazy(() => RevenueCreateNestedManyWithoutUserInputObjectSchema)
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
export const UserCreateWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutCategoriesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutCategoriesInput>;
export const UserCreateWithoutCategoriesInputObjectZodSchema = makeSchema();
