import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateOrConnectWithoutExpensesInputObjectSchema } from "./CategoryCreateOrConnectWithoutExpensesInput.schema";
import { CategoryCreateWithoutExpensesInputObjectSchema } from "./CategoryCreateWithoutExpensesInput.schema";
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from "./CategoryUncheckedCreateWithoutExpensesInput.schema";
import { CategoryUncheckedUpdateWithoutExpensesInputObjectSchema } from "./CategoryUncheckedUpdateWithoutExpensesInput.schema";
import { CategoryUpdateToOneWithWhereWithoutExpensesInputObjectSchema } from "./CategoryUpdateToOneWithWhereWithoutExpensesInput.schema";
import { CategoryUpdateWithoutExpensesInputObjectSchema } from "./CategoryUpdateWithoutExpensesInput.schema";
import { CategoryUpsertWithoutExpensesInputObjectSchema } from "./CategoryUpsertWithoutExpensesInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
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
			upsert: z
				.lazy(() => CategoryUpsertWithoutExpensesInputObjectSchema)
				.optional(),
			connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => CategoryUpdateToOneWithWhereWithoutExpensesInputObjectSchema,
					),
					z.lazy(() => CategoryUpdateWithoutExpensesInputObjectSchema),
					z.lazy(() => CategoryUncheckedUpdateWithoutExpensesInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutExpensesNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutExpensesNestedInput>;
export const CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectZodSchema =
	makeSchema();
