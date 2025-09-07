import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateWithoutUserInputObjectSchema } from "./CategoryCreateWithoutUserInput.schema";
import { CategoryUncheckedCreateWithoutUserInputObjectSchema } from "./CategoryUncheckedCreateWithoutUserInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

export const CategoryCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<
	Prisma.CategoryCreateOrConnectWithoutUserInput,
	Prisma.CategoryCreateOrConnectWithoutUserInput
> = z
	.object({
		where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => CategoryCreateWithoutUserInputObjectSchema),
			z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
export const CategoryCreateOrConnectWithoutUserInputObjectZodSchema = z
	.object({
		where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => CategoryCreateWithoutUserInputObjectSchema),
			z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
