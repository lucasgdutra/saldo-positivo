import { z } from "zod";

export const BalanceScalarFieldEnumSchema = z.enum([
	"id",
	"totalAmount",
	"totalRevenues",
	"totalExpenses",
	"referenceMonth",
	"createdAt",
	"updatedAt",
	"userId",
]);

export type BalanceScalarFieldEnum = z.infer<
	typeof BalanceScalarFieldEnumSchema
>;
