import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenWhereInputObjectSchema } from "./PasswordResetTokenWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			every: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
			some: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
			none: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
		})
		.strict();
export const PasswordResetTokenListRelationFilterObjectSchema: z.ZodType<Prisma.PasswordResetTokenListRelationFilter> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenListRelationFilter>;
export const PasswordResetTokenListRelationFilterObjectZodSchema = makeSchema();
