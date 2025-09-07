import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema } from "./PasswordResetTokenCreateManyUserInputEnvelope.schema";
import { PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema } from "./PasswordResetTokenCreateOrConnectWithoutUserInput.schema";
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from "./PasswordResetTokenCreateWithoutUserInput.schema";
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from "./PasswordResetTokenUncheckedCreateWithoutUserInput.schema";
import { PasswordResetTokenWhereUniqueInputObjectSchema } from "./PasswordResetTokenWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema),
					z
						.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema)
						.array(),
					z.lazy(
						() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema,
					),
					z
						.lazy(
							() =>
								PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema,
					),
					z
						.lazy(
							() =>
								PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
					z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput>;
export const PasswordResetTokenCreateNestedManyWithoutUserInputObjectZodSchema =
	makeSchema();
