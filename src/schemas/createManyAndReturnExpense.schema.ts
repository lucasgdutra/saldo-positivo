import { z } from "zod";
import { ExpenseCreateManyInputObjectSchema } from "./objects/ExpenseCreateManyInput.schema";
import { ExpenseSelectObjectSchema } from "./objects/ExpenseSelect.schema";

export const ExpenseCreateManyAndReturnSchema = z
	.object({
		select: ExpenseSelectObjectSchema.optional(),
		data: z.union([
			ExpenseCreateManyInputObjectSchema,
			z.array(ExpenseCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
