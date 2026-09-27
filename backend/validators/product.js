import {z} from 'zod';
export const productSchema=z.object({
    body:z.object({name:z.string().min(2),
        description:z.string().min(5),
        category:z.string().min(1),
        price:z.coerce.number().min(0),
        compareAtPrice:z.coerce.number().min(0).optional(),
        stock:z.coerce.number().int().min(0),
        images:z.array(z.string()).optional(),
        tags:z.array(z.string()).optional(),
        featured:z.boolean().optional()})});
