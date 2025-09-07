import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutRevenuesInputObjectSchema } from "./UserCreateWithoutRevenuesInput.schema";
import { UserUncheckedCreateWithoutRevenuesInputObjectSchema } from "./UserUncheckedCreateWithoutRevenuesInput.schema";
import { UserUncheckedUpdateWithoutRevenuesInputObjectSchema } from "./UserUncheckedUpdateWithoutRevenuesInput.schema";
import { UserUpdateWithoutRevenuesInputObjectSchema } from "./UserUpdateWithoutRevenuesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutRevenuesInputObjectSchema),
				z.lazy(() => UserUncheckedUpdateWithoutRevenuesInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutRevenuesInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutRevenuesInputObjectSchema),
			]),
			where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserUpsertWithoutRevenuesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutRevenuesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutRevenuesInput>;
export const UserUpsertWithoutRevenuesInputObjectZodSchema = makeSchema();
