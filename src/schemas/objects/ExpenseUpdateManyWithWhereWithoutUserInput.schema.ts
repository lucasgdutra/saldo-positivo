import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseScalarWhereInputObjectSchema } from "./ExpenseScalarWhereInput.schema";
import { ExpenseUncheckedUpdateManyWithoutUserInputObjectSchema } from "./ExpenseUncheckedUpdateManyWithoutUserInput.schema";
import { ExpenseUpdateManyMutationInputObjectSchema } from "./ExpenseUpdateManyMutationInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => ExpenseScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => ExpenseUpdateManyMutationInputObjectSchema),
				z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutUserInput>;
export const ExpenseUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
