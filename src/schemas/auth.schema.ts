import { z } from 'zod';

export const authSchema = z.object({
    email: z.email({ message: "Not a valid email address" }),

    password: z.string()
        .nonempty({ message: "This field is required" })
        .min(8, { message: "Password too short - should be 8 Chars minimum" }),
});


export type AuthInput = z.infer<typeof authSchema>