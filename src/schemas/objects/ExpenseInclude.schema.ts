import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryArgsObjectSchema } from "./CategoryArgs.schema";
import { UserArgsObjectSchema } from "./UserArgs.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			user: z
				.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
				.optional(),
			category: z
				.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)])
				.optional(),
		})
		.strict();
export const ExpenseIncludeObjectSchema: z.ZodType<Prisma.ExpenseInclude> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseInclude>;
export const ExpenseIncludeObjectZodSchema = makeSchema();
