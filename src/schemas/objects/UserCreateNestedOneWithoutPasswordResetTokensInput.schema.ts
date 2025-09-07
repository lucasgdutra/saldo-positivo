import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema } from "./UserCreateOrConnectWithoutPasswordResetTokensInput.schema";
import { UserCreateWithoutPasswordResetTokensInputObjectSchema } from "./UserCreateWithoutPasswordResetTokensInput.schema";
import { UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema } from "./UserUncheckedCreateWithoutPasswordResetTokensInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema),
					z.lazy(
						() =>
							UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema,
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(
					() => UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema,
				)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const UserCreateNestedOneWithoutPasswordResetTokensInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordResetTokensInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordResetTokensInput>;
export const UserCreateNestedOneWithoutPasswordResetTokensInputObjectZodSchema =
	makeSchema();
