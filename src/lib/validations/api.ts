import { z } from "zod";
import { BalanceInputSchema } from "../../schemas/variants/input/Balance.input";
import { CategoryInputSchema } from "../../schemas/variants/input/Category.input";
import { ExpenseInputSchema } from "../../schemas/variants/input/Expense.input";
import { RevenueInputSchema } from "../../schemas/variants/input/Revenue.input";
import { UserInputSchema } from "../../schemas/variants/input/User.input";
import { DecimalValidation } from "./decimal";

// API Request Schemas

// User API Schemas
const BaseUserApiSchema = UserInputSchema.omit({
	categories: true,
	expenses: true,
	revenues: true,
	balance: true,
	passwordResetTokens: true,
}).extend({
	email: z.string().email("E-mail inválido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
	name: z.string().min(1, "Nome é obrigatório"),
	salaryRange: z.string().min(1, "Faixa salarial é obrigatória"),
});

export const CreateUserApiSchema = BaseUserApiSchema.refine(
	(data) => {
		if (data.usageMotivation === "outro" && !data.customMotivation) {
			return false;
		}
		return true;
	},
	{
		message: "Especifique o motivo personalizado",
		path: ["customMotivation"],
	},
);

export const UpdateUserApiSchema = BaseUserApiSchema.omit({
	password: true,
}).partial();

export const LoginApiSchema = z.object({
	email: z.string().email("Email must be valid"),
	password: z.string().min(1, "Password is required"),
});

// Password Reset API Schemas
export const ForgotPasswordApiSchema = z.object({
	email: z.string().email("Email must be valid"),
});

export const ResetPasswordApiSchema = z.object({
	token: z.string().min(1, "Token is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

// Category API Schemas
export const CreateCategoryApiSchema = CategoryInputSchema.omit({
	user: true,
	expenses: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
	id: true,
}).extend({
	name: z.string().min(1, "Category name is required"),
	color: z
		.string()
		.regex(/^#[0-9A-F]{6}$/i, "Color must be in hexadecimal format"),
	icon: z.string().min(1, "Icon is required"),
});

export const UpdateCategoryApiSchema = CreateCategoryApiSchema.partial();

// Expense API Schemas
export const CreateExpenseApiSchema = ExpenseInputSchema.omit({
	user: true,
	category: true,
}).extend({
	amount: DecimalValidation.flexible("valor da despesa"),
	description: z.string().optional(),
	date: z
		.string()
		.datetime()
		.or(z.date())
		.transform((val) => (typeof val === "string" ? new Date(val) : val)),
	categoryId: z.string().uuid("Category ID must be a valid UUID"),
});

export const UpdateExpenseApiSchema = CreateExpenseApiSchema.partial();

// Revenue API Schemas
export const CreateRevenueApiSchema = RevenueInputSchema.omit({
	user: true,
}).extend({
	amount: DecimalValidation.flexible("valor da receita"),
	description: z.string().optional(),
	date: z
		.string()
		.datetime()
		.or(z.date())
		.transform((val) => (typeof val === "string" ? new Date(val) : val)),
});

export const UpdateRevenueApiSchema = CreateRevenueApiSchema.partial();

// Balance API Schemas
export const CreateBalanceApiSchema = BalanceInputSchema.omit({
	user: true,
}).extend({
	totalAmount: DecimalValidation.flexible("valor total"),
	totalRevenues: DecimalValidation.flexible("total de receitas"),
	totalExpenses: DecimalValidation.flexible("total de despesas"),
	referenceMonth: z
		.string()
		.datetime()
		.or(z.date())
		.transform((val) => (typeof val === "string" ? new Date(val) : val)),
});

export const UpdateBalanceApiSchema = CreateBalanceApiSchema.partial();

// Query Parameter Schemas
export const PaginationQuerySchema = z.object({
	page: z
		.string()
		.regex(/^\d+$/)
		.transform((val) => parseInt(val, 10))
		.optional(),
	limit: z
		.string()
		.regex(/^\d+$/)
		.transform((val) => parseInt(val, 10))
		.optional(),
	orderBy: z.string().optional(),
	order: z.enum(["asc", "desc"]).optional(),
});

export const DateRangeQuerySchema = z.object({
	startDate: z
		.string()
		.datetime()
		.or(z.date())
		.transform((val) => (typeof val === "string" ? new Date(val) : val))
		.optional(),
	endDate: z
		.string()
		.datetime()
		.or(z.date())
		.transform((val) => (typeof val === "string" ? new Date(val) : val))
		.optional(),
});

export const ExpenseQuerySchema = PaginationQuerySchema.merge(
	DateRangeQuerySchema,
).extend({
	categoryId: z.string().uuid().optional(),
});

export const RevenueQuerySchema =
	PaginationQuerySchema.merge(DateRangeQuerySchema);

// API Response Schemas
export const ApiSuccessResponseSchema = z.object({
	success: z.literal(true),
	data: z.unknown(),
	message: z.string().optional(),
});

export const ApiErrorResponseSchema = z.object({
	success: z.literal(false),
	error: z.string(),
	details: z.unknown().optional(),
});

export const ApiResponseSchema = z.union([
	ApiSuccessResponseSchema,
	ApiErrorResponseSchema,
]);

// Type exports for API schemas
export type CreateUserApiData = z.infer<typeof CreateUserApiSchema>;
export type UpdateUserApiData = z.infer<typeof UpdateUserApiSchema>;
export type LoginApiData = z.infer<typeof LoginApiSchema>;
export type ForgotPasswordApiData = z.infer<typeof ForgotPasswordApiSchema>;
export type ResetPasswordApiData = z.infer<typeof ResetPasswordApiSchema>;
export type CreateCategoryApiData = z.infer<typeof CreateCategoryApiSchema>;
export type UpdateCategoryApiData = z.infer<typeof UpdateCategoryApiSchema>;
export type CreateExpenseApiData = z.infer<typeof CreateExpenseApiSchema>;
export type UpdateExpenseApiData = z.infer<typeof UpdateExpenseApiSchema>;
export type CreateRevenueApiData = z.infer<typeof CreateRevenueApiSchema>;
export type UpdateRevenueApiData = z.infer<typeof UpdateRevenueApiSchema>;
export type CreateBalanceApiData = z.infer<typeof CreateBalanceApiSchema>;
export type UpdateBalanceApiData = z.infer<typeof UpdateBalanceApiSchema>;
export type PaginationQueryData = z.infer<typeof PaginationQuerySchema>;
export type DateRangeQueryData = z.infer<typeof DateRangeQuerySchema>;
export type ExpenseQueryData = z.infer<typeof ExpenseQuerySchema>;
export type RevenueQueryData = z.infer<typeof RevenueQuerySchema>;
export type ApiSuccessResponseData = z.infer<typeof ApiSuccessResponseSchema>;
export type ApiErrorResponseData = z.infer<typeof ApiErrorResponseSchema>;
export type ApiResponseData = z.infer<typeof ApiResponseSchema>;
