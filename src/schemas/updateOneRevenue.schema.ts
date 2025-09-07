import { z } from "zod";
import { RevenueIncludeObjectSchema } from "./objects/RevenueInclude.schema";
import { RevenueSelectObjectSchema } from "./objects/RevenueSelect.schema";
import { RevenueUncheckedUpdateInputObjectSchema } from "./objects/RevenueUncheckedUpdateInput.schema";
import { RevenueUpdateInputObjectSchema } from "./objects/RevenueUpdateInput.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./objects/RevenueWhereUniqueInput.schema";

export const RevenueUpdateOneSchema = z.object({
	select: RevenueSelectObjectSchema.optional(),
	include: RevenueIncludeObjectSchema.optional(),
	data: z.union([
		RevenueUpdateInputObjectSchema,
		RevenueUncheckedUpdateInputObjectSchema,
	]),
	where: RevenueWhereUniqueInputObjectSchema,
});
