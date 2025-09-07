import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseUncheckedUpdateWithoutUserInputObjectSchema } from "./ExpenseUncheckedUpdateWithoutUserInput.schema";
import { ExpenseUpdateWithoutUserInputObjectSchema } from "./ExpenseUpdateWithoutUserInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

export const ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<
	Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput,
	Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput
> = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		data: z.union([
			z.lazy(() => ExpenseUpdateWithoutUserInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
export const ExpenseUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		data: z.union([
			z.lazy(() => ExpenseUpdateWithoutUserInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
