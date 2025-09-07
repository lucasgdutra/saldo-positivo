import { z } from "zod";
import { CategoryInputSchema } from "../../schemas/variants/input/Category.input";
import { ExpenseInputSchema } from "../../schemas/variants/input/Expense.input";
import { RevenueInputSchema } from "../../schemas/variants/input/Revenue.input";
import { UserInputSchema } from "../../schemas/variants/input/User.input";
import { DecimalValidation } from "./decimal";

// User Registration Form Schema
export const UserRegistrationFormSchema = UserInputSchema.omit({
	categories: true,
	expenses: true,
	revenues: true,
	balance: true,
	passwordResetTokens: true,
})
	.extend({
		email: z.string().email("E-mail inválido"),
		password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
		name: z.string().min(1, "Nome é obrigatório"),
		salaryRange: z.string().min(1, "Faixa salarial é obrigatória"),
		familySize: z.coerce.number().optional(),
		confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
	})
	.refine(
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
	)
	.refine((data) => data.password === data.confirmPassword, {
		message: "Senhas não coincidem",
		path: ["confirmPassword"],
	});

export type UserRegistrationFormData = z.infer<
	typeof UserRegistrationFormSchema
>;

// User Login Form Schema
export const UserLoginFormSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(1, "Senha é obrigatória"),
});

export type UserLoginFormData = z.infer<typeof UserLoginFormSchema>;

// User Profile Form Schema
export const UserProfileFormSchema = UserInputSchema.omit({
	password: true,
	categories: true,
	expenses: true,
	revenues: true,
	balance: true,
	passwordResetTokens: true,
}).extend({
	email: z.string().email("Email inválido"),
	name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
});

export type UserProfileFormData = z.infer<typeof UserProfileFormSchema>;

// Password Reset Form Schemas
export const ForgotPasswordFormSchema = z.object({
	email: z.string().email("Email inválido"),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordFormSchema>;

export const ResetPasswordFormSchema = z
	.object({
		token: z.string().min(1, "Token é obrigatório"),
		password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Senhas não coincidem",
		path: ["confirmPassword"],
	});

export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>;

// Category Form Schema
export const CategoryFormSchema = CategoryInputSchema.omit({
	user: true,
	expenses: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
	id: true,
}).extend({
	name: z.string().min(1, "Nome da categoria é obrigatório"),
	color: z
		.string()
		.regex(/^#[0-9A-F]{6}$/i, "Cor deve estar no formato hexadecimal"),
	icon: z.string().min(1, "Ícone é obrigatório"),
});

export type CategoryFormData = z.infer<typeof CategoryFormSchema>;

// Expense Form Schema
export const ExpenseFormSchema = ExpenseInputSchema.omit({
	id: true,
	user: true,
	userId: true,
	category: true,
	createdAt: true,
	updatedAt: true,
}).extend({
	amount: DecimalValidation.number("valor da despesa"),
	description: z.string().optional(),
	date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "Data inválida",
	}),
	categoryId: z.string().min(1, "Categoria é obrigatória"),
});

export type ExpenseFormData = z.infer<typeof ExpenseFormSchema>;

// Revenue Form Schema
export const RevenueFormSchema = RevenueInputSchema.omit({
	id: true,
	user: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
}).extend({
	amount: DecimalValidation.number("valor da receita"),
	description: z.string().optional(),
	date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "Data inválida",
	}),
});

export type RevenueFormData = z.infer<typeof RevenueFormSchema>;
