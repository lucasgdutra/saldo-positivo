import { z } from 'zod';
import { RevenueUpdateManyMutationInputObjectSchema } from './objects/RevenueUpdateManyMutationInput.schema';
import { RevenueWhereInputObjectSchema } from './objects/RevenueWhereInput.schema';

export const RevenueUpdateManySchema = z.object({ data: RevenueUpdateManyMutationInputObjectSchema, where: RevenueWhereInputObjectSchema.optional()  })