import { z } from "zod";
import { CategoryCreateInputObjectSchema } from "./objects/CategoryCreateInput.schema";
import { CategoryIncludeObjectSchema } from "./objects/CategoryInclude.schema";
import { CategorySelectObjectSchema } from "./objects/CategorySelect.schema";
import { CategoryUncheckedCreateInputObjectSchema } from "./objects/CategoryUncheckedCreateInput.schema";
import { CategoryUncheckedUpdateInputObjectSchema } from "./objects/CategoryUncheckedUpdateInput.schema";
import { CategoryUpdateInputObjectSchema } from "./objects/CategoryUpdateInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./objects/CategoryWhereUniqueInput.schema";

export const CategoryUpsertSchema = z.object({
	select: CategorySelectObjectSchema.optional(),
	include: CategoryIncludeObjectSchema.optional(),
	where: CategoryWhereUniqueInputObjectSchema,
	create: z.union([
		CategoryCreateInputObjectSchema,
		CategoryUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		CategoryUpdateInputObjectSchema,
		CategoryUncheckedUpdateInputObjectSchema,
	]),
});
