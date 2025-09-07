import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutPasswordResetTokensInputObjectSchema } from "./UserCreateWithoutPasswordResetTokensInput.schema";
import { UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema } from "./UserUncheckedCreateWithoutPasswordResetTokensInput.schema";
import { UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema } from "./UserUncheckedUpdateWithoutPasswordResetTokensInput.schema";
import { UserUpdateWithoutPasswordResetTokensInputObjectSchema } from "./UserUpdateWithoutPasswordResetTokensInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

export const UserUpsertWithoutPasswordResetTokensInputObjectSchema: z.ZodType<
	Prisma.UserUpsertWithoutPasswordResetTokensInput,
	Prisma.UserUpsertWithoutPasswordResetTokensInput
> = z
	.object({
		update: z.union([
			z.lazy(() => UserUpdateWithoutPasswordResetTokensInputObjectSchema),
			z.lazy(
				() => UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema,
			),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema),
			z.lazy(
				() => UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema,
			),
		]),
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
	})
	.strict();
export const UserUpsertWithoutPasswordResetTokensInputObjectZodSchema = z
	.object({
		update: z.union([
			z.lazy(() => UserUpdateWithoutPasswordResetTokensInputObjectSchema),
			z.lazy(
				() => UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema,
			),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema),
			z.lazy(
				() => UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema,
			),
		]),
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
	})
	.strict();
