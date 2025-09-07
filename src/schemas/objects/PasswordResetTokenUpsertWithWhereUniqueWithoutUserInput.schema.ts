import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from "./PasswordResetTokenCreateWithoutUserInput.schema";
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from "./PasswordResetTokenUncheckedCreateWithoutUserInput.schema";
import { PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema } from "./PasswordResetTokenUncheckedUpdateWithoutUserInput.schema";
import { PasswordResetTokenUpdateWithoutUserInputObjectSchema } from "./PasswordResetTokenUpdateWithoutUserInput.schema";
import { PasswordResetTokenWhereUniqueInputObjectSchema } from "./PasswordResetTokenWhereUniqueInput.schema";

export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput,
	Prisma.PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput
> = z
	.object({
		where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
		update: z.union([
			z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema),
			z.lazy(
				() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema,
			),
		]),
		create: z.union([
			z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema),
			z.lazy(
				() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema,
			),
		]),
	})
	.strict();
export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
	z
		.object({
			where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema),
				z.lazy(
					() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema,
				),
			]),
			create: z.union([
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema),
				z.lazy(
					() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema,
				),
			]),
		})
		.strict();
