import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedUpdateWithoutCategoryInput.schema";
import { ExpenseUpdateWithoutCategoryInputObjectSchema } from "./ExpenseUpdateWithoutCategoryInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

export const ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<
	Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput,
	Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput
> = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		data: z.union([
			z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema),
		]),
	})
	.strict();
export const ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectZodSchema = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		data: z.union([
			z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema),
		]),
	})
	.strict();
