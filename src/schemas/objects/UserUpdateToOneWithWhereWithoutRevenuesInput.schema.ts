import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserUncheckedUpdateWithoutRevenuesInputObjectSchema } from "./UserUncheckedUpdateWithoutRevenuesInput.schema";
import { UserUpdateWithoutRevenuesInputObjectSchema } from "./UserUpdateWithoutRevenuesInput.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";

export const UserUpdateToOneWithWhereWithoutRevenuesInputObjectSchema: z.ZodType<
	Prisma.UserUpdateToOneWithWhereWithoutRevenuesInput,
	Prisma.UserUpdateToOneWithWhereWithoutRevenuesInput
> = z
	.object({
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutRevenuesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutRevenuesInputObjectSchema),
		]),
	})
	.strict();
export const UserUpdateToOneWithWhereWithoutRevenuesInputObjectZodSchema = z
	.object({
		where: z.lazy(() => UserWhereInputObjectSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutRevenuesInputObjectSchema),
			z.lazy(() => UserUncheckedUpdateWithoutRevenuesInputObjectSchema),
		]),
	})
	.strict();
