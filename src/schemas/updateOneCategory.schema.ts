import { z } from "zod";
import { CategoryIncludeObjectSchema } from "./objects/CategoryInclude.schema";
import { CategorySelectObjectSchema } from "./objects/CategorySelect.schema";
import { CategoryUncheckedUpdateInputObjectSchema } from "./objects/CategoryUncheckedUpdateInput.schema";
import { CategoryUpdateInputObjectSchema } from "./objects/CategoryUpdateInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./objects/CategoryWhereUniqueInput.schema";

export const CategoryUpdateOneSchema = z.object({
	select: CategorySelectObjectSchema.optional(),
	include: CategoryIncludeObjectSchema.optional(),
	data: z.union([
		CategoryUpdateInputObjectSchema,
		CategoryUncheckedUpdateInputObjectSchema,
	]),
	where: CategoryWhereUniqueInputObjectSchema,
});
