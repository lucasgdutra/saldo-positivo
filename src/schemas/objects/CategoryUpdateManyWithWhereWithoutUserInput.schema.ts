import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryScalarWhereInputObjectSchema } from "./CategoryScalarWhereInput.schema";
import { CategoryUncheckedUpdateManyWithoutUserInputObjectSchema } from "./CategoryUncheckedUpdateManyWithoutUserInput.schema";
import { CategoryUpdateManyMutationInputObjectSchema } from "./CategoryUpdateManyMutationInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => CategoryScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => CategoryUpdateManyMutationInputObjectSchema),
				z.lazy(() => CategoryUncheckedUpdateManyWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const CategoryUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUpdateManyWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateManyWithWhereWithoutUserInput>;
export const CategoryUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
