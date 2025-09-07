import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateWithoutUserInputObjectSchema } from "./CategoryCreateWithoutUserInput.schema";
import { CategoryUncheckedCreateWithoutUserInputObjectSchema } from "./CategoryUncheckedCreateWithoutUserInput.schema";
import { CategoryUncheckedUpdateWithoutUserInputObjectSchema } from "./CategoryUncheckedUpdateWithoutUserInput.schema";
import { CategoryUpdateWithoutUserInputObjectSchema } from "./CategoryUpdateWithoutUserInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => CategoryUpdateWithoutUserInputObjectSchema),
				z.lazy(() => CategoryUncheckedUpdateWithoutUserInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => CategoryCreateWithoutUserInputObjectSchema),
				z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const CategoryUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput>;
export const CategoryUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
