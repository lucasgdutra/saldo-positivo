import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueScalarWhereInputObjectSchema } from "./RevenueScalarWhereInput.schema";
import { RevenueUncheckedUpdateManyWithoutUserInputObjectSchema } from "./RevenueUncheckedUpdateManyWithoutUserInput.schema";
import { RevenueUpdateManyMutationInputObjectSchema } from "./RevenueUpdateManyMutationInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => RevenueScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => RevenueUpdateManyMutationInputObjectSchema),
				z.lazy(() => RevenueUncheckedUpdateManyWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const RevenueUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUpdateManyWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueUpdateManyWithWhereWithoutUserInput>;
export const RevenueUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
