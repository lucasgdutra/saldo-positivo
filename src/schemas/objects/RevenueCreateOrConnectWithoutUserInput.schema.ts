import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueCreateWithoutUserInputObjectSchema } from "./RevenueCreateWithoutUserInput.schema";
import { RevenueUncheckedCreateWithoutUserInputObjectSchema } from "./RevenueUncheckedCreateWithoutUserInput.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./RevenueWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => RevenueWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => RevenueCreateWithoutUserInputObjectSchema),
				z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const RevenueCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueCreateOrConnectWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueCreateOrConnectWithoutUserInput>;
export const RevenueCreateOrConnectWithoutUserInputObjectZodSchema =
	makeSchema();
