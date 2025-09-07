import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateOrConnectWithoutCategoriesInputObjectSchema } from "./UserCreateOrConnectWithoutCategoriesInput.schema";
import { UserCreateWithoutCategoriesInputObjectSchema } from "./UserCreateWithoutCategoriesInput.schema";
import { UserUncheckedCreateWithoutCategoriesInputObjectSchema } from "./UserUncheckedCreateWithoutCategoriesInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

export const UserCreateNestedOneWithoutCategoriesInputObjectSchema: z.ZodType<
	Prisma.UserCreateNestedOneWithoutCategoriesInput,
	Prisma.UserCreateNestedOneWithoutCategoriesInput
> = z
	.object({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutCategoriesInputObjectSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
	})
	.strict();
export const UserCreateNestedOneWithoutCategoriesInputObjectZodSchema = z
	.object({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutCategoriesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutCategoriesInputObjectSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutCategoriesInputObjectSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
	})
	.strict();
