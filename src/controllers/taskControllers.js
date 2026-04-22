const Task = require('../models/Task');
const AppError = require('../utils/AppError');

const createTask = async (req, res, next) => {
    const { title, description, status, dueDate, category } = req.body;
    try {
        const task = new Task({
            title,
            description,
            status,
            dueDate,
            category,
            user: req.user.userId
        });
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        return next(new AppError('Failed to create task', 400));
    }
};

const getTasks = async (req, res, next) => {
    try {
        const { title, status, category, sortBy, page, limit } = req.query;
        // Build filter
    const filter = { user: req.user.userId };

    if (title) {
        filter.title = { $regex: title, $options: 'i' };
    }
    if (status) {
        filter.status = status;
    } 
    if (category) {
        filter.category = category;
    }

   const total = await Task.countDocuments(filter);

     // Build query
     let query = Task.find(filter);

     // Apply sorting
    if (sortBy) {
        const sortField = sortBy.startsWith('-') ? sortBy.substring(1) : sortBy;
        const sortOrder = sortBy.startsWith('-') ? -1 : 1;
        query = query.sort({ [sortField]: sortOrder });
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    query = query.skip(skip).limit(limitNum);

    const tasks = await query;

    res.status(200).json({ message: 'Tasks retrieved', total: total, page: pageNum, limit: limitNum, tasks: tasks });
    } catch (error) {
        return next(error);
    }
};

const getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
        if (!task) {
            return next(new AppError('Task not found', 404));
        }
        res.status(200).json({ message: 'Task retrieved successfully', task });
    } catch (error) {
        return next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId }, req.body,
            { returnDocument: 'after', runValidators: true }
        );
        if (!task) {
            return next(new AppError('Task not found', 404));
        }
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        return next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!task) {
            return next(new AppError('Task not found', 404));
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return next(error);
    }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };