import { z } from 'zod';
import { RevenueCreateManyInputObjectSchema } from './objects/RevenueCreateManyInput.schema';

export const RevenueCreateManySchema = z.object({ data: z.union([ RevenueCreateManyInputObjectSchema, z.array(RevenueCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })