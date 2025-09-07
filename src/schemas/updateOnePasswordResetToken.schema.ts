import { z } from "zod";
import { PasswordResetTokenIncludeObjectSchema } from "./objects/PasswordResetTokenInclude.schema";
import { PasswordResetTokenSelectObjectSchema } from "./objects/PasswordResetTokenSelect.schema";
import { PasswordResetTokenUncheckedUpdateInputObjectSchema } from "./objects/PasswordResetTokenUncheckedUpdateInput.schema";
import { PasswordResetTokenUpdateInputObjectSchema } from "./objects/PasswordResetTokenUpdateInput.schema";
import { PasswordResetTokenWhereUniqueInputObjectSchema } from "./objects/PasswordResetTokenWhereUniqueInput.schema";

export const PasswordResetTokenUpdateOneSchema = z.object({
	select: PasswordResetTokenSelectObjectSchema.optional(),
	include: PasswordResetTokenIncludeObjectSchema.optional(),
	data: z.union([
		PasswordResetTokenUpdateInputObjectSchema,
		PasswordResetTokenUncheckedUpdateInputObjectSchema,
	]),
	where: PasswordResetTokenWhereUniqueInputObjectSchema,
});
