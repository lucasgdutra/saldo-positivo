import { z } from "zod";
import { RevenueCreateInputObjectSchema } from "./objects/RevenueCreateInput.schema";
import { RevenueIncludeObjectSchema } from "./objects/RevenueInclude.schema";
import { RevenueSelectObjectSchema } from "./objects/RevenueSelect.schema";
import { RevenueUncheckedCreateInputObjectSchema } from "./objects/RevenueUncheckedCreateInput.schema";
import { RevenueUncheckedUpdateInputObjectSchema } from "./objects/RevenueUncheckedUpdateInput.schema";
import { RevenueUpdateInputObjectSchema } from "./objects/RevenueUpdateInput.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./objects/RevenueWhereUniqueInput.schema";

export const RevenueUpsertSchema = z.object({
	select: RevenueSelectObjectSchema.optional(),
	include: RevenueIncludeObjectSchema.optional(),
	where: RevenueWhereUniqueInputObjectSchema,
	create: z.union([
		RevenueCreateInputObjectSchema,
		RevenueUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		RevenueUpdateInputObjectSchema,
		RevenueUncheckedUpdateInputObjectSchema,
	]),
});
