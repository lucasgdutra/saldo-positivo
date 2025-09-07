import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserIncludeObjectSchema } from "./UserInclude.schema";
import { UserSelectObjectSchema } from "./UserSelect.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			select: z.lazy(() => UserSelectObjectSchema).optional(),
			include: z.lazy(() => UserIncludeObjectSchema).optional(),
		})
		.strict();
export const UserArgsObjectSchema = makeSchema();
export const UserArgsObjectZodSchema = makeSchema();
