import { z } from "zod";
import { PasswordResetTokenCreateInputObjectSchema } from "./objects/PasswordResetTokenCreateInput.schema";
import { PasswordResetTokenIncludeObjectSchema } from "./objects/PasswordResetTokenInclude.schema";
import { PasswordResetTokenSelectObjectSchema } from "./objects/PasswordResetTokenSelect.schema";
import { PasswordResetTokenUncheckedCreateInputObjectSchema } from "./objects/PasswordResetTokenUncheckedCreateInput.schema";

export const PasswordResetTokenCreateOneSchema = z.object({
	select: PasswordResetTokenSelectObjectSchema.optional(),
	include: PasswordResetTokenIncludeObjectSchema.optional(),
	data: z.union([
		PasswordResetTokenCreateInputObjectSchema,
		PasswordResetTokenUncheckedCreateInputObjectSchema,
	]),
});
