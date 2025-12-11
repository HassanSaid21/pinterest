import bcrypt, { hash } from "bcryptjs";
import User from "../models/user.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import followModel from "../models/follow.model.js";


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

/********************************************************/


export const getUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await userModel
      .findOne({ username })
      .select("-hashedPassword")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Run counts in parallel (faster)
    const [followerCount, followingCount] = await Promise.all([
      followModel.countDocuments({ following: user._id }),
      followModel.countDocuments({ follower: user._id }),
    ]);

    let showButtons = false;
    let isFollowing = false;

    const token = req.cookies?.token;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.userId;

        // Only show buttons if NOT his own profile
        if (userId.toString() !== user._id.toString()) {
          showButtons = true;

          isFollowing = await followModel.exists({
            follower: userId,
            following: user._id,
          });
        }
      } catch (err) {
        // Invalid token? treat as guest user
        console.log("Invalid token:", err.message);
      }
    }

    return res.status(200).json({
      user,
      followerCount,
      followingCount,
      showButtons,
      isFollowing,
    });

  } catch (error) {
    next(error);
  }
};


/*************************************************************/
//* create user
export const create = async (req, res, next) => {
  const { displayName, username, email, password } = req.body;
  if (!email || !password || !username)
    return res
      .status(400)
      .json({ success: false, message: "all input fields are required " });

  const user = await User.create({
    displayName,
    username,
    email,
    hashedPassword: await hash(password, 12),
  });
  
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true, // prevents JS access
    secure: false, // true in production (HTTPS)
    maxAge: 15 * 60 * 1000,
  });
  return res.status(201).json({ message: "welcome" });
};

/******************************************************/
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "all  fields are required " });

  const user = await userModel.findOne({ email });
  if (!user) return res.status(401).json({ message: "wrong  email" });

  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordCorrect)
    return res.status(401).json({ message: "wrong password" });

  const { hashedPassword, ...detailedUser } = user.toObject();
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true, // prevents JS access
    secure: false, // true in production (HTTPS)
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({ message: "welcome"  , user:detailedUser});
};

/***********************************************************/
export const logout = async (req, res, next) => {
  res.clearCookie("token");

  return res.status(200).json({ message: "Logout successful"  });
};

/*******************************************************************/
export const followUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const currentUserId = req.userId;


    // Find the user to follow
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent self-follow
    if (user._id.toString() === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if already following
    const isFollowing = await followModel.exists({
      follower: currentUserId,
      following: user._id,
    });

    if (isFollowing) {
      await followModel.deleteOne({
        follower: currentUserId,
        following: user._id,
      });

      return res.json({
        message: "Unfollowed successfully",
        followed: false,
      });
    }

    await followModel.create({
      follower: currentUserId,
      following: user._id,
    });

    return res.json({
      message: "Followed successfully",
      followed: true,
    });

  } catch (error) {
    next(error); // Pass to global error handler
  }
};
