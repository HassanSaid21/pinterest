import "./comments.css";
import ImageKit from "../imageKit/ImageKit";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
const Comments = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="comments">
      <span className="commentsCount">4 Comments</span>
      <div className="commentList">
        <div className="comment">
          <ImageKit src="/general/noAvatar.png" alt="avatar" />
          <div className="commentContent">
            <span className="user">john doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis, ea laboriosam. Impedit porro asperiores distinctio
              voluptas tempora! Quos inventore vitae
            </p>
            <span className="commentDate">2d</span>
          </div>
        </div>
        <div className="comment">
          <ImageKit src="/general/noAvatar.png" alt="avatar" />
          <div className="commentContent">
            <span className="user">john doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis, ea laboriosam. Impedit porro asperiores distinctio
              voluptas tempora! Quos inventore vitae
            </p>
            <span className="commentDate">2d</span>
          </div>
        </div>
        <div className="comment">
          <ImageKit src="/general/noAvatar.png" alt="avatar" />
          <div className="commentContent">
            <span className="commentUsername">john doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis, ea laboriosam. Impedit porro asperiores distinctio
              voluptas tempora! Quos inventore vitae
            </p>
            <span className="commentDate">2d</span>
          </div>
        </div>{" "}
        <div className="comment">
          <ImageKit src="/general/noAvatar.png" alt="avatar" />
          <div className="commentContent">
            <span className="commentUserame">john doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis, ea laboriosam. Impedit porro asperiores distinctio
              voluptas tempora! Quos inventore vitae
            </p>
            <span className="commentDate">2d</span>
          </div>
        </div>{" "}
        <div className="comment">
          <ImageKit src="/general/noAvatar.png" alt="avatar" />
          <div className="commentContent">
            <span className="commentUsername">john doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis, ea laboriosam. Impedit porro asperiores distinctio
              voluptas tempora! Quos inventore vitae
            </p>
            <span className="commentDate">2d</span>
          </div>
        </div>
      </div>
      <form action="" className="commentForm">
        <input type="text" placeholder="add comment" />
        <div className="emoji">
          <div onClick={() => setOpen((prev) => !prev)}>😁</div>
          <div className="emojiPicker">
            <EmojiPicker
              open={open}
              width={400}
              searchPlaceHolder="     search for emoji"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comments;
