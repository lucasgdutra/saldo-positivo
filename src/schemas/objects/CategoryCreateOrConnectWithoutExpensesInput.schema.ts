import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateWithoutExpensesInputObjectSchema } from "./CategoryCreateWithoutExpensesInput.schema";
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from "./CategoryUncheckedCreateWithoutExpensesInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema),
				z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema),
			]),
		})
		.strict();
export const CategoryCreateOrConnectWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutExpensesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateOrConnectWithoutExpensesInput>;
export const CategoryCreateOrConnectWithoutExpensesInputObjectZodSchema =
	makeSchema();
