import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenIncludeObjectSchema } from "./PasswordResetTokenInclude.schema";
import { PasswordResetTokenSelectObjectSchema } from "./PasswordResetTokenSelect.schema";

export const PasswordResetTokenArgsObjectSchema = z
	.object({
		select: z.lazy(() => PasswordResetTokenSelectObjectSchema).optional(),
		include: z.lazy(() => PasswordResetTokenIncludeObjectSchema).optional(),
	})
	.strict();
export const PasswordResetTokenArgsObjectZodSchema = z
	.object({
		select: z.lazy(() => PasswordResetTokenSelectObjectSchema).optional(),
		include: z.lazy(() => PasswordResetTokenIncludeObjectSchema).optional(),
	})
	.strict();
