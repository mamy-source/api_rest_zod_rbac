import { email } from "zod";
import prisma from "../../config/prisma.js";


//afficher tous les utilisateurs
export const getAllUser = async (name, email, role) => {
    try {
        const users = await prisma.user.findMany({
                where: {
                    name: {contains: name},
                    email: {contains: email},
                    role: {contains: role}
                }
        });
        if (users.length === 0) {
            throw new Error("No users found");
        }
        return users;

    } catch (error) {
        throw error;
    }
}


//afficher un utilisateur
export const getUser = async(id) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id}
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;

    } catch (error) {
        throw error;
    }
}

//modifier
export const upadateUser = async(id, name, email) => {
    try {
        const user = await getUser(id);
        if (!user){
            throw new Error("User not found");
        }
        const userUpdate = await prisma.user.update({
            where: {id},
            data: {
                name,
                email,
            },
        });
        return userUpdate;
    } catch (error) {
        throw error;
    }
}

//supprimer
export const deleteUser = async(id) => {
    try {
        const user = await getUser(id);
        if (!user) {
            throw new Error("User not found");
        }
        const userDelete = await prisma.user.delete({
            where: {id}
        });
        return userDelete;

    } catch (error) {
        throw error;
    }
}

//changer role
export const togleRole = async(id, role) => {
    try {
        const user = await getUser(id);
        if (!user) {
            throw new Error("User not found");
        }
        const newRole = await prisma.user.update({
            where: {id},
            data: {role}
        })
        return newRole;
    } catch (error) {
        throw error
    }
}