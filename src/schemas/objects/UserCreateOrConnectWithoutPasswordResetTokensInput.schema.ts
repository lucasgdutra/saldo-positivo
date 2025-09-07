import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutPasswordResetTokensInputObjectSchema } from "./UserCreateWithoutPasswordResetTokensInput.schema";
import { UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema } from "./UserUncheckedCreateWithoutPasswordResetTokensInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
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
export const UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput>;
export const UserCreateOrConnectWithoutPasswordResetTokensInputObjectZodSchema =
	makeSchema();
