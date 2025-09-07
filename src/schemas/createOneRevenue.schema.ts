import { z } from "zod";
import { RevenueCreateInputObjectSchema } from "./objects/RevenueCreateInput.schema";
import { RevenueIncludeObjectSchema } from "./objects/RevenueInclude.schema";
import { RevenueSelectObjectSchema } from "./objects/RevenueSelect.schema";
import { RevenueUncheckedCreateInputObjectSchema } from "./objects/RevenueUncheckedCreateInput.schema";

export const RevenueCreateOneSchema = z.object({
	select: RevenueSelectObjectSchema.optional(),
	include: RevenueIncludeObjectSchema.optional(),
	data: z.union([
		RevenueCreateInputObjectSchema,
		RevenueUncheckedCreateInputObjectSchema,
	]),
});
