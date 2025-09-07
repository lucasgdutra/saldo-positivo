import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryScalarWhereInputObjectSchema } from "./CategoryScalarWhereInput.schema";
import { CategoryUncheckedUpdateManyWithoutUserInputObjectSchema } from "./CategoryUncheckedUpdateManyWithoutUserInput.schema";
import { CategoryUpdateManyMutationInputObjectSchema } from "./CategoryUpdateManyMutationInput.schema";

export const CategoryUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<
	Prisma.CategoryUpdateManyWithWhereWithoutUserInput,
	Prisma.CategoryUpdateManyWithWhereWithoutUserInput
> = z
	.object({
		where: z.lazy(() => CategoryScalarWhereInputObjectSchema),
		data: z.union([
			z.lazy(() => CategoryUpdateManyMutationInputObjectSchema),
			z.lazy(() => CategoryUncheckedUpdateManyWithoutUserInputObjectSchema),
		]),
	})
	.strict();
export const CategoryUpdateManyWithWhereWithoutUserInputObjectZodSchema = z
	.object({
		where: z.lazy(() => CategoryScalarWhereInputObjectSchema),
		data: z.union([
			z.lazy(() => CategoryUpdateManyMutationInputObjectSchema),
			z.lazy(() => CategoryUncheckedUpdateManyWithoutUserInputObjectSchema),
		]),
	})
	.strict();
