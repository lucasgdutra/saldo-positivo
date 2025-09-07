import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceCreateWithoutUserInputObjectSchema } from "./BalanceCreateWithoutUserInput.schema";
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from "./BalanceUncheckedCreateWithoutUserInput.schema";
import { BalanceWhereUniqueInputObjectSchema } from "./BalanceWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => BalanceWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => BalanceCreateWithoutUserInputObjectSchema),
				z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const BalanceCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceCreateOrConnectWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceCreateOrConnectWithoutUserInput>;
export const BalanceCreateOrConnectWithoutUserInputObjectZodSchema =
	makeSchema();
