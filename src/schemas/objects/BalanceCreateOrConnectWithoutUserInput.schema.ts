import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceCreateWithoutUserInputObjectSchema } from "./BalanceCreateWithoutUserInput.schema";
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from "./BalanceUncheckedCreateWithoutUserInput.schema";
import { BalanceWhereUniqueInputObjectSchema } from "./BalanceWhereUniqueInput.schema";

export const BalanceCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<
	Prisma.BalanceCreateOrConnectWithoutUserInput,
	Prisma.BalanceCreateOrConnectWithoutUserInput
> = z
	.object({
		where: z.lazy(() => BalanceWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => BalanceCreateWithoutUserInputObjectSchema),
			z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
export const BalanceCreateOrConnectWithoutUserInputObjectZodSchema = z
	.object({
		where: z.lazy(() => BalanceWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => BalanceCreateWithoutUserInputObjectSchema),
			z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
