import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedUpdateWithoutCategoryInput.schema";
import { ExpenseUpdateWithoutCategoryInputObjectSchema } from "./ExpenseUpdateWithoutCategoryInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema),
				z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema),
			]),
		})
		.strict();
export const ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput>;
export const ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectZodSchema =
	makeSchema();
