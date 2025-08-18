import { z } from 'zod';

/**
 * Validador para campos decimais do banco de dados
 * Baseado na definição Prisma: @db.Decimal(10, 2)
 * - Máximo 10 dígitos totais
 * - Máximo 2 casas decimais
 * - Valor máximo: 99,999,999.99
 */
export const DecimalValidation = {
  // Constantes para os limites
  MAX_TOTAL_DIGITS: 10,
  MAX_DECIMAL_PLACES: 2,
  MAX_INTEGER_DIGITS: 8,
  MAX_VALUE: 99999999.99,
  MIN_VALUE: 0,

  // Validador básico para string
  string: (fieldName = 'valor') => 
    z.string()
      .refine((val) => {
        // Permitir string vazia
        if (!val || val.trim() === '') return true;
        
        // Verificar se é um número válido
        const num = parseFloat(val.replace(',', '.'));
        if (isNaN(num)) return false;
        
        return DecimalValidation._validateDecimal(num);
      }, {
        message: `${fieldName} deve ser um número válido entre R$ 0,00 e R$ 99.999.999,99 com no máximo 2 casas decimais`,
      })
      .transform((val) => {
        if (!val || val.trim() === '') return '';
        return val.replace(',', '.');
      }),

  // Validador básico para number
  number: (fieldName = 'valor') => 
    z.number()
      .min(DecimalValidation.MIN_VALUE, `${fieldName} deve ser maior ou igual a R$ 0,00`)
      .max(DecimalValidation.MAX_VALUE, `${fieldName} não pode ser maior que R$ 99.999.999,99`)
      .refine((val) => DecimalValidation._validateDecimal(val), {
        message: `${fieldName} deve ter no máximo 2 casas decimais`,
      }),

  // Validador para string ou number com transformação
  flexible: (fieldName = 'valor') => {
    const stringSchema = z.string().transform((val) => {
      if (!val || val.trim() === '') return 0;
      return parseFloat(val.replace(',', '.'));
    });
    
    const numberSchema = z.number();
    
    return z.union([stringSchema, numberSchema])
      .refine((val) => {
        return !isNaN(val) && DecimalValidation._validateDecimal(val);
      }, {
        message: `${fieldName} deve ser um número válido entre R$ 0,00 e R$ 99.999.999,99 com no máximo 2 casas decimais`,
      });
  },

  // Validador privado que verifica as regras decimais
  _validateDecimal: (value: number): boolean => {
    // Verificar se está dentro do range
    if (value < DecimalValidation.MIN_VALUE || value > DecimalValidation.MAX_VALUE) {
      return false;
    }

    // Verificar casas decimais
    const str = value.toString();
    const decimalIndex = str.indexOf('.');
    
    if (decimalIndex !== -1) {
      const decimalPlaces = str.length - decimalIndex - 1;
      if (decimalPlaces > DecimalValidation.MAX_DECIMAL_PLACES) {
        return false;
      }
    }

    // Verificar total de dígitos
    const digits = str.replace('.', '').replace('-', '');
    if (digits.length > DecimalValidation.MAX_TOTAL_DIGITS) {
      return false;
    }

    return true;
  },

  // Função utilitária para formatar valor para exibição
  format: (value: number | string): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'R$ 0,00';
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  },

  // Função utilitária para validar valor antes de salvar
  validate: (value: number): { valid: boolean; message?: string } => {
    if (!DecimalValidation._validateDecimal(value)) {
      return {
        valid: false,
        message: `Valor deve estar entre R$ 0,00 e R$ 99.999.999,99 com no máximo 2 casas decimais`,
      };
    }
    return { valid: true };
  }
};

// Esquema Zod reutilizável para valores monetários
export const MoneySchema = DecimalValidation.number('valor');
export const MoneyStringSchema = DecimalValidation.string('valor');
export const MoneyFlexibleSchema = DecimalValidation.flexible('valor');