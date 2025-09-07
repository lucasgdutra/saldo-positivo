import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenIncludeObjectSchema } from "./PasswordResetTokenInclude.schema";
import { PasswordResetTokenSelectObjectSchema } from "./PasswordResetTokenSelect.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			select: z.lazy(() => PasswordResetTokenSelectObjectSchema).optional(),
			include: z.lazy(() => PasswordResetTokenIncludeObjectSchema).optional(),
		})
		.strict();
export const PasswordResetTokenArgsObjectSchema = makeSchema();
export const PasswordResetTokenArgsObjectZodSchema = makeSchema();
