import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenScalarWhereInputObjectSchema } from "./PasswordResetTokenScalarWhereInput.schema";
import { PasswordResetTokenUncheckedUpdateManyWithoutUserInputObjectSchema } from "./PasswordResetTokenUncheckedUpdateManyWithoutUserInput.schema";
import { PasswordResetTokenUpdateManyMutationInputObjectSchema } from "./PasswordResetTokenUpdateManyMutationInput.schema";

const makeSchema = (): z.ZodObject<any> =>
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
export const PasswordResetTokenUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenUpdateManyWithWhereWithoutUserInput>;
export const PasswordResetTokenUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
