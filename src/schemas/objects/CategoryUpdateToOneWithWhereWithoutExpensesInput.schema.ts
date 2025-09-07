import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryUncheckedUpdateWithoutExpensesInputObjectSchema } from "./CategoryUncheckedUpdateWithoutExpensesInput.schema";
import { CategoryUpdateWithoutExpensesInputObjectSchema } from "./CategoryUpdateWithoutExpensesInput.schema";
import { CategoryWhereInputObjectSchema } from "./CategoryWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => CategoryUpdateWithoutExpensesInputObjectSchema),
				z.lazy(() => CategoryUncheckedUpdateWithoutExpensesInputObjectSchema),
			]),
		})
		.strict();
export const CategoryUpdateToOneWithWhereWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutExpensesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutExpensesInput>;
export const CategoryUpdateToOneWithWhereWithoutExpensesInputObjectZodSchema =
	makeSchema();
