import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceWhereInputObjectSchema } from "./BalanceWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			is: z.lazy(() => BalanceWhereInputObjectSchema).nullish(),
			isNot: z.lazy(() => BalanceWhereInputObjectSchema).nullish(),
		})
		.strict();
export const BalanceNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.BalanceNullableScalarRelationFilter> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceNullableScalarRelationFilter>;
export const BalanceNullableScalarRelationFilterObjectZodSchema = makeSchema();
