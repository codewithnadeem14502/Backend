import { getAllUser, getUserByID, newUser } from "../controllers/user.js";

import express from "express";

const router = express.Router();

router.get("/all", getAllUser);

router.post("/new", newUser);
// -> dynmaic route always at the end
router.get("/userid/:id", getUserByID);

export default router;
