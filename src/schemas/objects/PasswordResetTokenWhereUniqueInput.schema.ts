import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string(),
			token: z.string(),
		})
		.strict();
export const PasswordResetTokenWhereUniqueInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenWhereUniqueInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenWhereUniqueInput>;
export const PasswordResetTokenWhereUniqueInputObjectZodSchema = makeSchema();
