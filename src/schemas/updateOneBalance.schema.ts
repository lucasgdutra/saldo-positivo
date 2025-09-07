import { z } from "zod";
import { BalanceIncludeObjectSchema } from "./objects/BalanceInclude.schema";
import { BalanceSelectObjectSchema } from "./objects/BalanceSelect.schema";
import { BalanceUncheckedUpdateInputObjectSchema } from "./objects/BalanceUncheckedUpdateInput.schema";
import { BalanceUpdateInputObjectSchema } from "./objects/BalanceUpdateInput.schema";
import { BalanceWhereUniqueInputObjectSchema } from "./objects/BalanceWhereUniqueInput.schema";

export const BalanceUpdateOneSchema = z.object({
	select: BalanceSelectObjectSchema.optional(),
	include: BalanceIncludeObjectSchema.optional(),
	data: z.union([
		BalanceUpdateInputObjectSchema,
		BalanceUncheckedUpdateInputObjectSchema,
	]),
	where: BalanceWhereUniqueInputObjectSchema,
});
