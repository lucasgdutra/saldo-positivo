import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateManyUserInputEnvelopeObjectSchema } from "./ExpenseCreateManyUserInputEnvelope.schema";
import { ExpenseCreateOrConnectWithoutUserInputObjectSchema } from "./ExpenseCreateOrConnectWithoutUserInput.schema";
import { ExpenseCreateWithoutUserInputObjectSchema } from "./ExpenseCreateWithoutUserInput.schema";
import { ExpenseScalarWhereInputObjectSchema } from "./ExpenseScalarWhereInput.schema";
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from "./ExpenseUncheckedCreateWithoutUserInput.schema";
import { ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema } from "./ExpenseUpdateManyWithWhereWithoutUserInput.schema";
import { ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema } from "./ExpenseUpdateWithWhereUniqueWithoutUserInput.schema";
import { ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema } from "./ExpenseUpsertWithWhereUniqueWithoutUserInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./ExpenseWhereUniqueInput.schema";

export const ExpenseUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<
	Prisma.ExpenseUpdateManyWithoutUserNestedInput,
	Prisma.ExpenseUpdateManyWithoutUserNestedInput
> = z
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
		upsert: z
			.union([
				z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema),
				z
					.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => ExpenseCreateManyUserInputEnvelopeObjectSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema),
				z
					.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema),
				z
					.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => ExpenseScalarWhereInputObjectSchema),
				z.lazy(() => ExpenseScalarWhereInputObjectSchema).array(),
			])
			.optional(),
	})
	.strict();
export const ExpenseUpdateManyWithoutUserNestedInputObjectZodSchema = z
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
		upsert: z
			.union([
				z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema),
				z
					.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => ExpenseCreateManyUserInputEnvelopeObjectSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
				z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema),
				z
					.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema),
				z
					.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => ExpenseScalarWhereInputObjectSchema),
				z.lazy(() => ExpenseScalarWhereInputObjectSchema).array(),
			])
			.optional(),
	})
	.strict();
