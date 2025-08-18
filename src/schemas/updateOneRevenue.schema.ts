import { z } from 'zod';
import { RevenueSelectObjectSchema } from './objects/RevenueSelect.schema';
import { RevenueIncludeObjectSchema } from './objects/RevenueInclude.schema';
import { RevenueUpdateInputObjectSchema } from './objects/RevenueUpdateInput.schema';
import { RevenueUncheckedUpdateInputObjectSchema } from './objects/RevenueUncheckedUpdateInput.schema';
import { RevenueWhereUniqueInputObjectSchema } from './objects/RevenueWhereUniqueInput.schema'

export const RevenueUpdateOneSchema = z.object({ select: RevenueSelectObjectSchema.optional(), include: RevenueIncludeObjectSchema.optional(), data: z.union([RevenueUpdateInputObjectSchema, RevenueUncheckedUpdateInputObjectSchema]), where: RevenueWhereUniqueInputObjectSchema  })