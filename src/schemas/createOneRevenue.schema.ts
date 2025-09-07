import { z } from 'zod';
import { RevenueSelectObjectSchema } from './objects/RevenueSelect.schema';
import { RevenueIncludeObjectSchema } from './objects/RevenueInclude.schema';
import { RevenueCreateInputObjectSchema } from './objects/RevenueCreateInput.schema';
import { RevenueUncheckedCreateInputObjectSchema } from './objects/RevenueUncheckedCreateInput.schema';

export const RevenueCreateOneSchema = z.object({ select: RevenueSelectObjectSchema.optional(), include: RevenueIncludeObjectSchema.optional(), data: z.union([RevenueCreateInputObjectSchema, RevenueUncheckedCreateInputObjectSchema])  })