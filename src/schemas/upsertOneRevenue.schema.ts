import { z } from 'zod';
import { RevenueSelectObjectSchema } from './objects/RevenueSelect.schema';
import { RevenueIncludeObjectSchema } from './objects/RevenueInclude.schema';
import { RevenueWhereUniqueInputObjectSchema } from './objects/RevenueWhereUniqueInput.schema';
import { RevenueCreateInputObjectSchema } from './objects/RevenueCreateInput.schema';
import { RevenueUncheckedCreateInputObjectSchema } from './objects/RevenueUncheckedCreateInput.schema';
import { RevenueUpdateInputObjectSchema } from './objects/RevenueUpdateInput.schema';
import { RevenueUncheckedUpdateInputObjectSchema } from './objects/RevenueUncheckedUpdateInput.schema';

export const RevenueUpsertSchema = z.object({ select: RevenueSelectObjectSchema.optional(), include: RevenueIncludeObjectSchema.optional(), where: RevenueWhereUniqueInputObjectSchema, create: z.union([ RevenueCreateInputObjectSchema, RevenueUncheckedCreateInputObjectSchema ]), update: z.union([ RevenueUpdateInputObjectSchema, RevenueUncheckedUpdateInputObjectSchema ])  })