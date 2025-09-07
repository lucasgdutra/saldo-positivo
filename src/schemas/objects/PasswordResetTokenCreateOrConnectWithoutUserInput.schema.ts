import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from "./PasswordResetTokenCreateWithoutUserInput.schema";
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from "./PasswordResetTokenUncheckedCreateWithoutUserInput.schema";
import { PasswordResetTokenWhereUniqueInputObjectSchema } from "./PasswordResetTokenWhereUniqueInput.schema";

export const PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput,
	Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput
> = z
	.object({
		where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema),
			z.lazy(
				() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema,
			),
		]),
	})
	.strict();
export const PasswordResetTokenCreateOrConnectWithoutUserInputObjectZodSchema =
	z
		.object({
			where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema),
				z.lazy(
					() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema,
				),
			]),
		})
		.strict();
