import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutBalanceInputObjectSchema } from "./UserCreateWithoutBalanceInput.schema";
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from "./UserUncheckedCreateWithoutBalanceInput.schema";
import { UserUncheckedUpdateWithoutBalanceInputObjectSchema } from "./UserUncheckedUpdateWithoutBalanceInput.schema";
import { UserUpdateWithoutBalanceInputObjectSchema } from "./UserUpdateWithoutBalanceInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutBalanceInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema),
			]),
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserUpsertWithoutBalanceInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutBalanceInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutBalanceInput>;
export const UserUpsertWithoutBalanceInputObjectZodSchema = makeSchema();
