import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseWhereInputObjectSchema } from "./ExpenseWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			every: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
			some: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
			none: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
		})
		.strict();
export const ExpenseListRelationFilterObjectSchema: z.ZodType<Prisma.ExpenseListRelationFilter> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseListRelationFilter>;
export const ExpenseListRelationFilterObjectZodSchema = makeSchema();
