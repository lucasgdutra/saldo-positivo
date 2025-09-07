import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema } from "./PasswordResetTokenUncheckedUpdateWithoutUserInput.schema";
import { PasswordResetTokenUpdateWithoutUserInputObjectSchema } from "./PasswordResetTokenUpdateWithoutUserInput.schema";
import { PasswordResetTokenWhereUniqueInputObjectSchema } from "./PasswordResetTokenWhereUniqueInput.schema";

export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput,
	Prisma.PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput
> = z
	.object({
		where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
		data: z.union([
			z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema),
			z.lazy(
				() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema,
			),
		]),
	})
	.strict();
export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
	z
		.object({
			where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema),
				z.lazy(
					() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema,
				),
			]),
		})
		.strict();
