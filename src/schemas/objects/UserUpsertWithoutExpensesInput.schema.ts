import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutExpensesInputObjectSchema } from "./UserCreateWithoutExpensesInput.schema";
import { UserUncheckedCreateWithoutExpensesInputObjectSchema } from "./UserUncheckedCreateWithoutExpensesInput.schema";
import { UserUncheckedUpdateWithoutExpensesInputObjectSchema } from "./UserUncheckedUpdateWithoutExpensesInput.schema";
import { UserUpdateWithoutExpensesInputObjectSchema } from "./UserUpdateWithoutExpensesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutExpensesInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutExpensesInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutExpensesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema),
			]),
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserUpsertWithoutExpensesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutExpensesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutExpensesInput>;
export const UserUpsertWithoutExpensesInputObjectZodSchema = makeSchema();
