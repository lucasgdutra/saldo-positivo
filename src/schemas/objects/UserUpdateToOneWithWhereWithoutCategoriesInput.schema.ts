import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserUncheckedUpdateWithoutCategoriesInputObjectSchema } from "./UserUncheckedUpdateWithoutCategoriesInput.schema";
import { UserUpdateWithoutCategoriesInputObjectSchema } from "./UserUpdateWithoutCategoriesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

export const UserUpdateToOneWithWhereWithoutCategoriesInputObjectSchema: z.ZodType<
	Prisma.UserUpdateToOneWithWhereWithoutCategoriesInput,
	Prisma.UserUpdateToOneWithWhereWithoutCategoriesInput
> = z
	.object({
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutCategoriesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutCategoriesInputObjectSchema),
		]),
	})
	.strict();
export const UserUpdateToOneWithWhereWithoutCategoriesInputObjectZodSchema = z
	.object({
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutCategoriesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutCategoriesInputObjectSchema),
		]),
	})
	.strict();
