import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueCreateWithoutUserInputObjectSchema } from "./RevenueCreateWithoutUserInput.schema";
import { RevenueUncheckedCreateWithoutUserInputObjectSchema } from "./RevenueUncheckedCreateWithoutUserInput.schema";
import { RevenueUncheckedUpdateWithoutUserInputObjectSchema } from "./RevenueUncheckedUpdateWithoutUserInput.schema";
import { RevenueUpdateWithoutUserInputObjectSchema } from "./RevenueUpdateWithoutUserInput.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./RevenueWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => RevenueWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => RevenueUpdateWithoutUserInputObjectSchema),
				z.lazy(() => RevenueUncheckedUpdateWithoutUserInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => RevenueCreateWithoutUserInputObjectSchema),
				z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const RevenueUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUpsertWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueUpsertWithWhereUniqueWithoutUserInput>;
export const RevenueUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
