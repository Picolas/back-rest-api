// zod pass schema
import { z } from "zod";

export const PassSchema = z.object({
    body: z.object({
        pass_level: z.number().min(0).max(5),
    })
});

export const PartialPassSchema = PassSchema.partial();