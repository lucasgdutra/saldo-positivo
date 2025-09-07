import { z } from "zod";
import { ExpenseCreateInputObjectSchema } from "./objects/ExpenseCreateInput.schema";
import { ExpenseIncludeObjectSchema } from "./objects/ExpenseInclude.schema";
import { ExpenseSelectObjectSchema } from "./objects/ExpenseSelect.schema";
import { ExpenseUncheckedCreateInputObjectSchema } from "./objects/ExpenseUncheckedCreateInput.schema";
import { ExpenseUncheckedUpdateInputObjectSchema } from "./objects/ExpenseUncheckedUpdateInput.schema";
import { ExpenseUpdateInputObjectSchema } from "./objects/ExpenseUpdateInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./objects/ExpenseWhereUniqueInput.schema";

export const ExpenseUpsertSchema = z.object({
	select: ExpenseSelectObjectSchema.optional(),
	include: ExpenseIncludeObjectSchema.optional(),
	where: ExpenseWhereUniqueInputObjectSchema,
	create: z.union([
		ExpenseCreateInputObjectSchema,
		ExpenseUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		ExpenseUpdateInputObjectSchema,
		ExpenseUncheckedUpdateInputObjectSchema,
	]),
});
