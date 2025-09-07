import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserUncheckedUpdateWithoutBalanceInputObjectSchema } from "./UserUncheckedUpdateWithoutBalanceInput.schema";
import { UserUpdateWithoutBalanceInputObjectSchema } from "./UserUpdateWithoutBalanceInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema),
			]),
		})
		.strict();
export const UserUpdateToOneWithWhereWithoutBalanceInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBalanceInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBalanceInput>;
export const UserUpdateToOneWithWhereWithoutBalanceInputObjectZodSchema =
	makeSchema();
