import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateWithoutUserInputObjectSchema } from "./ExpenseCreateWithoutUserInput.schema";
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from "./ExpenseUncheckedCreateWithoutUserInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

export const ExpenseCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<
	Prisma.ExpenseCreateOrConnectWithoutUserInput,
	Prisma.ExpenseCreateOrConnectWithoutUserInput
> = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema),
			z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
export const ExpenseCreateOrConnectWithoutUserInputObjectZodSchema = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema),
			z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
