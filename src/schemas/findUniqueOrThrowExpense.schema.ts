import { z } from "zod";
import { ExpenseIncludeObjectSchema } from "./objects/ExpenseInclude.schema";
import { ExpenseSelectObjectSchema } from "./objects/ExpenseSelect.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./objects/ExpenseWhereUniqueInput.schema";

export const ExpenseFindUniqueOrThrowSchema = z.object({
	select: ExpenseSelectObjectSchema.optional(),
	include: ExpenseIncludeObjectSchema.optional(),
	where: ExpenseWhereUniqueInputObjectSchema,
});
