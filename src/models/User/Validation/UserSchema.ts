// zod user schema
import { z } from "zod";

export const UserSchema = z.object({
    body: z.object({
        first_name: z.string(),
        last_name: z.string(),
        age: z.number(),
        phone_number: z.string(),
        address: z.string(),
        email: z.string().email(),
        password: z.string(),
        passes: z.string().array().nullable()
    })
});

export const PartialUserSchema = UserSchema.partial();