import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateWithoutCategoryInputObjectSchema } from "./ExpenseCreateWithoutCategoryInput.schema";
import { ExpenseUncheckedCreateWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedCreateWithoutCategoryInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

export const ExpenseCreateOrConnectWithoutCategoryInputObjectSchema: z.ZodType<
	Prisma.ExpenseCreateOrConnectWithoutCategoryInput,
	Prisma.ExpenseCreateOrConnectWithoutCategoryInput
> = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema),
			z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema),
		]),
	})
	.strict();
export const ExpenseCreateOrConnectWithoutCategoryInputObjectZodSchema = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema),
			z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema),
		]),
	})
	.strict();
