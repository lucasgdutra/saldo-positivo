import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: SortOrderSchema.optional(),
			totalAmount: SortOrderSchema.optional(),
			totalRevenues: SortOrderSchema.optional(),
			totalExpenses: SortOrderSchema.optional(),
			referenceMonth: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
			user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
		})
		.strict();
export const BalanceOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.BalanceOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceOrderByWithRelationInput>;
export const BalanceOrderByWithRelationInputObjectZodSchema = makeSchema();
