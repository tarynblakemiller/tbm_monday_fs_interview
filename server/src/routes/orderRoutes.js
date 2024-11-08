import express from "express";
const router = express.Router();
import { createOrderInBoard } from "../services/orderService.js";

router.post("/create", createOrderInBoard);

export default router;
