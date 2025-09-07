import { z } from "zod";

export const CategoryScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"color",
	"icon",
	"userId",
	"createdAt",
	"updatedAt",
]);

export type CategoryScalarFieldEnum = z.infer<
	typeof CategoryScalarFieldEnumSchema
>;
