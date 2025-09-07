import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceUncheckedUpdateWithoutUserInputObjectSchema } from "./BalanceUncheckedUpdateWithoutUserInput.schema";
import { BalanceUpdateWithoutUserInputObjectSchema } from "./BalanceUpdateWithoutUserInput.schema";
import { BalanceWhereInputObjectSchema } from "./BalanceWhereInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			where: z.lazy(() => BalanceWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema),
				z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const BalanceUpdateToOneWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceUpdateToOneWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceUpdateToOneWithWhereWithoutUserInput>;
export const BalanceUpdateToOneWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
