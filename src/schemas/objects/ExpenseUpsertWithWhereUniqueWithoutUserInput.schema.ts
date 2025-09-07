import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateWithoutUserInputObjectSchema } from "./ExpenseCreateWithoutUserInput.schema";
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from "./ExpenseUncheckedCreateWithoutUserInput.schema";
import { ExpenseUncheckedUpdateWithoutUserInputObjectSchema } from "./ExpenseUncheckedUpdateWithoutUserInput.schema";
import { ExpenseUpdateWithoutUserInputObjectSchema } from "./ExpenseUpdateWithoutUserInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

export const ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<
	Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput,
	Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput
> = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		update: z.union([
			z.lazy(() => ExpenseUpdateWithoutUserInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema),
			z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
export const ExpenseUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = z
	.object({
		where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
		update: z.union([
			z.lazy(() => ExpenseUpdateWithoutUserInputObjectSchema),
			z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputObjectSchema),
		]),
		create: z.union([
			z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema),
			z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema),
		]),
	})
	.strict();
