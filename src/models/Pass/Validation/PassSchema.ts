// zod pass schema
import { z } from "zod";

export const PassSchema = z.object({
    body: z.object({
        level: z.number().min(1).max(5),
    })
});

export const PartialPassSchema = PassSchema.partial();