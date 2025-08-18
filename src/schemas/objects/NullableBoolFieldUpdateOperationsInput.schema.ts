import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const NullableBoolFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput, Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().nullish()
}).strict();
export const NullableBoolFieldUpdateOperationsInputObjectZodSchema = z.object({
  set: z.boolean().nullish()
}).strict();
