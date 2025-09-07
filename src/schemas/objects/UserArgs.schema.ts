import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserIncludeObjectSchema } from "./UserInclude.schema";
import { UserSelectObjectSchema } from "./UserSelect.schema";

export const UserArgsObjectSchema = z
	.object({
		select: z.lazy(() => UserSelectObjectSchema).optional(),
		include: z.lazy(() => UserIncludeObjectSchema).optional(),
	})
	.strict();
export const UserArgsObjectZodSchema = z
	.object({
		select: z.lazy(() => UserSelectObjectSchema).optional(),
		include: z.lazy(() => UserIncludeObjectSchema).optional(),
	})
	.strict();
