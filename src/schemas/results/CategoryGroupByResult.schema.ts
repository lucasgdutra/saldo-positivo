import { z } from "zod";
export const CategoryGroupByResultSchema = z.array(
	z.object({
		id: z.string(),
		name: z.string(),
		color: z.string(),
		icon: z.string(),
		userId: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
		_count: z
			.object({
				id: z.number(),
				name: z.number(),
				color: z.number(),
				icon: z.number(),
				userId: z.number(),
				createdAt: z.number(),
				updatedAt: z.number(),
				user: z.number(),
				expenses: z.number(),
			})
			.optional(),
		_min: z
			.object({
				id: z.string().nullable(),
				name: z.string().nullable(),
				color: z.string().nullable(),
				icon: z.string().nullable(),
				userId: z.string().nullable(),
				createdAt: z.date().nullable(),
				updatedAt: z.date().nullable(),
			})
			.nullable()
			.optional(),
		_max: z
			.object({
				id: z.string().nullable(),
				name: z.string().nullable(),
				color: z.string().nullable(),
				icon: z.string().nullable(),
				userId: z.string().nullable(),
				createdAt: z.date().nullable(),
				updatedAt: z.date().nullable(),
			})
			.nullable()
			.optional(),
	}),
);
