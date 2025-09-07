import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: SortOrderSchema.optional(),
			token: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
			expiresAt: SortOrderSchema.optional(),
			used: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
		})
		.strict();
export const PasswordResetTokenCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCountOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCountOrderByAggregateInput>;
export const PasswordResetTokenCountOrderByAggregateInputObjectZodSchema =
	makeSchema();
