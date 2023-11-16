import ErrorHandler from "../middleware/Error.js";
import { Task } from "../models/Task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      succes: true,
      message: "Task added successfuly",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });
    if (!tasks) return next(new ErrorHandler("Invalid ID", 404));
    res.status(200).json({
      success: "true",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("Invalid ID", 404));
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: "true",
      message: "task updated ",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    await task.deleteOne();

    res.status(200).json({
      success: "true",
      message: "task DELETE ",
    });
  } catch (error) {
    next(error);
  }
};
