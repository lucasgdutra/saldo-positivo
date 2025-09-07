import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueCreateManyUserInputObjectSchema } from "./RevenueCreateManyUserInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			data: z.union([
				z.lazy(() => RevenueCreateManyUserInputObjectSchema),
				z.lazy(() => RevenueCreateManyUserInputObjectSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();
export const RevenueCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.RevenueCreateManyUserInputEnvelope> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueCreateManyUserInputEnvelope>;
export const RevenueCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
