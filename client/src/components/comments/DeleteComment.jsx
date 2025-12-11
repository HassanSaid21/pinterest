import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/fetch";
import ImageKit from "../imageKit/ImageKit";
import { toast } from "react-toastify";



const deleteComment = async (commentId ) => {
    const res = await apiRequest.delete(`/comments/${commentId}`);
    return res.data;
  };

  
  export default function DeleteComment({id, pinId}) {
   const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:deleteComment,
        onSuccess :()=>{
          queryClient.invalidateQueries({queryKey:['comments', pinId]})
          toast.success('comment deleted')
        }
      })
      
    return ( <div className="deleteContainer">
    <div className="delete" onClick={()=>mutate(id)} style={{  cursor:'pointer'}}>

    <ImageKit src='/general/delete.svg' />
    </div>
    </div>
    )
  }
  