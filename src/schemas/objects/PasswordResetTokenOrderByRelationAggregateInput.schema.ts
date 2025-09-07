import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			_count: SortOrderSchema.optional(),
		})
		.strict();
export const PasswordResetTokenOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenOrderByRelationAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenOrderByRelationAggregateInput>;
export const PasswordResetTokenOrderByRelationAggregateInputObjectZodSchema =
	makeSchema();
