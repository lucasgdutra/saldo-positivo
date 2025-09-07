import { z } from "zod";
import { PasswordResetTokenWhereInputObjectSchema } from "./objects/PasswordResetTokenWhereInput.schema";

export const PasswordResetTokenDeleteManySchema = z.object({
	where: PasswordResetTokenWhereInputObjectSchema.optional(),
});
