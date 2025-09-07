import { z } from "zod";
import { PasswordResetTokenCreateManyInputObjectSchema } from "./objects/PasswordResetTokenCreateManyInput.schema";

export const PasswordResetTokenCreateManySchema = z.object({
	data: z.union([
		PasswordResetTokenCreateManyInputObjectSchema,
		z.array(PasswordResetTokenCreateManyInputObjectSchema),
	]),
	skipDuplicates: z.boolean().optional(),
});
