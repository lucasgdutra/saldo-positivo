import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceCreateWithoutUserInputObjectSchema } from "./BalanceCreateWithoutUserInput.schema";
import { BalanceUncheckedCreateWithoutUserInputObjectSchema } from "./BalanceUncheckedCreateWithoutUserInput.schema";
import { BalanceUncheckedUpdateWithoutUserInputObjectSchema } from "./BalanceUncheckedUpdateWithoutUserInput.schema";
import { BalanceUpdateWithoutUserInputObjectSchema } from "./BalanceUpdateWithoutUserInput.schema";
import { BalanceWhereInputObjectSchema } from "./BalanceWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			update: z.union([
				z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema),
				z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => BalanceCreateWithoutUserInputObjectSchema),
				z.lazy(() => BalanceUncheckedCreateWithoutUserInputObjectSchema),
			]),
			where: z.lazy(() => BalanceWhereInputObjectSchema).optional(),
		})
		.strict();
export const BalanceUpsertWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceUpsertWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceUpsertWithoutUserInput>;
export const BalanceUpsertWithoutUserInputObjectZodSchema = makeSchema();
