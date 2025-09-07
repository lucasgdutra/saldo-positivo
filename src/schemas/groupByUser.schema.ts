import { z } from "zod";
import { UserScalarFieldEnumSchema } from "./enums/UserScalarFieldEnum.schema";
import { UserCountAggregateInputObjectSchema } from "./objects/UserCountAggregateInput.schema";
import { UserMaxAggregateInputObjectSchema } from "./objects/UserMaxAggregateInput.schema";
import { UserMinAggregateInputObjectSchema } from "./objects/UserMinAggregateInput.schema";
import { UserOrderByWithAggregationInputObjectSchema } from "./objects/UserOrderByWithAggregationInput.schema";
import { UserScalarWhereWithAggregatesInputObjectSchema } from "./objects/UserScalarWhereWithAggregatesInput.schema";
import { UserWhereInputObjectSchema } from "./objects/UserWhereInput.schema";

export const UserGroupBySchema = z.object({
	where: UserWhereInputObjectSchema.optional(),
	orderBy: z
		.union([
			UserOrderByWithAggregationInputObjectSchema,
			UserOrderByWithAggregationInputObjectSchema.array(),
		])
		.optional(),
	having: UserScalarWhereWithAggregatesInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	by: z.array(UserScalarFieldEnumSchema),
	_count: z
		.union([z.literal(true), UserCountAggregateInputObjectSchema])
		.optional(),
	_min: UserMinAggregateInputObjectSchema.optional(),
	_max: UserMaxAggregateInputObjectSchema.optional(),
});
