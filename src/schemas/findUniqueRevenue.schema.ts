import { z } from 'zod';
import { RevenueSelectObjectSchema } from './objects/RevenueSelect.schema';
import { RevenueIncludeObjectSchema } from './objects/RevenueInclude.schema';
import { RevenueWhereUniqueInputObjectSchema } from './objects/RevenueWhereUniqueInput.schema';

export const RevenueFindUniqueSchema = z.object({ select: RevenueSelectObjectSchema.optional(), include: RevenueIncludeObjectSchema.optional(), where: RevenueWhereUniqueInputObjectSchema })