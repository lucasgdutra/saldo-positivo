import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateOrConnectWithoutCategoriesInputObjectSchema } from "./UserCreateOrConnectWithoutCategoriesInput.schema";
import { UserCreateWithoutCategoriesInputObjectSchema } from "./UserCreateWithoutCategoriesInput.schema";
import { UserUncheckedCreateWithoutCategoriesInputObjectSchema } from "./UserUncheckedCreateWithoutCategoriesInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
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
export const UserCreateNestedOneWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCategoriesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCategoriesInput>;
export const UserCreateNestedOneWithoutCategoriesInputObjectZodSchema =
	makeSchema();
