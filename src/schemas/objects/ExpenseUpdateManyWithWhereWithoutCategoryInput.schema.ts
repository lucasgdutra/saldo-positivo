import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseScalarWhereInputObjectSchema } from "./ExpenseScalarWhereInput.schema";
import { ExpenseUncheckedUpdateManyWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedUpdateManyWithoutCategoryInput.schema";
import { ExpenseUpdateManyMutationInputObjectSchema } from "./ExpenseUpdateManyMutationInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => ExpenseScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => ExpenseUpdateManyMutationInputObjectSchema),
				z.lazy(
					() => ExpenseUncheckedUpdateManyWithoutCategoryInputObjectSchema,
				),
			]),
		})
		.strict();
export const ExpenseUpdateManyWithWhereWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput>;
export const ExpenseUpdateManyWithWhereWithoutCategoryInputObjectZodSchema =
	makeSchema();
