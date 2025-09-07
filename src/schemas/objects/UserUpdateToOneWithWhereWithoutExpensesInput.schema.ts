import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserUncheckedUpdateWithoutExpensesInputObjectSchema } from "./UserUncheckedUpdateWithoutExpensesInput.schema";
import { UserUpdateWithoutExpensesInputObjectSchema } from "./UserUpdateWithoutExpensesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

export const UserUpdateToOneWithWhereWithoutExpensesInputObjectSchema: z.ZodType<
	Prisma.UserUpdateToOneWithWhereWithoutExpensesInput,
	Prisma.UserUpdateToOneWithWhereWithoutExpensesInput
> = z
	.object({
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema),
		]),
	})
	.strict();
export const UserUpdateToOneWithWhereWithoutExpensesInputObjectZodSchema = z
	.object({
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema),
		]),
	})
	.strict();
