import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceCreateOrConnectWithoutUserInputObjectSchema } from "./BalanceCreateOrConnectWithoutUserInput.schema";
import { BalanceCreateWithoutUserInputObjectSchema } from "./BalanceCreateWithoutUserInput.schema";
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from "./BalanceUncheckedCreateWithoutUserInput.schema";
import { BalanceWhereUniqueInputObjectSchema } from "./BalanceWhereUniqueInput.schema";

export const BalanceCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<
	Prisma.BalanceCreateNestedOneWithoutUserInput,
	Prisma.BalanceCreateNestedOneWithoutUserInput
> = z
	.object({
		create: z
			.union([
				z.lazy(() => BalanceCreateWithoutUserInputObjectSchema),
				z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => BalanceCreateOrConnectWithoutUserInputObjectSchema)
			.optional(),
		connect: z.lazy(() => BalanceWhereUniqueInputObjectSchema).optional(),
	})
	.strict();
export const BalanceCreateNestedOneWithoutUserInputObjectZodSchema = z
	.object({
		create: z
			.union([
				z.lazy(() => BalanceCreateWithoutUserInputObjectSchema),
				z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => BalanceCreateOrConnectWithoutUserInputObjectSchema)
			.optional(),
		connect: z.lazy(() => BalanceWhereUniqueInputObjectSchema).optional(),
	})
	.strict();
