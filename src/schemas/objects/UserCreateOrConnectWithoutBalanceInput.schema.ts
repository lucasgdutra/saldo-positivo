import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateWithoutBalanceInputObjectSchema } from "./UserCreateWithoutBalanceInput.schema";
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from "./UserUncheckedCreateWithoutBalanceInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutBalanceInputObjectSchema),
				z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema),
			]),
		})
		.strict();
export const UserCreateOrConnectWithoutBalanceInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBalanceInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutBalanceInput>;
export const UserCreateOrConnectWithoutBalanceInputObjectZodSchema =
	makeSchema();
