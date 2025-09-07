import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { RevenueCreateManyUserInputEnvelopeObjectSchema } from "./RevenueCreateManyUserInputEnvelope.schema";
import { RevenueCreateOrConnectWithoutUserInputObjectSchema } from "./RevenueCreateOrConnectWithoutUserInput.schema";
import { RevenueCreateWithoutUserInputObjectSchema } from "./RevenueCreateWithoutUserInput.schema";
import { RevenueUncheckedCreateWithoutUserInputObjectSchema } from "./RevenueUncheckedCreateWithoutUserInput.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./RevenueWhereUniqueInput.schema";

export const RevenueCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<
	Prisma.RevenueCreateNestedManyWithoutUserInput,
	Prisma.RevenueCreateNestedManyWithoutUserInput
> = z
	.object({
		create: z
			.union([
				z.lazy(() => RevenueCreateWithoutUserInputObjectSchema),
				z.lazy(() => RevenueCreateWithoutUserInputObjectSchema).array(),
				z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema),
				z
					.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => RevenueCreateOrConnectWithoutUserInputObjectSchema),
				z
					.lazy(() => RevenueCreateOrConnectWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => RevenueCreateManyUserInputEnvelopeObjectSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => RevenueWhereUniqueInputObjectSchema),
				z.lazy(() => RevenueWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
	})
	.strict();
export const RevenueCreateNestedManyWithoutUserInputObjectZodSchema = z
	.object({
		create: z
			.union([
				z.lazy(() => RevenueCreateWithoutUserInputObjectSchema),
				z.lazy(() => RevenueCreateWithoutUserInputObjectSchema).array(),
				z.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema),
				z
					.lazy(() => RevenueUncheckedCreateWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => RevenueCreateOrConnectWithoutUserInputObjectSchema),
				z
					.lazy(() => RevenueCreateOrConnectWithoutUserInputObjectSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => RevenueCreateManyUserInputEnvelopeObjectSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => RevenueWhereUniqueInputObjectSchema),
				z.lazy(() => RevenueWhereUniqueInputObjectSchema).array(),
			])
			.optional(),
	})
	.strict();
