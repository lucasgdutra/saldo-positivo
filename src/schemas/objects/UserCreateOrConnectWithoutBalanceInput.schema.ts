import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutBalanceInputObjectSchema } from "./UserCreateWithoutBalanceInput.schema";
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from "./UserUncheckedCreateWithoutBalanceInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

export const UserCreateOrConnectWithoutBalanceInputObjectSchema: z.ZodType<
	Prisma.UserCreateOrConnectWithoutBalanceInput,
	Prisma.UserCreateOrConnectWithoutBalanceInput
> = z
	.object({
		where: z.lazy(() => UserWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutBalanceInputObjectSchema),
			z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema),
		]),
	})
	.strict();
export const UserCreateOrConnectWithoutBalanceInputObjectZodSchema = z
	.object({
		where: z.lazy(() => UserWhereUniqueInputObjectSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutBalanceInputObjectSchema),
			z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema),
		]),
	})
	.strict();
