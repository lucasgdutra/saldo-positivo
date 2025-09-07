import { z } from "zod";
import { BalanceIncludeObjectSchema } from "./objects/BalanceInclude.schema";
import { BalanceSelectObjectSchema } from "./objects/BalanceSelect.schema";
import { BalanceWhereUniqueInputObjectSchema } from "./objects/BalanceWhereUniqueInput.schema";

export const BalanceFindUniqueSchema = z.object({
	select: BalanceSelectObjectSchema.optional(),
	include: BalanceIncludeObjectSchema.optional(),
	where: BalanceWhereUniqueInputObjectSchema,
});
