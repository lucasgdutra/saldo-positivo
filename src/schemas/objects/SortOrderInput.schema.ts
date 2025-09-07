import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { NullsOrderSchema } from "../enums/NullsOrder.schema";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			sort: SortOrderSchema,
			nulls: NullsOrderSchema.optional(),
		})
		.strict();
export const SortOrderInputObjectSchema: z.ZodType<Prisma.SortOrderInput> =
	makeSchema() as unknown as z.ZodType<Prisma.SortOrderInput>;
export const SortOrderInputObjectZodSchema = makeSchema();
