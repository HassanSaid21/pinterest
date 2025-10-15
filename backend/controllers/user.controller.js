import { hash } from "bcryptjs";
import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.json("no users found");
    }
    return res.json({ users });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  const userInformation = req.body;
  console.log(userInformation);

  await User.create({
    displayName: req.body.displayName,
    username: req.body.username,
    email: req.body.email,
    hashedPassword: await hash(req.body.password, 12),
  });
  return res.json("user created");
};
