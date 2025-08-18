import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

export const BalanceUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.BalanceUncheckedUpdateInput, Prisma.BalanceUncheckedUpdateInput> = z.object({
  totalAmount: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalRevenues: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalExpenses: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  referenceMonth: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const BalanceUncheckedUpdateInputObjectZodSchema = z.object({
  totalAmount: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalRevenues: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalExpenses: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  referenceMonth: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
