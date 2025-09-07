import { z } from 'zod';

// prettier-ignore
export const CategoryResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    icon: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    expenses: z.array(z.unknown())
}).strict();

export type CategoryResultType = z.infer<typeof CategoryResultSchema>;
