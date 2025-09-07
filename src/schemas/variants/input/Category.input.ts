import { z } from "zod";
// prettier-ignore
export const CategoryInputSchema = z
	.object({
		name: z.string(),
		userId: z.string(),
		user: z.unknown(),
		expenses: z.array(z.unknown()),
	})
	.strict();

export type CategoryInputType = z.infer<typeof CategoryInputSchema>;
