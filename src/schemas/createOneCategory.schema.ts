import { z } from "zod";
import { CategoryCreateInputObjectSchema } from "./objects/CategoryCreateInput.schema";
import { CategoryIncludeObjectSchema } from "./objects/CategoryInclude.schema";
import { CategorySelectObjectSchema } from "./objects/CategorySelect.schema";
import { CategoryUncheckedCreateInputObjectSchema } from "./objects/CategoryUncheckedCreateInput.schema";

export const CategoryCreateOneSchema = z.object({
	select: CategorySelectObjectSchema.optional(),
	include: CategoryIncludeObjectSchema.optional(),
	data: z.union([
		CategoryCreateInputObjectSchema,
		CategoryUncheckedCreateInputObjectSchema,
	]),
});
