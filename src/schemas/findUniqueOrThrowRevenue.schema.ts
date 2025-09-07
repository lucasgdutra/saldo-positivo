import { z } from "zod";
import { RevenueIncludeObjectSchema } from "./objects/RevenueInclude.schema";
import { RevenueSelectObjectSchema } from "./objects/RevenueSelect.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./objects/RevenueWhereUniqueInput.schema";

export const RevenueFindUniqueOrThrowSchema = z.object({
	select: RevenueSelectObjectSchema.optional(),
	include: RevenueIncludeObjectSchema.optional(),
	where: RevenueWhereUniqueInputObjectSchema,
});
