import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string(),
			email: z.string(),
		})
		.strict();
export const UserWhereUniqueInputObjectSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserWhereUniqueInput>;
export const UserWhereUniqueInputObjectZodSchema = makeSchema();
