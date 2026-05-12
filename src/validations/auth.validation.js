import { z } from "zod";
import { email } from "zod";

export  const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]).default("user"),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const updateSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
})

export const roleSchema = z.object({
    role: z.enum(["user", "admin"])
})