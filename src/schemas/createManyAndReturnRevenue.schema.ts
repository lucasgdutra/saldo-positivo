import { z } from "zod";
import { RevenueCreateManyInputObjectSchema } from "./objects/RevenueCreateManyInput.schema";
import { RevenueSelectObjectSchema } from "./objects/RevenueSelect.schema";

export const RevenueCreateManyAndReturnSchema = z
	.object({
		select: RevenueSelectObjectSchema.optional(),
		data: z.union([
			RevenueCreateManyInputObjectSchema,
			z.array(RevenueCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
