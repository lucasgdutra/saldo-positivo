import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema } from "./PasswordResetTokenUncheckedUpdateWithoutUserInput.schema";
import { PasswordResetTokenUpdateWithoutUserInputObjectSchema } from "./PasswordResetTokenUpdateWithoutUserInput.schema";
import { PasswordResetTokenWhereUniqueInputObjectSchema } from "./PasswordResetTokenWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
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
export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput>;
export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
