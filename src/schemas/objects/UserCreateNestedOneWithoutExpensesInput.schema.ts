import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateOrConnectWithoutExpensesInputObjectSchema } from "./UserCreateOrConnectWithoutExpensesInput.schema";
import { UserCreateWithoutExpensesInputObjectSchema } from "./UserCreateWithoutExpensesInput.schema";
import { UserUncheckedCreateWithoutExpensesInputObjectSchema } from "./UserUncheckedCreateWithoutExpensesInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutExpensesInputObjectSchema),
					z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutExpensesInputObjectSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const UserCreateNestedOneWithoutExpensesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutExpensesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutExpensesInput>;
export const UserCreateNestedOneWithoutExpensesInputObjectZodSchema =
	makeSchema();
