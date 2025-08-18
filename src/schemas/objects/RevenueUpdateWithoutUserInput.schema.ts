import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

export const RevenueUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUpdateWithoutUserInput, Prisma.RevenueUpdateWithoutUserInput> = z.object({
  amount: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const RevenueUpdateWithoutUserInputObjectZodSchema = z.object({
  amount: z.union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
