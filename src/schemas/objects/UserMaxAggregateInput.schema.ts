import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.literal(true).optional(),
			email: z.literal(true).optional(),
			password: z.literal(true).optional(),
			name: z.literal(true).optional(),
			salaryRange: z.literal(true).optional(),
			usageMotivation: z.literal(true).optional(),
			customMotivation: z.literal(true).optional(),
			financialGoals: z.literal(true).optional(),
			hasDebts: z.literal(true).optional(),
			familySize: z.literal(true).optional(),
			financialExperience: z.literal(true).optional(),
			createdAt: z.literal(true).optional(),
			updatedAt: z.literal(true).optional(),
		})
		.strict();
export const UserMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.UserMaxAggregateInputType>;
export const UserMaxAggregateInputObjectZodSchema = makeSchema();
