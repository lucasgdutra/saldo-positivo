import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateOrConnectWithoutExpensesInputObjectSchema } from "./CategoryCreateOrConnectWithoutExpensesInput.schema";
import { CategoryCreateWithoutExpensesInputObjectSchema } from "./CategoryCreateWithoutExpensesInput.schema";
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from "./CategoryUncheckedCreateWithoutExpensesInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

export const CategoryCreateNestedOneWithoutExpensesInputObjectSchema: z.ZodType<
	Prisma.CategoryCreateNestedOneWithoutExpensesInput,
	Prisma.CategoryCreateNestedOneWithoutExpensesInput
> = z
	.object({
		create: z
			.union([
				z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema),
				z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => CategoryCreateOrConnectWithoutExpensesInputObjectSchema)
			.optional(),
		connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
	})
	.strict();
export const CategoryCreateNestedOneWithoutExpensesInputObjectZodSchema = z
	.object({
		create: z
			.union([
				z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema),
				z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => CategoryCreateOrConnectWithoutExpensesInputObjectSchema)
			.optional(),
		connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
	})
	.strict();
