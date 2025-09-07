import { z } from "zod";

export const ExpenseScalarFieldEnumSchema = z.enum([
	"id",
	"amount",
	"description",
	"date",
	"createdAt",
	"updatedAt",
	"userId",
	"categoryId",
]);
