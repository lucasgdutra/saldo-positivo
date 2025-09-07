import { z } from "zod";
import { RevenueSelectObjectSchema } from "./objects/RevenueSelect.schema";
import { RevenueUpdateManyMutationInputObjectSchema } from "./objects/RevenueUpdateManyMutationInput.schema";
import { RevenueWhereInputObjectSchema } from "./objects/RevenueWhereInput.schema";

export const RevenueUpdateManyAndReturnSchema = z
	.object({
		select: RevenueSelectObjectSchema.optional(),
		data: RevenueUpdateManyMutationInputObjectSchema,
		where: RevenueWhereInputObjectSchema.optional(),
	})
	.strict();
