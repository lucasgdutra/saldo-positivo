import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceCreateOrConnectWithoutUserInputObjectSchema } from "./BalanceCreateOrConnectWithoutUserInput.schema";
import { BalanceCreateWithoutUserInputObjectSchema } from "./BalanceCreateWithoutUserInput.schema";
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from "./BalanceUncheckedCreateWithoutUserInput.schema";
import { BalanceWhereUniqueInputObjectSchema } from "./BalanceWhereUniqueInput.schema";

export const BalanceUncheckedCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<
	Prisma.BalanceUncheckedCreateNestedOneWithoutUserInput,
	Prisma.BalanceUncheckedCreateNestedOneWithoutUserInput
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
export const BalanceUncheckedCreateNestedOneWithoutUserInputObjectZodSchema = z
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
