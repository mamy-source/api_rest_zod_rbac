import { getAllUser, getUser, upadateUser, deleteUser, togleRole } from "../services/user.service.js";

export const users = async(req, res) => {
    try {
        const users = await getAllUser(req.query.name, req.query.email, req.query.role);
        res.status(200).json({message: "Users lists", users});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const user = async(req, res) => {
    try {
        const user = await getUser(req.params.id);
        res.status(200).json({message: "User", user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const updateUserExisting = async (req, res) =>{
    try {
        const userId = req.params.id;
        const {name, email} = req.body;
        const userUpdate = await upadateUser(userId, name, email);
        res.status(201).json({message: "Update successfuly", userUpdate})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteUserExisting = async (req, res) => {
    try {
        const userId = req.params.id;
        const userDelete = await deleteUser(userId);
        res.status(200).json({message: "Delete successfuly", userDelete})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const role = async(req, res) => {
    try {
        const userId = req.params.id;
        const {role} = req.body;
        const value = await togleRole(userId, role);
        res.status(201).json({message: "role update successfuly", value})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

