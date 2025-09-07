import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateWithoutUserInputObjectSchema } from "./ExpenseCreateWithoutUserInput.schema";
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from "./ExpenseUncheckedCreateWithoutUserInput.schema";
import { ExpenseUncheckedUpdateWithoutUserInputObjectSchema } from "./ExpenseUncheckedUpdateWithoutUserInput.schema";
import { ExpenseUpdateWithoutUserInputObjectSchema } from "./ExpenseUpdateWithoutUserInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
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
export const ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput>;
export const ExpenseUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
