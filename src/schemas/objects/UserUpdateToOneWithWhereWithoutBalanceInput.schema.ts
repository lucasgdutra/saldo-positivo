import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserUncheckedUpdateWithoutBalanceInputObjectSchema } from "./UserUncheckedUpdateWithoutBalanceInput.schema";
import { UserUpdateWithoutBalanceInputObjectSchema } from "./UserUpdateWithoutBalanceInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

export const UserUpdateToOneWithWhereWithoutBalanceInputObjectSchema: z.ZodType<
	Prisma.UserUpdateToOneWithWhereWithoutBalanceInput,
	Prisma.UserUpdateToOneWithWhereWithoutBalanceInput
> = z
	.object({
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema),
		]),
	})
	.strict();
export const UserUpdateToOneWithWhereWithoutBalanceInputObjectZodSchema = z
	.object({
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema),
		]),
	})
	.strict();
