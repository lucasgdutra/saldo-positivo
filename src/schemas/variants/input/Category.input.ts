import { z } from "zod";

// prettier-ignore
export const CategoryInputSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		color: z.string(),
		icon: z.string(),
		userId: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
		user: z.unknown(),
		expenses: z.array(z.unknown()),
	})
	.strict();

export type CategoryInputType = z.infer<typeof CategoryInputSchema>;
