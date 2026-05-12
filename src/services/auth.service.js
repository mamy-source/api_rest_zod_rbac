import prisma from "../../config/prisma.js";
import  argon2  from "argon2";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";


export const registerUser = async (name, email, password, role) =>{
    try {
        const existEmail =  await prisma.user.findUnique({
            where: {email}
        });
        if (existEmail){
            throw new Error("Email already exists");
        }
        //vérification si nombre d'utilisateur est inferieur à 1
        const userCount = await prisma.user.count();
        if (userCount < 1){
            role = "admin";
        }

        //hashage du mot de pass avec argon2
        const hash = await argon2.hash(password);

        const user = await prisma.user.create({
            data: {name, email, password:hash, role}
        });
        return user;
    }catch (error) {
        throw error;
    }
    
}

export const loginUser =  async (email, password) =>{
    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const playload = {
            id: user.id,
            role: user.role
        }
        
        //access token
        const accessToken = generateAccessToken(playload);
        //refresh token
        const refreshToken = generateRefreshToken(playload);

        return {
            user: {
                name: user.name,
                email: user.email
            },
            accessToken,
            refreshToken
        };
        
    } catch (error) {
        throw error;
    }
}

//profile
export const getProfile =  async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {
                name: true,
                email: true,
                role: true
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
}