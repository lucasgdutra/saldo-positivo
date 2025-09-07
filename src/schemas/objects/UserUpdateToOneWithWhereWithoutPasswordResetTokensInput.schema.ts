import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema } from "./UserUncheckedUpdateWithoutPasswordResetTokensInput.schema";
import { UserUpdateWithoutPasswordResetTokensInputObjectSchema } from "./UserUpdateWithoutPasswordResetTokensInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutPasswordResetTokensInputObjectSchema),
				z.lazy(
					() => UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema,
				),
			]),
		})
		.strict();
export const UserUpdateToOneWithWhereWithoutPasswordResetTokensInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput>;
export const UserUpdateToOneWithWhereWithoutPasswordResetTokensInputObjectZodSchema =
	makeSchema();
