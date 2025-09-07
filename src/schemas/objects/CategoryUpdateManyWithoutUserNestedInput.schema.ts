import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateManyUserInputEnvelopeObjectSchema } from "./CategoryCreateManyUserInputEnvelope.schema";
import { CategoryCreateOrConnectWithoutUserInputObjectSchema } from "./CategoryCreateOrConnectWithoutUserInput.schema";
import { CategoryCreateWithoutUserInputObjectSchema } from "./CategoryCreateWithoutUserInput.schema";
import { CategoryScalarWhereInputObjectSchema } from "./CategoryScalarWhereInput.schema";
import { CategoryUncheckedCreateWithoutUserInputObjectSchema } from "./CategoryUncheckedCreateWithoutUserInput.schema";
import { CategoryUpdateManyWithWhereWithoutUserInputObjectSchema } from "./CategoryUpdateManyWithWhereWithoutUserInput.schema";
import { CategoryUpdateWithWhereUniqueWithoutUserInputObjectSchema } from "./CategoryUpdateWithWhereUniqueWithoutUserInput.schema";
import { CategoryUpsertWithWhereUniqueWithoutUserInputObjectSchema } from "./CategoryUpsertWithWhereUniqueWithoutUserInput.schema";
import { CategoryWhereUniqueInputObjectSchema } from "./CategoryWhereUniqueInput.schema";

export const CategoryUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<
	Prisma.CategoryUpdateManyWithoutUserNestedInput,
	Prisma.CategoryUpdateManyWithoutUserNestedInput
> = z
	.object({
		create: z
			.union([
				z.lazy(() => CategoryCreateWithoutUserInputObjectSchema),
				z.lazy(() => CategoryCreateWithoutUserInputObjectSchema).array(),
				z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => CategoryCreateOrConnectWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryCreateOrConnectWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => CategoryUpsertWithWhereUniqueWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryUpsertWithWhereUniqueWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => CategoryCreateManyUserInputEnvelopeObjectSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => CategoryWhereUniqueInputObjectSchema),
				z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => CategoryWhereUniqueInputObjectSchema),
				z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => CategoryWhereUniqueInputObjectSchema),
				z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => CategoryWhereUniqueInputObjectSchema),
				z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => CategoryUpdateWithWhereUniqueWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryUpdateWithWhereUniqueWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => CategoryUpdateManyWithWhereWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryUpdateManyWithWhereWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => CategoryScalarWhereInputObjectSchema),
				z.lazy(() => CategoryScalarWhereInputObjectSchema).array(),
			])
			.optional(),
	})
	.strict();
export const CategoryUpdateManyWithoutUserNestedInputObjectZodSchema = z
	.object({
		create: z
			.union([
				z.lazy(() => CategoryCreateWithoutUserInputObjectSchema),
				z.lazy(() => CategoryCreateWithoutUserInputObjectSchema).array(),
				z.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryUncheckedCreateWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => CategoryCreateOrConnectWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryCreateOrConnectWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => CategoryUpsertWithWhereUniqueWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryUpsertWithWhereUniqueWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => CategoryCreateManyUserInputEnvelopeObjectSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => CategoryWhereUniqueInputObjectSchema),
				z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => CategoryWhereUniqueInputObjectSchema),
				z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => CategoryWhereUniqueInputObjectSchema),
				z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => CategoryWhereUniqueInputObjectSchema),
				z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => CategoryUpdateWithWhereUniqueWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryUpdateWithWhereUniqueWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => CategoryUpdateManyWithWhereWithoutUserInputObjectSchema),
				z
					.lazy(() => CategoryUpdateManyWithWhereWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => CategoryScalarWhereInputObjectSchema),
				z.lazy(() => CategoryScalarWhereInputObjectSchema).array(),
			])
			.optional(),
	})
	.strict();
