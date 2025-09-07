import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserArgsObjectSchema } from "./UserArgs.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.boolean().optional(),
			amount: z.boolean().optional(),
			description: z.boolean().optional(),
			date: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			updatedAt: z.boolean().optional(),
			userId: z.boolean().optional(),
			user: z
				.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
				.optional(),
		})
		.strict();
export const RevenueSelectObjectSchema: z.ZodType<Prisma.RevenueSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueSelect>;
export const RevenueSelectObjectZodSchema = makeSchema();
