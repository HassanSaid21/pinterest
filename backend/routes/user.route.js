import express from "express";
import {
  getUsers,
  create,
  getUser,
  login,
  logout,
  followUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", create);
router.post("/login", login);
router.post("/logout", logout);
router.post("/follow/:username", verifyToken, followUser);

router.get("/", getUsers);
router.get("/:username", getUser);

export default router;