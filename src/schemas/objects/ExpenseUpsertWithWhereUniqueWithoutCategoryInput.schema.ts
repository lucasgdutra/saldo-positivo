import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateWithoutCategoryInputObjectSchema } from "./ExpenseCreateWithoutCategoryInput.schema";
import { ExpenseUncheckedCreateWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedCreateWithoutCategoryInput.schema";
import { ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedUpdateWithoutCategoryInput.schema";
import { ExpenseUpdateWithoutCategoryInputObjectSchema } from "./ExpenseUpdateWithoutCategoryInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

export const ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<
	Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput,
	Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput
> = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		update: z.union([
			z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema),
			z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema),
		]),
	})
	.strict();
export const ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectZodSchema = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		update: z.union([
			z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema),
			z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema),
		]),
	})
	.strict();
