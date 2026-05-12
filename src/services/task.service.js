import { id } from "zod/locales";
import prisma from "../../config/prisma.js";

export const creatNewTask = async(title, content, user) =>{
    const task = await prisma.todo.create({
        data: {
            title,
            content,
            userId: user.id
        }
    });

    return task;
}

export const getAllTask = async (
  title = "",
  content = "",
  page = 1,
  limit = 10
) => {

  page = Number(page) > 0 ? Number(page) : 1;
  limit = Number(limit) > 0 ? Number(limit) : 10;

  const skip = (page - 1) * limit;

  const where = {
    title: title ? { contains: title } : undefined,
    content: content ? { contains: content } : undefined
  };

  const tasks = await prisma.todo.findMany({
    where,
    skip,
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      update_at: true
    }
  });

  const total = await prisma.todo.count({ where });

  return {
    data: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};
export const getTaskById =  async(id) => {
    const task =  await prisma.todo.findUnique({
        where: {id},
        select: {
            id: true,
            title: true,
            content: true,
            created_at: true,
            update_at: true,
             
        }
    })
    if (!task){
        throw new Error("Task not found")
    }
    return task;
}

export const updateTask = async(id, title, content) =>{
    await getTaskById(id)
    const taskUpdating = await prisma.todo.update({
        where: {id},
        data: {
            title, 
            content
        }
    })
    return taskUpdating;
}

export const deleteTask = async(id) =>{
    await getTaskById(id)
    const taskDeleting = await prisma.todo.delete({
        where: {id}
    })

    return taskDeleting;
}