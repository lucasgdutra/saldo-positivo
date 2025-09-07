import { z } from "zod";
import { PasswordResetTokenCreateManyInputObjectSchema } from "./objects/PasswordResetTokenCreateManyInput.schema";
import { PasswordResetTokenSelectObjectSchema } from "./objects/PasswordResetTokenSelect.schema";

export const PasswordResetTokenCreateManyAndReturnSchema = z
	.object({
		select: PasswordResetTokenSelectObjectSchema.optional(),
		data: z.union([
			PasswordResetTokenCreateManyInputObjectSchema,
			z.array(PasswordResetTokenCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
