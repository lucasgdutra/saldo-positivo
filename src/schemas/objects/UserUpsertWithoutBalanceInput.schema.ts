import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutBalanceInputObjectSchema } from "./UserCreateWithoutBalanceInput.schema";
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from "./UserUncheckedCreateWithoutBalanceInput.schema";
import { UserUncheckedUpdateWithoutBalanceInputObjectSchema } from "./UserUncheckedUpdateWithoutBalanceInput.schema";
import { UserUpdateWithoutBalanceInputObjectSchema } from "./UserUpdateWithoutBalanceInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

export const UserUpsertWithoutBalanceInputObjectSchema: z.ZodType<
	Prisma.UserUpsertWithoutBalanceInput,
	Prisma.UserUpsertWithoutBalanceInput
> = z
	.object({
		update: z.union([
			z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutBalanceInputObjectSchema),
			z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema),
		]),
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
	})
	.strict();
export const UserUpsertWithoutBalanceInputObjectZodSchema = z
	.object({
		update: z.union([
			z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutBalanceInputObjectSchema),
			z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema),
		]),
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
	})
	.strict();
