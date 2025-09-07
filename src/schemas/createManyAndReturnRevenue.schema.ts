import { z } from 'zod';
import { RevenueSelectObjectSchema } from './objects/RevenueSelect.schema';
import { RevenueCreateManyInputObjectSchema } from './objects/RevenueCreateManyInput.schema';

export const RevenueCreateManyAndReturnSchema = z.object({ select: RevenueSelectObjectSchema.optional(), data: z.union([ RevenueCreateManyInputObjectSchema, z.array(RevenueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()