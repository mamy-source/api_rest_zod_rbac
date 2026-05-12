import { success } from "zod";
import { creatNewTask, getAllTask, getTaskById, updateTask, deleteTask } from "../services/task.service.js";

export const tasks =  async(req, res) => {
    try {
        const {title, content} = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit =  parseInt(req.query.limit) || 10;

        const tasks = await getAllTask(title, content, page, limit);
        res.status(200).json({message: "Tasks Lists",success: true, tasks})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const task = async(req, res) =>{
    try {
        const taskId = req.params.id;

        const task = await getTaskById(taskId);

        res.status(200).json({message: "Task ",success: true, task});
    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const createNew = async(req, res) =>{
    try {
        const {title, content} = req.body;
        const task = await creatNewTask(title, content, req.user);
        res.status(201).json({message: "Task created successfully",success: true, task})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

export const update = async(req, res) => {
    try {
        const taskId = req.params.id;
        const {title, content} = req.body;

        const taskUpdate = await updateTask(taskId, title, content);

        res.status(200).json({message: "Task updating successfully",success: true, taskUpdate})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

export const deleteExisting = async(req, res) =>{
    try {
        const taskId = req.params.id;

        const deleteT = await deleteTask(taskId);
        res.status(200).json({message: "Task deleted successfully",success: true, deleteT})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}