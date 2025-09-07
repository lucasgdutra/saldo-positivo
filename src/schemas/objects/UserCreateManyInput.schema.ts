import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string().optional(),
			email: z.string(),
			password: z.string(),
			name: z.string(),
			salaryRange: z.string().nullish(),
			usageMotivation: z.string().nullish(),
			customMotivation: z.string().nullish(),
			financialGoals: z.string().nullish(),
			hasDebts: z.boolean().nullish(),
			familySize: z.number().int().nullish(),
			financialExperience: z.string().nullish(),
			createdAt: z.date().optional(),
			updatedAt: z.date().optional(),
		})
		.strict();
export const UserCreateManyInputObjectSchema: z.ZodType<Prisma.UserCreateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateManyInput>;
export const UserCreateManyInputObjectZodSchema = makeSchema();
