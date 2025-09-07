import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutPasswordResetTokensInputObjectSchema } from "./UserCreateWithoutPasswordResetTokensInput.schema";
import { UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema } from "./UserUncheckedCreateWithoutPasswordResetTokensInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

export const UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema: z.ZodType<
	Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput,
	Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput
> = z
	.object({
		where: z.lazy(() => UserWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema),
			z.lazy(
				() => UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema,
			),
		]),
	})
	.strict();
export const UserCreateOrConnectWithoutPasswordResetTokensInputObjectZodSchema =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema),
				z.lazy(
					() => UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema,
				),
			]),
		})
		.strict();
