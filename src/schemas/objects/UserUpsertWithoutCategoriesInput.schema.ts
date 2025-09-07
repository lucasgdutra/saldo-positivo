import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutCategoriesInputObjectSchema } from "./UserCreateWithoutCategoriesInput.schema";
import { UserUncheckedCreateWithoutCategoriesInputObjectSchema } from "./UserUncheckedCreateWithoutCategoriesInput.schema";
import { UserUncheckedUpdateWithoutCategoriesInputObjectSchema } from "./UserUncheckedUpdateWithoutCategoriesInput.schema";
import { UserUpdateWithoutCategoriesInputObjectSchema } from "./UserUpdateWithoutCategoriesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

export const UserUpsertWithoutCategoriesInputObjectSchema: z.ZodType<
	Prisma.UserUpsertWithoutCategoriesInput,
	Prisma.UserUpsertWithoutCategoriesInput
> = z
	.object({
		update: z.union([
			z.lazy(() => UserUpdateWithoutCategoriesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutCategoriesInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema),
			z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema),
		]),
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
	})
	.strict();
export const UserUpsertWithoutCategoriesInputObjectZodSchema = z
	.object({
		update: z.union([
			z.lazy(() => UserUpdateWithoutCategoriesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutCategoriesInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema),
			z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema),
		]),
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
	})
	.strict();
