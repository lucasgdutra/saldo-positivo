import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenScalarWhereInputObjectSchema } from "./PasswordResetTokenScalarWhereInput.schema";
import { PasswordResetTokenUncheckedUpdateManyWithoutUserInputObjectSchema } from "./PasswordResetTokenUncheckedUpdateManyWithoutUserInput.schema";
import { PasswordResetTokenUpdateManyMutationInputObjectSchema } from "./PasswordResetTokenUpdateManyMutationInput.schema";

export const PasswordResetTokenUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenUpdateManyWithWhereWithoutUserInput,
	Prisma.PasswordResetTokenUpdateManyWithWhereWithoutUserInput
> = z
	.object({
		where: z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema),
		data: z.union([
			z.lazy(() => PasswordResetTokenUpdateManyMutationInputObjectSchema),
			z.lazy(
				() => PasswordResetTokenUncheckedUpdateManyWithoutUserInputObjectSchema,
			),
		]),
	})
	.strict();
export const PasswordResetTokenUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	z
		.object({
			where: z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => PasswordResetTokenUpdateManyMutationInputObjectSchema),
				z.lazy(
					() =>
						PasswordResetTokenUncheckedUpdateManyWithoutUserInputObjectSchema,
				),
			]),
		})
		.strict();
