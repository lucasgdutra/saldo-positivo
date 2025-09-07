import { z } from "zod";
import { UserCreateManyInputObjectSchema } from "./objects/UserCreateManyInput.schema";
import { UserSelectObjectSchema } from "./objects/UserSelect.schema";

export const UserCreateManyAndReturnSchema = z
	.object({
		select: UserSelectObjectSchema.optional(),
		data: z.union([
			UserCreateManyInputObjectSchema,
			z.array(UserCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
