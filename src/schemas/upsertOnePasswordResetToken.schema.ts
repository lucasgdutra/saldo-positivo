import { z } from "zod";
import { PasswordResetTokenCreateInputObjectSchema } from "./objects/PasswordResetTokenCreateInput.schema";
import { PasswordResetTokenIncludeObjectSchema } from "./objects/PasswordResetTokenInclude.schema";
import { PasswordResetTokenSelectObjectSchema } from "./objects/PasswordResetTokenSelect.schema";
import { PasswordResetTokenUncheckedCreateInputObjectSchema } from "./objects/PasswordResetTokenUncheckedCreateInput.schema";
import { PasswordResetTokenUncheckedUpdateInputObjectSchema } from "./objects/PasswordResetTokenUncheckedUpdateInput.schema";
import { PasswordResetTokenUpdateInputObjectSchema } from "./objects/PasswordResetTokenUpdateInput.schema";
import { PasswordResetTokenWhereUniqueInputObjectSchema } from "./objects/PasswordResetTokenWhereUniqueInput.schema";

export const PasswordResetTokenUpsertSchema = z.object({
	select: PasswordResetTokenSelectObjectSchema.optional(),
	include: PasswordResetTokenIncludeObjectSchema.optional(),
	where: PasswordResetTokenWhereUniqueInputObjectSchema,
	create: z.union([
		PasswordResetTokenCreateInputObjectSchema,
		PasswordResetTokenUncheckedCreateInputObjectSchema,
	]),
	update: z.union([
		PasswordResetTokenUpdateInputObjectSchema,
		PasswordResetTokenUncheckedUpdateInputObjectSchema,
	]),
});
