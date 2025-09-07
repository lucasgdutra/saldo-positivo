import { z } from "zod";
import { RevenueWhereInputObjectSchema } from "./objects/RevenueWhereInput.schema";

export const RevenueDeleteManySchema = z.object({
	where: RevenueWhereInputObjectSchema.optional(),
});
