import { z } from "zod";
import { UserCreateInputObjectSchema } from "./objects/UserCreateInput.schema";
import { UserIncludeObjectSchema } from "./objects/UserInclude.schema";
import { UserSelectObjectSchema } from "./objects/UserSelect.schema";
import { UserUncheckedCreateInputObjectSchema } from "./objects/UserUncheckedCreateInput.schema";

export const UserCreateOneSchema = z.object({
	select: UserSelectObjectSchema.optional(),
	include: UserIncludeObjectSchema.optional(),
	data: z.union([
		UserCreateInputObjectSchema,
		UserUncheckedCreateInputObjectSchema,
	]),
});
