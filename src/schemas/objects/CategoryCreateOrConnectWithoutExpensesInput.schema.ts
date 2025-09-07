import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateWithoutExpensesInputObjectSchema } from "./CategoryCreateWithoutExpensesInput.schema";
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from "./CategoryUncheckedCreateWithoutExpensesInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

export const CategoryCreateOrConnectWithoutExpensesInputObjectSchema: z.ZodType<
	Prisma.CategoryCreateOrConnectWithoutExpensesInput,
	Prisma.CategoryCreateOrConnectWithoutExpensesInput
> = z
	.object({
		where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema),
			z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema),
		]),
	})
	.strict();
export const CategoryCreateOrConnectWithoutExpensesInputObjectZodSchema = z
	.object({
		where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema),
			z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema),
		]),
	})
	.strict();
