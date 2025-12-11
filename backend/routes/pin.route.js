import express from "express";
import {
  deletePins,
  getPin,
  getPins,
  createPin,
  interactionCheck,
  interact,
} from "../controllers/pin.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPins);
router.get("/:id", getPin);
router.get("/interaction-check/:id", interactionCheck);
router.post("/interact/:id", verifyToken, interact);
router.post("/", verifyToken, createPin);
router.delete("/delete-pins", deletePins);

export default router;