import { z } from "zod";
import { CategoryScalarFieldEnumSchema } from "./enums/CategoryScalarFieldEnum.schema";
import { CategoryCountAggregateInputObjectSchema } from "./objects/CategoryCountAggregateInput.schema";
import { CategoryMaxAggregateInputObjectSchema } from "./objects/CategoryMaxAggregateInput.schema";
import { CategoryMinAggregateInputObjectSchema } from "./objects/CategoryMinAggregateInput.schema";
import { CategoryOrderByWithAggregationInputObjectSchema } from "./objects/CategoryOrderByWithAggregationInput.schema";
import { CategoryScalarWhereWithAggregatesInputObjectSchema } from "./objects/CategoryScalarWhereWithAggregatesInput.schema";
import { CategoryWhereInputObjectSchema } from "./objects/CategoryWhereInput.schema";

export const CategoryGroupBySchema = z.object({
	where: CategoryWhereInputObjectSchema.optional(),
	orderBy: z
		.union([
			CategoryOrderByWithAggregationInputObjectSchema,
			CategoryOrderByWithAggregationInputObjectSchema.array(),
		])
		.optional(),
	having: CategoryScalarWhereWithAggregatesInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	by: z.array(CategoryScalarFieldEnumSchema),
	_count: z
		.union([z.literal(true), CategoryCountAggregateInputObjectSchema])
		.optional(),
	_min: CategoryMinAggregateInputObjectSchema.optional(),
	_max: CategoryMaxAggregateInputObjectSchema.optional(),
});
