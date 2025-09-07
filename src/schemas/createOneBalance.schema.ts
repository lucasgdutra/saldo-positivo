import { z } from "zod";
import { BalanceCreateInputObjectSchema } from "./objects/BalanceCreateInput.schema";
import { BalanceIncludeObjectSchema } from "./objects/BalanceInclude.schema";
import { BalanceSelectObjectSchema } from "./objects/BalanceSelect.schema";
import { BalanceUncheckedCreateInputObjectSchema } from "./objects/BalanceUncheckedCreateInput.schema";

export const BalanceCreateOneSchema = z.object({
	select: BalanceSelectObjectSchema.optional(),
	include: BalanceIncludeObjectSchema.optional(),
	data: z.union([
		BalanceCreateInputObjectSchema,
		BalanceUncheckedCreateInputObjectSchema,
	]),
});
