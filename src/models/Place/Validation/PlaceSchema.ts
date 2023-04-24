// zod place schema
import { z } from "zod";

export const PlaceSchema = z.object({
    body: z.object({
        address: z.string(),
        phone_number: z.string(),
        required_pass_level: z.number().min(1).max(5),
        required_age_level: z.number(),
    }),
});

export const PartialPlaceSchema = PlaceSchema.partial();