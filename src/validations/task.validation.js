import {z} from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(5)
})

export const updateTaskSchema = z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(5).optional()
})
