import { z } from "zod";

export const PasswordResetTokenScalarFieldEnumSchema = z.enum([
	"id",
	"token",
	"userId",
	"expiresAt",
	"used",
	"createdAt",
]);
