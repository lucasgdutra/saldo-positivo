import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryUncheckedUpdateWithoutUserInputObjectSchema } from "./CategoryUncheckedUpdateWithoutUserInput.schema";
import { CategoryUpdateWithoutUserInputObjectSchema } from "./CategoryUpdateWithoutUserInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => CategoryUpdateWithoutUserInputObjectSchema),
				z.lazy(() => CategoryUncheckedUpdateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const CategoryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput>;
export const CategoryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
