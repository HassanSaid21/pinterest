import useAuthStore from "../../utils/authStore";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { apiRequest } from "../../utils/fetch";
import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const addComment = async (comment)=>{
  const res = await apiRequest.post("/comments",comment);
}

export default function CommentForm() {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const queryClient  = useQueryClient()
  const {mutate} = useMutation({
    mutationFn:addComment,
    onSuccess :()=>{
      queryClient.invalidateQueries({queryKey:['comments', id]})
      setDesc('')
      setOpen(false)
    }
  })



function handleSubmit(e){
    e.preventDefault()
    mutate({desc:desc, pin:id})
      
  }
  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add comment"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <div className="emoji">
        <div onClick={() => setOpen((prev) => !prev)}>😁</div>
        <div className="emojiPicker">
          <EmojiPicker
            // style={{zIndex:999 , position:'absolute'}}
            open={open}
            width={400}
            searchPlaceHolder="     search for emoji"
            onEmojiClick={(e)=>{
              setDesc((desc) => desc + e.emoji)
              setOpen(false)
            }}
          />
        </div>
      </div>
    </form>
  );
}
