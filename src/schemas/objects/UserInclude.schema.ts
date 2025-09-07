import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryFindManySchema } from "../findManyCategory.schema";
import { ExpenseFindManySchema } from "../findManyExpense.schema";
import { PasswordResetTokenFindManySchema } from "../findManyPasswordResetToken.schema";
import { RevenueFindManySchema } from "../findManyRevenue.schema";
import { BalanceArgsObjectSchema } from "./BalanceArgs.schema";
import { UserCountOutputTypeArgsObjectSchema } from "./UserCountOutputTypeArgs.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
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
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> =
	makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
