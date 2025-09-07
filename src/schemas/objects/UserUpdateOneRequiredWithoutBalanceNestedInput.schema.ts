import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateOrConnectWithoutBalanceInputObjectSchema } from "./UserCreateOrConnectWithoutBalanceInput.schema";
import { UserCreateWithoutBalanceInputObjectSchema } from "./UserCreateWithoutBalanceInput.schema";
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from "./UserUncheckedCreateWithoutBalanceInput.schema";
import { UserUncheckedUpdateWithoutBalanceInputObjectSchema } from "./UserUncheckedUpdateWithoutBalanceInput.schema";
import { UserUpdateToOneWithWhereWithoutBalanceInputObjectSchema } from "./UserUpdateToOneWithWhereWithoutBalanceInput.schema";
import { UserUpdateWithoutBalanceInputObjectSchema } from "./UserUpdateWithoutBalanceInput.schema";
import { UserUpsertWithoutBalanceInputObjectSchema } from "./UserUpsertWithoutBalanceInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutBalanceInputObjectSchema),
					z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutBalanceInputObjectSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutBalanceInputObjectSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutBalanceInputObjectSchema),
					z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema),
					z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const UserUpdateOneRequiredWithoutBalanceNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBalanceNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutBalanceNestedInput>;
export const UserUpdateOneRequiredWithoutBalanceNestedInputObjectZodSchema =
	makeSchema();
