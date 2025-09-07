import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueUncheckedUpdateWithoutUserInputObjectSchema } from "./RevenueUncheckedUpdateWithoutUserInput.schema";
import { RevenueUpdateWithoutUserInputObjectSchema } from "./RevenueUpdateWithoutUserInput.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./RevenueWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => RevenueWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => RevenueUpdateWithoutUserInputObjectSchema),
				z.lazy(() => RevenueUncheckedUpdateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const RevenueUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUpdateWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueUpdateWithWhereUniqueWithoutUserInput>;
export const RevenueUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
