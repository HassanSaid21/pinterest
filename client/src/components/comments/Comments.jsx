import "./comments.css";
import ImageKit from "../imageKit/ImageKit";
import {  useQuery, } from "@tanstack/react-query";
import { apiRequest } from "../../utils/fetch";
import { useParams } from "react-router";
import { format } from "timeago.js";
import CommentForm from "./CommentForm";
import useAuthStore from "../../utils/authStore";
import DeleteComment from "./DeleteComment";

const Comments = () => {
  const {currentUser} = useAuthStore()
  const {userId ='', id:pinId = ''} =  useParams()
 
  const { error, data, isPending } = useQuery({
    queryKey: ["comments"  , pinId],
  queryFn: () => apiRequest.get(`/comments?userId=${userId}&pinId=${pinId}`).then((res)=>res.data),
  });



  if (isPending) return <p>Loading ...</p>;
  if (error) return <p>error occurred</p>;
  return (
    <div className="comments">
      <span className="commentsCount">{data.length||'No'} comment</span>
      <div className="commentList">
       {
         data.map(comment=>(
          <div className="comment" key={comment._id}>
            
          <ImageKit src={comment.user.img||"/general/noAvatar.png" }alt={comment.user.username}/>
          
          <div className="commentContent">
            <span className="commentUsername">{comment.user.displayName}</span>
            <p className="commentText">
             {comment.description}
            </p>
            <span className="commentDate">{format(comment.createdAt)}</span>
          </div>
        {  currentUser._id === comment.user._id && <DeleteComment pinId={pinId} id={comment._id}/>}
        </div>
       )  )
         
        }
      </div>
         <CommentForm/>
    </div>
  );
};

export default Comments;
