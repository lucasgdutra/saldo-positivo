import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutExpensesInputObjectSchema } from "./UserCreateWithoutExpensesInput.schema";
import { UserUncheckedCreateWithoutExpensesInputObjectSchema } from "./UserUncheckedCreateWithoutExpensesInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutExpensesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema),
			]),
		})
		.strict();
export const UserCreateOrConnectWithoutExpensesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutExpensesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutExpensesInput>;
export const UserCreateOrConnectWithoutExpensesInputObjectZodSchema =
	makeSchema();
