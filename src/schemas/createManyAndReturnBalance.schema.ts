import { z } from "zod";
import { BalanceCreateManyInputObjectSchema } from "./objects/BalanceCreateManyInput.schema";
import { BalanceSelectObjectSchema } from "./objects/BalanceSelect.schema";

export const BalanceCreateManyAndReturnSchema = z
	.object({
		select: BalanceSelectObjectSchema.optional(),
		data: z.union([
			BalanceCreateManyInputObjectSchema,
			z.array(BalanceCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
