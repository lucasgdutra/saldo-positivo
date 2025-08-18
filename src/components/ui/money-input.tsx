"use client";

import React, { forwardRef, useCallback, useState, useEffect } from "react";
import { DecimalValidation } from "@/lib/validations";

interface MoneyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number | string;
  onChange?: (value: number) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ value, onChange, error, label, required, className, ...props }, ref) => {
    // Estado interno para controlar a exibição formatada
    const [displayValue, setDisplayValue] = useState<string>(() => {
      if (value === undefined || value === null || value === '') return '';
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      return isNaN(numValue) ? '' : numValue.toString();
    });

    const [isFocused, setIsFocused] = useState(false);

    // Formatar valor para exibição quando não estiver focado
    const formatForDisplay = useCallback((val: string): string => {
      if (!val || val === '') return '';
      const num = parseFloat(val.replace(',', '.'));
      if (isNaN(num)) return '';
      
      // Se não estiver focado, mostrar formatado
      if (!isFocused && num > 0) {
        return new Intl.NumberFormat('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(num);
      }
      
      return val;
    }, [isFocused]);

    // Normalizar valor para edição (remover formatação)
    const normalizeForEdit = useCallback((val: string): string => {
      return val.replace(/[^\d,.-]/g, '').replace(',', '.');
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      
      // Se estiver focado, normalizar para edição
      if (isFocused) {
        inputValue = normalizeForEdit(inputValue);
      }
      
      setDisplayValue(inputValue);
      
      // Enviar valor numérico para o onChange
      if (onChange) {
        if (!inputValue || inputValue === '') {
          onChange(0);
          return;
        }
        
        const numValue = parseFloat(inputValue.replace(',', '.'));
        if (!isNaN(numValue)) {
          // Validar se está dentro dos limites antes de chamar onChange
          const validation = DecimalValidation.validate(numValue);
          if (validation.valid) {
            onChange(numValue);
          }
        }
      }
    }, [isFocused, normalizeForEdit, onChange]);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Normalizar valor para edição ao focar
      const normalized = normalizeForEdit(displayValue);
      setDisplayValue(normalized);
      
      if (props.onFocus) {
        props.onFocus(e);
      }
    }, [displayValue, normalizeForEdit, props]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // Formatar valor para exibição ao desfocar
      const formatted = formatForDisplay(displayValue);
      setDisplayValue(formatted);
      
      if (props.onBlur) {
        props.onBlur(e);
      }
    }, [displayValue, formatForDisplay, props]);

    // Atualizar displayValue quando value prop mudar
    useEffect(() => {
      if (value === undefined || value === null || value === '') {
        setDisplayValue('');
        return;
      }
      
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numValue)) {
        if (isFocused) {
          setDisplayValue(numValue.toString());
        } else {
          setDisplayValue(formatForDisplay(numValue.toString()));
        }
      }
    }, [value, isFocused, formatForDisplay]);

    const inputClassNames = [
      "mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2",
      error ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500",
      className
    ].filter(Boolean).join(" ");

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {!isFocused && displayValue && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              R$
            </span>
          )}
          
          <input
            {...props}
            ref={ref}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={inputClassNames}
            style={!isFocused && displayValue ? { paddingLeft: '2.5rem' } : undefined}
            placeholder={isFocused ? "0.00" : "R$ 0,00"}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        
        {!error && (
          <p className="mt-1 text-xs text-gray-500">
            Valor máximo: R$ 99.999.999,99
          </p>
        )}
      </div>
    );
  }
);

MoneyInput.displayName = "MoneyInput";