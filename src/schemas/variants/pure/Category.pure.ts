import { z } from "zod";
// prettier-ignore
export const CategoryModelSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
		user: z.unknown(),
		expenses: z.array(z.unknown()),
	})
	.strict();

export type CategoryModelType = z.infer<typeof CategoryModelSchema>;
