import { z } from "zod";
import { PasswordResetTokenScalarFieldEnumSchema } from "./enums/PasswordResetTokenScalarFieldEnum.schema";
import { PasswordResetTokenCountAggregateInputObjectSchema } from "./objects/PasswordResetTokenCountAggregateInput.schema";
import { PasswordResetTokenMaxAggregateInputObjectSchema } from "./objects/PasswordResetTokenMaxAggregateInput.schema";
import { PasswordResetTokenMinAggregateInputObjectSchema } from "./objects/PasswordResetTokenMinAggregateInput.schema";
import { PasswordResetTokenOrderByWithAggregationInputObjectSchema } from "./objects/PasswordResetTokenOrderByWithAggregationInput.schema";
import { PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema } from "./objects/PasswordResetTokenScalarWhereWithAggregatesInput.schema";
import { PasswordResetTokenWhereInputObjectSchema } from "./objects/PasswordResetTokenWhereInput.schema";

export const PasswordResetTokenGroupBySchema = z.object({
	where: PasswordResetTokenWhereInputObjectSchema.optional(),
	orderBy: z
		.union([
			PasswordResetTokenOrderByWithAggregationInputObjectSchema,
			PasswordResetTokenOrderByWithAggregationInputObjectSchema.array(),
		])
		.optional(),
	having:
		PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	by: z.array(PasswordResetTokenScalarFieldEnumSchema),
	_count: z
		.union([z.literal(true), PasswordResetTokenCountAggregateInputObjectSchema])
		.optional(),
	_min: PasswordResetTokenMinAggregateInputObjectSchema.optional(),
	_max: PasswordResetTokenMaxAggregateInputObjectSchema.optional(),
});
