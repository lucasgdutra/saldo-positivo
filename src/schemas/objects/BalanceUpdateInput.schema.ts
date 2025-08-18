import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutBalanceNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutBalanceNestedInput.schema'

export const BalanceUpdateInputObjectSchema: z.ZodType<Prisma.BalanceUpdateInput, Prisma.BalanceUpdateInput> = z.object({
  totalAmount: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalRevenues: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalExpenses: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  referenceMonth: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBalanceNestedInputObjectSchema).optional()
}).strict();
export const BalanceUpdateInputObjectZodSchema = z.object({
  totalAmount: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalRevenues: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalExpenses: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  referenceMonth: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBalanceNestedInputObjectSchema).optional()
}).strict();
