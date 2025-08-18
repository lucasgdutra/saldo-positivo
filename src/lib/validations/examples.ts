/**
 * Exemplos de como usar as validações decimais
 * Este arquivo demonstra o uso correto das validações para evitar estourar
 * os limites do banco de dados (@db.Decimal(10, 2))
 */

import { DecimalValidation, MoneySchema, MoneyStringSchema, MoneyFlexibleSchema } from './decimal';
import { z } from 'zod';

// Exemplo 1: Validação simples de número
const validateExpenseAmount = (amount: number) => {
  const result = DecimalValidation.validate(amount);
  if (!result.valid) {
    throw new Error(result.message);
  }
  return amount;
};

// Exemplo 2: Schema para formulário de despesa
const ExpenseFormExample = z.object({
  description: z.string().optional(),
  amount: MoneySchema, // Válida números entre 0 e 99,999,999.99
  date: z.date(),
});

// Exemplo 3: Schema para API que aceita string ou number
const ExpenseApiExample = z.object({
  description: z.string().optional(),
  amount: MoneyFlexibleSchema, // Aceita "1000.50" ou 1000.50
  date: z.string().datetime().or(z.date()),
});

// Exemplo 4: Validação de string formatada em português
const ExpenseFormStringExample = z.object({
  description: z.string().optional(),
  amount: MoneyStringSchema, // Aceita "1.000,50" e converte
  date: z.string(),
});

// Exemplo 5: Uso em componente React
export const ExampleFormValidation = {
  // Para usar em react-hook-form
  schema: z.object({
    expense: MoneySchema,
    revenue: MoneySchema,
    balance: MoneySchema,
  }),

  // Para validar antes de salvar no banco
  validateBeforeSave: (data: { expense: number; revenue: number }) => {
    const expenseValidation = DecimalValidation.validate(data.expense);
    const revenueValidation = DecimalValidation.validate(data.revenue);
    
    if (!expenseValidation.valid) {
      throw new Error(`Erro na despesa: ${expenseValidation.message}`);
    }
    
    if (!revenueValidation.valid) {
      throw new Error(`Erro na receita: ${revenueValidation.message}`);
    }
    
    return data;
  },

  // Para formatar valores para exibição
  formatMoney: (value: number) => DecimalValidation.format(value),
};

// Exemplo 6: Constantes úteis
export const MoneyConstants = {
  MAX_VALUE: DecimalValidation.MAX_VALUE, // 99,999,999.99
  MIN_VALUE: DecimalValidation.MIN_VALUE, // 0
  MAX_DECIMAL_PLACES: DecimalValidation.MAX_DECIMAL_PLACES, // 2
  MAX_TOTAL_DIGITS: DecimalValidation.MAX_TOTAL_DIGITS, // 10
};

// Exemplo 7: Função utilitária para validar em tempo real
export const validateMoneyInput = (input: string): {
  isValid: boolean;
  value?: number;
  error?: string;
} => {
  try {
    // Limpar e normalizar input
    const cleanInput = input.replace(/[^\d,.-]/g, '').replace(',', '.');
    const numberValue = parseFloat(cleanInput);
    
    if (isNaN(numberValue)) {
      return {
        isValid: false,
        error: 'Valor deve ser um número válido',
      };
    }
    
    const validation = DecimalValidation.validate(numberValue);
    
    return {
      isValid: validation.valid,
      value: validation.valid ? numberValue : undefined,
      error: validation.message,
    };
  } catch (error) {
    return {
      isValid: false,
      error: 'Erro ao validar valor',
    };
  }
};

// Exemplo 8: Como usar no contexto de uma API route
export const ApiRouteExample = {
  // POST /api/expenses
  validateExpenseData: (body: unknown) => {
    const schema = z.object({
      amount: MoneyFlexibleSchema,
      description: z.string().optional(),
      categoryId: z.string().uuid(),
      date: z.string().datetime(),
    });
    
    return schema.parse(body);
  },
  
  // Resposta de erro padronizada
  createValidationError: (field: string, value: number) => {
    return {
      error: `Valor inválido para ${field}`,
      details: {
        value,
        maxValue: DecimalValidation.MAX_VALUE,
        maxDecimalPlaces: DecimalValidation.MAX_DECIMAL_PLACES,
        message: `Valor deve estar entre R$ 0,00 e R$ ${DecimalValidation.format(DecimalValidation.MAX_VALUE)}`,
      },
    };
  },
};