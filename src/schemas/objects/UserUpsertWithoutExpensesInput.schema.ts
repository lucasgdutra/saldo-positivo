import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutExpensesInputObjectSchema } from "./UserCreateWithoutExpensesInput.schema";
import { UserUncheckedCreateWithoutExpensesInputObjectSchema } from "./UserUncheckedCreateWithoutExpensesInput.schema";
import { UserUncheckedUpdateWithoutExpensesInputObjectSchema } from "./UserUncheckedUpdateWithoutExpensesInput.schema";
import { UserUpdateWithoutExpensesInputObjectSchema } from "./UserUpdateWithoutExpensesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

export const UserUpsertWithoutExpensesInputObjectSchema: z.ZodType<
	Prisma.UserUpsertWithoutExpensesInput,
	Prisma.UserUpsertWithoutExpensesInput
> = z
	.object({
		update: z.union([
			z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutExpensesInputObjectSchema),
			z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema),
		]),
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
	})
	.strict();
export const UserUpsertWithoutExpensesInputObjectZodSchema = z
	.object({
		update: z.union([
			z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutExpensesInputObjectSchema),
			z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema),
		]),
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
	})
	.strict();
