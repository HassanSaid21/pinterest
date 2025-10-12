import mongoose , {Schema} from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    pin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Pin",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
