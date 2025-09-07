import { z } from "zod";
export const BalanceDeleteManyResultSchema = z.object({
	count: z.number(),
});
