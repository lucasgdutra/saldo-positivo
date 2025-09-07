import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateWithoutUserInputObjectSchema } from "./CategoryCreateWithoutUserInput.schema";
import { CategoryUncheckedCreateWithoutUserInputObjectSchema } from "./CategoryUncheckedCreateWithoutUserInput.schema";
import { CategoryUncheckedUpdateWithoutUserInputObjectSchema } from "./CategoryUncheckedUpdateWithoutUserInput.schema";
import { CategoryUpdateWithoutUserInputObjectSchema } from "./CategoryUpdateWithoutUserInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

export const CategoryUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<
	Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput,
	Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput
> = z
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
export const CategoryUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = z
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
