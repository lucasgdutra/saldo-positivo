import { z } from "zod";
export const CategoryFindFirstResultSchema = z.nullable(
	z.object({
		id: z.string(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
		user: z.unknown(),
		expenses: z.array(z.unknown()),
	}),
);
