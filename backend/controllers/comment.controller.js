import commentModel from "../models/comment.model.js";

export const getComments = async (req, res, next) => {
  try {
    const { userId, pinId } = req.query;

    const comments = await commentModel
      .find(pinId ? { pin: pinId } : userId ? { user: userId } : {})
      .populate("user", "username displayName img")
      .sort({ createdAt: -1 });

    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch comments" });
  }
};


export const addComment = async (req, res, next) => {
  try {
    const { desc, pin } = req.body;
    const userId = req.userId;

    // ✅ Validation
    if (!desc || !pin) {
      return res.status(400).json({
        message: "Description and pin are required",
      });
    }


    const comment = await commentModel.create({
      user: userId,
      pin,
      description: desc,
    });
    console.log(comment);
    return res.status(201).json({
      message: "Comment added successfully",
      comment,
    });

  } catch (err) {
    console.error("Add Comment Error:", err);

    return res.status(500).json({
      message: "Something went wrong while adding the comment",
      error: err.message,
    });
  }
};


export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedComment = await commentModel.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      message: "Comment deleted successfully",
      deletedComment,
    });

  } catch (err) {
    console.error("Delete Comment Error:", err);
    return res.status(500).json({
      message: "Something went wrong while deleting the comment",
      error: err.message,
    });
  }
};
