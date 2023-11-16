import express from "express";
import {
  deleteTask,
  getAllTask,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middleware/Auth.js";
const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/mytask", isAuthenticated, getAllTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
