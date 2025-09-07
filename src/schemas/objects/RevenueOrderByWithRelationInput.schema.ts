import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: SortOrderSchema.optional(),
			amount: SortOrderSchema.optional(),
			description: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			date: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
			user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
		})
		.strict();
export const RevenueOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RevenueOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueOrderByWithRelationInput>;
export const RevenueOrderByWithRelationInputObjectZodSchema = makeSchema();
