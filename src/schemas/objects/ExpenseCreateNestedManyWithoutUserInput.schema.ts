import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateManyUserInputEnvelopeObjectSchema } from "./ExpenseCreateManyUserInputEnvelope.schema";
import { ExpenseCreateOrConnectWithoutUserInputObjectSchema } from "./ExpenseCreateOrConnectWithoutUserInput.schema";
import { ExpenseCreateWithoutUserInputObjectSchema } from "./ExpenseCreateWithoutUserInput.schema";
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from "./ExpenseUncheckedCreateWithoutUserInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema),
					z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema).array(),
					z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema),
					z
						.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema),
					z
						.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ExpenseCreateManyUserInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
					z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const ExpenseCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseCreateNestedManyWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateNestedManyWithoutUserInput>;
export const ExpenseCreateNestedManyWithoutUserInputObjectZodSchema =
	makeSchema();
