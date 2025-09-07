import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserUncheckedUpdateWithoutCategoriesInputObjectSchema } from "./UserUncheckedUpdateWithoutCategoriesInput.schema";
import { UserUpdateWithoutCategoriesInputObjectSchema } from "./UserUpdateWithoutCategoriesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutCategoriesInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutCategoriesInputObjectSchema),
			]),
		})
		.strict();
export const UserUpdateToOneWithWhereWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCategoriesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCategoriesInput>;
export const UserUpdateToOneWithWhereWithoutCategoriesInputObjectZodSchema =
	makeSchema();
